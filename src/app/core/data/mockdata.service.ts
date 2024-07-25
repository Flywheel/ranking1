import { Injectable } from '@angular/core';

import { Candidate, Contest, SlateMemberView, ContestView, SlateView } from "../../feature/ballot/models";
@Injectable({
  providedIn: 'root'
})
export class MockdataService {

  goldwatch: string = '../assets/jpeg/goldwatch/';


  public contestData: Contest[] = [
    { id: 1, authorId: 1, contestTitle: 'US President 2024', contestDescription: 'Candidate for President of the United States', topSlateId: 1, opens: new Date('2024-01-01'), closes: new Date('2024-11-01') },
    { id: 2, authorId: 1, contestTitle: 'Dem MiniPrimary 2024', contestDescription: 'Candidates for Democratic Nominee', topSlateId: 2, opens: new Date('2024-01-01'), closes: new Date('2024-11-01') },
  ];
  
  
  public USPresident24: SlateMemberView[] = [
  { id: 1, contestId: 1, slateId: 1, candidateId: 1, rankOrder: 1, content: 'Harris.jpg', candidateName: 'Kamala Harris' },
  { id: 2, contestId: 1, slateId: 1, candidateId: 2, rankOrder: 2, content: 'URG4bYES91E', candidateName: 'Robert Kennedy, Jr.' },
  { id: 3, contestId: 1, slateId: 1, candidateId: 3, rankOrder: 3, content: 'V3n8qmgNHZc', candidateName: 'Chase Oliver' },
  { id: 4, contestId: 1, slateId: 1, candidateId: 4, rankOrder: 4, content: '2KsIxLn7UO0', candidateName: 'Jill Stein' },
  { id: 5, contestId: 1, slateId: 1, candidateId: 5, rankOrder: 5, content: 't3J0iRz35jc', candidateName: 'Randall Terry' },
  { id: 6, contestId: 1, slateId: 1, candidateId: 6, rankOrder: 6, content: 'AcpjvVFAayo', candidateName: 'Donald Trump' },
  { id: 7, contestId: 1, slateId: 1, candidateId: 7, rankOrder: 7, content: 'LAZv9UZBDFg', candidateName: 'Cornel West' },
  { id: 11, contestId: 2, slateId: 2, candidateId: 11, rankOrder: 1, content:  this.goldwatch + 'Beshear.png', candidateName: 'Andy Beshear' },
  { id: 12, contestId: 2, slateId: 2, candidateId: 12, rankOrder: 2, content: this.goldwatch + 'Cooper.png', candidateName: 'Roy Cooper' },
  { id: 13, contestId: 2, slateId: 2, candidateId: 13, rankOrder: 3, content: this.goldwatch + 'Kelly.png', candidateName: 'Mark Kelly' },
  { id: 14, contestId: 2, slateId: 2, candidateId: 14, rankOrder: 4, content: this.goldwatch + 'Moore.png', candidateName: 'Wes Moore' },
  { id: 15, contestId: 2, slateId: 2, candidateId: 15, rankOrder: 5, content: this.goldwatch + 'Polis.png', candidateName: 'Jared Polis' },
  { id: 16, contestId: 2, slateId: 2, candidateId: 16, rankOrder: 6, content: this.goldwatch + 'Pritzker.jpg', candidateName: 'J.B. Pritzker' },
  { id: 17, contestId: 2, slateId: 2, candidateId: 17, rankOrder: 6, content: this.goldwatch + 'Shapiro.png', candidateName: 'Josh Shapiro' },
  ];


    public contestViews: ContestView[] = [
    ];


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
          slateMemberViews: slateMemberViews
        };
        return {
          id: contest.id,
          opens: contest.opens,
          closes: contest.closes,
          topSlateId: contest.topSlateId,
          contestTitle: contest.contestTitle,
          contestDescription: contest.contestDescription,
          slate: slate
        };
      });
    }

}
