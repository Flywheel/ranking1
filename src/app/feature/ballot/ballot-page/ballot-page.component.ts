import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { ContestView, SlateMemberView, SlateView } from '../models';
import {
  CdkDrag,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BallotStore } from '../ballot.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ballot-page',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDropListGroup, CdkDragHandle, RouterLink],
  templateUrl: './ballot-page.component.html',
  styleUrl: './ballot-page.component.scss',
})
export class BallotPageComponent implements OnInit {
  ballotStore = inject(BallotStore);
  id = input<string>();
  selectedContest = signal<string>('');

  candidatesAvailable = signal<SlateMemberView[]>([]);
  candidatesRanked = signal<SlateMemberView[]>([]);

  preparedBallot = signal<SlateView>({ id: 0, contestId: 0, authorId: 0, slateMemberViews: [] });

  async ngOnInit() {
    await this.ballotStore.getAllContests();
    const ballotId = this.id() ? Number(this.id()) : 1;
    console.log(ballotId);

    await this.loadContestById(ballotId);
  }

  async loadContestById(contestId: number) {
    //await this.ballotStore.getAllContests();
    //   await this.pitchStore.loadPitchViewByPitchId(pitchId);
    console.log(this.ballotStore.contests());
    await this.ballotStore.getContestSlateByContestId(contestId);
    await this.ballotStore.getVoterSlateByContestId(contestId);
    this.setAvailableCandidates();
    this.updateCurrentSlateSignal();
  }

  setAvailableCandidates() {
    // this.candidatesAvailable.set(this.pitchStore.currentPitchView().slate.slateMemberViews);
    this.candidatesAvailable.set(this.ballotStore.contestSlate().slateMemberViews);
    const rankedCandidatesIds = new Set(
      this.ballotStore.voterSlate().slateMemberViews.map(candidate => candidate.candidateId)
    );
    console.log(rankedCandidatesIds);

    if (this.ballotStore.voterSlate()?.slateMemberViews) {
      this.candidatesRanked.set(
        this.ballotStore
          .voterSlate()
          .slateMemberViews.reduce((acc: SlateMemberView[], slateMemberView: SlateMemberView) => {
            const candidate = this.ballotStore
              .contestSlate()
              .slateMemberViews.find(
                (candidate: SlateMemberView) => candidate.candidateId === slateMemberView.candidateId
              );
            return candidate ? [...acc, candidate] : acc;
          }, [])
      );
      const rankedCandidatesIds = new Set(this.candidatesRanked().map(candidate => candidate.candidateId));
      this.candidatesAvailable.set(
        this.candidatesAvailable().filter(candidate => !rankedCandidatesIds.has(candidate.candidateId))
      );
    }
  }

  moveUpOnePosition(candidate: SlateMemberView) {
    const index = this.candidatesRanked().findIndex(t => t.candidateName === candidate.candidateName);
    if (index === 0) return;

    const temp = this.candidatesRanked()[index];
    this.candidatesRanked.set([
      ...this.candidatesRanked().slice(0, index - 1),
      temp,
      this.candidatesRanked()[index - 1],
      ...this.candidatesRanked().slice(index + 1),
    ]);
    this.updateCurrentSlateSignal();
  }

  moveDownOnePosition(candidate: SlateMemberView) {
    const index = this.candidatesRanked().findIndex(t => t.candidateName === candidate.candidateName);
    if (index === this.candidatesRanked().length - 1) this.moveToAvailable(candidate);

    if (index < this.candidatesRanked().length - 1) {
      const temp = this.candidatesRanked()[index];
      this.candidatesRanked.set([
        ...this.candidatesRanked().slice(0, index),
        this.candidatesRanked()[index + 1],
        temp,
        ...this.candidatesRanked().slice(index + 2),
      ]);
      this.updateCurrentSlateSignal();
    }
  }

  moveToAvailable(candidate: SlateMemberView) {
    this.candidatesRanked.set(this.candidatesRanked().filter(t => t.candidateName !== candidate.candidateName));
    this.candidatesAvailable.set([...this.candidatesAvailable(), candidate]);
    this.updateCurrentSlateSignal();
  }

  moveToSelected(candidate: SlateMemberView) {
    this.candidatesAvailable.set(this.candidatesAvailable().filter(t => t.candidateName !== candidate.candidateName));
    this.candidatesRanked.set([...this.candidatesRanked(), candidate]);
    this.updateCurrentSlateSignal();
  }

  drop(event: CdkDragDrop<SlateMemberView[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
    this.updateCurrentSlateSignal();
  }

  updateCurrentSlateSignal() {
    const preparedSlateMemberViews: SlateMemberView[] = this.candidatesRanked().map((slateMember, index: number) => {
      return {
        id: slateMember.id,
        slateId: slateMember.slateId,
        contestId: slateMember.contestId,
        candidateId: slateMember.candidateId,
        candidateName: slateMember.candidateName,
        rankOrder: index + 1,
        content: slateMember.content,
      };
    });
    // this.preparedBallot.set({
    //   id: this.pitchStore.currentPitchView().slate.id,
    //   contestId: this.selectedPitchId(),
    //   authorId: this.authorStore.authorHandle().id,
    //   slateMemberViews: preparedSlateMemberViews,
    // });
    // this.ballotStore.updateSlate(this.preparedBallot());
  }
}
