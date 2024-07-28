import { Injectable } from '@angular/core';

import { Contest, SlateMemberView, ContestView, SlateView } from '../../feature/ballot/models';
@Injectable({
  providedIn: 'root',
})
export class MockdataService {
  demvp24LocalStore = '../../assets/contests/demvp24/';

  public contestData: Contest[] = [
    {
      id: 1,
      authorId: 1,
      contestTitle: 'US President 2024',
      contestDescription: 'Candidate for President of the United States',
      topSlateId: 1,
      opens: new Date('2024-01-01'),
      closes: new Date('2024-11-01'),
    },
    {
      id: 2,
      authorId: 1,
      contestTitle: 'Dem MiniPrimary 2024',
      contestDescription: 'Candidates for Democratic Nominee',
      topSlateId: 2,
      opens: new Date('2024-01-01'),
      closes: new Date('2024-11-01'),
    },
  ];

  public USPresident24: SlateMemberView[] = [
    {
      id: 1,
      contestId: 1,
      slateId: 1,
      candidateId: 1,
      rankOrder: 1,
      candidateName: 'Kamala Harris',
      asset: { mediaType: 'youtube', sourceId: 'sHky_Xopyrw' },
    },
    {
      id: 2,
      contestId: 1,
      slateId: 1,
      candidateId: 2,
      rankOrder: 2,
      candidateName: 'Robert Kennedy, Jr.',
      asset: { mediaType: 'youtube', sourceId: 'URG4bYES91E' },
    },
    {
      id: 3,
      contestId: 1,
      slateId: 1,
      candidateId: 3,
      rankOrder: 3,
      candidateName: 'Chase Oliver',
      asset: { mediaType: 'youtube', sourceId: 'V3n8qmgNHZc' },
    },
    {
      id: 4,
      contestId: 1,
      slateId: 1,
      candidateId: 4,
      rankOrder: 4,
      candidateName: 'Jill Stein',
      asset: { mediaType: 'youtube', sourceId: '2KsIxLn7UO0' },
    },
    {
      id: 5,
      contestId: 1,
      slateId: 1,
      candidateId: 5,
      rankOrder: 5,
      candidateName: 'Randall Terry',
      asset: { mediaType: 'youtube', sourceId: 't3J0iRz35jc' },
    },
    {
      id: 6,
      contestId: 1,
      slateId: 1,
      candidateId: 6,
      rankOrder: 6,
      candidateName: 'Donald Trump',
      asset: { mediaType: 'youtube', sourceId: 'AcpjvVFAayo' },
    },
    {
      id: 7,
      contestId: 1,
      slateId: 1,
      candidateId: 7,
      rankOrder: 7,
      candidateName: 'Cornel West',
      asset: { mediaType: 'youtube', sourceId: 'LAZv9UZBDFg' },
    },
    {
      id: 11,
      contestId: 2,
      slateId: 2,
      candidateId: 11,
      rankOrder: 1,
      candidateName: 'Andy Beshear',
      asset: { mediaType: 'image', sourceId: this.demvp24LocalStore + 'Beshear.png' },
    },
    {
      id: 12,
      contestId: 2,
      slateId: 2,
      candidateId: 12,
      rankOrder: 2,
      candidateName: 'Roy Cooper',
      asset: { mediaType: 'image', sourceId: this.demvp24LocalStore + 'Cooper.png' },
    },
    {
      id: 13,
      contestId: 2,
      slateId: 2,
      candidateId: 13,
      rankOrder: 3,
      candidateName: 'Mark Kelly',
      asset: { mediaType: 'image', sourceId: this.demvp24LocalStore + 'Kelly.png' },
    },
    {
      id: 14,
      contestId: 2,
      slateId: 2,
      candidateId: 14,
      rankOrder: 4,
      candidateName: 'Wes Moore',
      asset: { mediaType: 'image', sourceId: this.demvp24LocalStore + 'Moore.png' },
    },
    {
      id: 15,
      contestId: 2,
      slateId: 2,
      candidateId: 15,
      rankOrder: 5,
      candidateName: 'Jared Polis',
      asset: { mediaType: 'image', sourceId: this.demvp24LocalStore + 'Polis.png' },
    },
    {
      id: 16,
      contestId: 2,
      slateId: 2,
      candidateId: 16,
      rankOrder: 6,
      candidateName: 'J.B. Pritzker',
      asset: { mediaType: 'image', sourceId: this.demvp24LocalStore + 'Pritzker.jpg' },
    },
    {
      id: 17,
      contestId: 2,
      slateId: 2,
      candidateId: 17,
      rankOrder: 6,
      candidateName: 'Josh Shapiro',
      asset: { mediaType: 'image', sourceId: this.demvp24LocalStore + 'Shapiro.png' },
    },
  ];

  public contestViews: ContestView[] = [];

  constructor() {
    this.populateContestViews();
  }

  private populateContestViews() {
    this.contestViews = this.contestData.map(contest => {
      const slateMemberViews = this.USPresident24.filter(member => member.contestId === contest.id);
      const slate: SlateView = {
        id: contest.topSlateId,
        contestId: contest.id,
        authorId: contest.authorId,
        slateMemberViews: slateMemberViews,
      };
      return {
        id: contest.id,
        authorId: contest.authorId,
        opens: contest.opens,
        closes: contest.closes,
        topSlateId: contest.topSlateId,
        contestTitle: contest.contestTitle,
        contestDescription: contest.contestDescription,
        slate: slate,
      };
    });
  }
}
