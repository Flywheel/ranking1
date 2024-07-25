import { signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { withDevtools, updateState } from '@angular-architects/ngrx-toolkit';
import { ContestView, SlateMemberView, SlateView } from './models';
import { BallotService } from './ballot.service';
import { computed, inject } from '@angular/core';

const emptycontest: ContestView = {
  id: 0,
  // slateId: 1,
  opens: new Date('1922-01-03'),
  closes: new Date('1922-01-04'),
  topSlateId: 0,
  contestTitle: '',
  contestDescription: '',
  slate: {
    id: 0,
    contestId: 0,
    authorId: 0,
    slateMemberViews: [],
  },
};

const emptySlateViews: SlateView[] = [];
const emptySlateView: SlateView = {
  id: 0,
  contestId: 0,
  authorId: 0,
  slateMemberViews: [],
};

export const BallotStore = signalStore(
  { providedIn: 'root' },
  withDevtools('ballots'),
  withState({
    contestSlate: emptySlateView,
    voterSlate: emptySlateView,
    contest: emptycontest,
    contests: [emptycontest] as ContestView[],
    authorSlates: emptySlateViews,
    isLoading: false,
  }),
  withComputed(store => {
    return { allContestSlates: computed<SlateView[]>(() => store.contests().map(c => c.slate)) };
  }),
  withMethods(store => {
    const dbBallot = inject(BallotService);
    return {
      async getAllContests() {
        updateState(store, '[Ballot] getAllContests Start', { isLoading: true });
        const contests: ContestView[] = await dbBallot.getAllContestViews();
        console.log(contests);
        updateState(store, '[Ballot] getAllContests Success', value => ({
          ...value,
          contests: contests,
          isLoading: false,
        }));
      },

      async getContestSlateByContestId(contestId: number) {
        const currentContestSlate: SlateView =
          store.allContestSlates().filter(a => a.contestId === contestId)[0] ?? emptySlateView;
        console.log(contestId);
        console.log(currentContestSlate);
        updateState(store, `[Ballot] getContestSlateByContestId Success, ${contestId}`, {
          contestSlate: currentContestSlate,
        });
      },

      async getVoterSlateByContestId(contestId: number) {
        const voterSlates: SlateView[] = store.authorSlates() ?? [];
        const currentVoterSlate: SlateView = voterSlates.filter(a => a.contestId === contestId)[0] ?? emptySlateView;
        console.log(currentVoterSlate);
        updateState(store, `[Ballot] getCurrentVoterSlateByContestId Success, ${contestId}`, {
          voterSlate: currentVoterSlate,
        });
      },

      async updateVoterSlate(ballot: SlateView) {
        let updatedAuthorSlates = store.authorSlates();
        const slateExists = updatedAuthorSlates.some(b => b.contestId === ballot.contestId);
        if (slateExists) {
          updatedAuthorSlates = updatedAuthorSlates.map(b => (b.contestId === ballot.contestId ? ballot : b));
        } else {
          updatedAuthorSlates = [...updatedAuthorSlates, ballot];
        }

        updateState(store, `[Ballot] UpdateSlate Success Contest/Ballot: ${ballot.contestId}/${ballot.id} `, {
          authorSlates: updatedAuthorSlates,
          voterSlate: ballot,
        });
      },
    };
  }),

  withHooks({
    async onInit({ getAllContests }) {
      await getAllContests();
    },
  })
);
