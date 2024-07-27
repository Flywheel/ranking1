import { Injectable } from '@angular/core';

import { Contest, SlateMemberView, ContestView, SlateView } from '../../feature/ballot/models';
@Injectable({
  providedIn: 'root',
})
export class MockdataService {
  localImgStore = '../assets/jpeg/goldwatch/';

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
      content: 'Harris.jpg',
      candidateName: 'Kamala Harris',
      asset: { mediaType: 'video', location: 'sHky_Xopyrw' },
    },
    {
      id: 2,
      contestId: 1,
      slateId: 1,
      candidateId: 2,
      rankOrder: 2,
      content: 'URG4bYES91E',
      candidateName: 'Robert Kennedy, Jr.',
      asset: { mediaType: 'video', location: 'URG4bYES91E' },
    },
    {
      id: 3,
      contestId: 1,
      slateId: 1,
      candidateId: 3,
      rankOrder: 3,
      content: 'V3n8qmgNHZc',
      candidateName: 'Chase Oliver',
      asset: { mediaType: 'video', location: 'V3n8qmgNHZc' },
    },
    {
      id: 4,
      contestId: 1,
      slateId: 1,
      candidateId: 4,
      rankOrder: 4,
      content: '2KsIxLn7UO0',
      candidateName: 'Jill Stein',
      asset: { mediaType: 'video', location: '2KsIxLn7UO0' },
    },
    {
      id: 5,
      contestId: 1,
      slateId: 1,
      candidateId: 5,
      rankOrder: 5,
      content: 't3J0iRz35jc',
      candidateName: 'Randall Terry',
      asset: { mediaType: 'video', location: 't3J0iRz35jc' },
    },
    {
      id: 6,
      contestId: 1,
      slateId: 1,
      candidateId: 6,
      rankOrder: 6,
      content: 'AcpjvVFAayo',
      candidateName: 'Donald Trump',
      asset: { mediaType: 'video', location: 'AcpjvVFAayo' },
    },
    {
      id: 7,
      contestId: 1,
      slateId: 1,
      candidateId: 7,
      rankOrder: 7,
      content: 'LAZv9UZBDFg',
      candidateName: 'Cornel West',
      asset: { mediaType: 'video', location: 'LAZv9UZBDFg' },
    },
    {
      id: 11,
      contestId: 2,
      slateId: 2,
      candidateId: 11,
      rankOrder: 1,
      content: this.localImgStore + 'Beshear.png',
      candidateName: 'Andy Beshear',
      asset: { mediaType: 'image', location: this.localImgStore + 'Beshear.png' },
    },
    {
      id: 12,
      contestId: 2,
      slateId: 2,
      candidateId: 12,
      rankOrder: 2,
      content: this.localImgStore + 'Cooper.png',
      candidateName: 'Roy Cooper',
      asset: { mediaType: 'image', location: this.localImgStore + 'Cooper.png' },
    },
    {
      id: 13,
      contestId: 2,
      slateId: 2,
      candidateId: 13,
      rankOrder: 3,
      content: this.localImgStore + 'Kelly.png',
      candidateName: 'Mark Kelly',
      asset: { mediaType: 'image', location: this.localImgStore + 'Kelly.png' },
    },
    {
      id: 14,
      contestId: 2,
      slateId: 2,
      candidateId: 14,
      rankOrder: 4,
      content: this.localImgStore + 'Moore.png',
      candidateName: 'Wes Moore',
      asset: { mediaType: 'image', location: this.localImgStore + 'Moore.png' },
    },
    {
      id: 15,
      contestId: 2,
      slateId: 2,
      candidateId: 15,
      rankOrder: 5,
      content: this.localImgStore + 'Polis.png',
      candidateName: 'Jared Polis',
      asset: { mediaType: 'image', location: this.localImgStore + 'Polis.png' },
    },
    {
      id: 16,
      contestId: 2,
      slateId: 2,
      candidateId: 16,
      rankOrder: 6,
      content: this.localImgStore + 'Pritzker.jpg',
      candidateName: 'J.B. Pritzker',
      asset: { mediaType: 'image', location: this.localImgStore + 'Pritzker.jpg' },
    },
    {
      id: 17,
      contestId: 2,
      slateId: 2,
      candidateId: 17,
      rankOrder: 6,
      content: this.localImgStore + 'Shapiro.png',
      candidateName: 'Josh Shapiro',
      asset: { mediaType: 'image', location: this.localImgStore + 'Shapiro.png' },
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
