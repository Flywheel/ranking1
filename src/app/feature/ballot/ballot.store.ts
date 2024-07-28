import { signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { withDevtools, updateState } from '@angular-architects/ngrx-toolkit';
import { ContestView, SlateView } from './models';
import { BallotService } from './ballot.service';
import { computed, inject } from '@angular/core';

const emptycontest: ContestView = {
  id: 0,
  authorId: 0,
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
    currentContest: emptycontest,
    allContests: [emptycontest],
    contestSlate: emptySlateView,
    voterSlates: [emptySlateView],
    voterSlate: emptySlateView,
    isStartupLoadingComplete: false,
    isLoading: false,
  }),
  withComputed(store => {
    return { allContestSlates: computed<SlateView[]>(() => store.allContests().map(c => c.slate)) };
  }),
  withMethods(store => {
    const dbBallot = inject(BallotService);
    return {
      async getAllContests() {
        updateState(store, '[Ballot] getAllContests Start', { isLoading: true });
        const contests: ContestView[] = await dbBallot.getAllContestViews();
        updateState(store, '[Ballot] getAllContests Success', value => ({
          ...value,
          allContests: contests,
          isLoading: false,
        }));
      },

      async getContestSlateByContestId(contestId: number) {
        updateState(store, `[Ballot] getContestSlateByContestId Success, ${contestId}`, {
          currentContest: store.allContests().filter(a => a.id === contestId)[0] ?? emptycontest,
          contestSlate: store.allContestSlates().filter(a => a.contestId === contestId)[0] ?? emptySlateView,
        });
      },

      async getVoterSlateByContestId(contestId: number) {
        const voterSlates: SlateView[] = store.voterSlates() ?? [];
        const currentVoterSlate: SlateView = voterSlates.filter(a => a.contestId === contestId)[0] ?? emptySlateView;
        updateState(store, `[Ballot] getCurrentVoterSlateByContestId Success, ${contestId}`, {
          voterSlate: currentVoterSlate,
          voterSlates: voterSlates,
        });
      },

      async updateVoterSlate(ballot: SlateView) {
        let updatedAuthorSlates = store.voterSlates();
        const slateExists = updatedAuthorSlates.some(b => b.contestId === ballot.contestId);
        if (slateExists) {
          updatedAuthorSlates = updatedAuthorSlates.map(b => (b.contestId === ballot.contestId ? ballot : b));
        } else {
          updatedAuthorSlates = [...updatedAuthorSlates, ballot];
        }
        updateState(store, `[Ballot] UpdateSlate Success Contest/Ballot: ${ballot.contestId}/${ballot.id} `, {
          voterSlates: updatedAuthorSlates,
          voterSlate: ballot,
        });
      },
      async setStartupLoadingComplete(state: boolean) {
        updateState(store, '[Ballot] setStartupLoadingComplete Success', { isStartupLoadingComplete: state });
      },
    };
  }),

  withHooks({
    async onInit({ getAllContests, setStartupLoadingComplete }) {
      await getAllContests();
      await setStartupLoadingComplete(true);
    },
  })
);
