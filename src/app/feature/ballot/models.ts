export type Candidate = {
    id: number;
    candidateName: string;
    imageLocation: string;
}

export type Contest = {
  id: number;
  contestTitle: string;
  contestDescription: string;
  opens: Date;
  closes: Date;
  authorId: number;
  topSlateId: number;
};


export type Slate = {
  id: number;
  contestId: number;
  authorId: number;
};

export type SlateMember = {
  id: number;
  slateId: number;
  candidateId: number;
  rankOrder: number;
};

export type ContestView = {
    id: number;
    opens: Date;
    closes: Date;
    topSlateId: number;
    contestTitle: string;
    contestDescription: string;
    slate: SlateView;
};

export type SlateMemberView = {
  id: number;
  slateId: number;
  contestId: number;
  candidateId: number;
  candidateName: string;
  rankOrder: number;
  content: string;
};

export type SlateView = {
  id: number;
  contestId: number;
  authorId: number;
  slateMemberViews: SlateMemberView[];
};
