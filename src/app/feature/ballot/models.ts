export interface Candidate {
  id: number;
  candidateName: string;
  imageLocation: string;
}

export interface Contest {
  id: number;
  contestTitle: string;
  contestDescription: string;
  opens: Date;
  closes: Date;
  authorId: number;
  topSlateId: number;
}

export interface Asset {
  mediaType: string;
  sourceId: string;
}
export interface AssetView extends Asset {
  url: string;
  paddingBottom: string;
}
export interface AssetView extends Asset {
  url: string;
  paddingBottom: string;
}

// export interface Slate {
//   id: number;
//   contestId: number;
//   authorId: number;
// }

// export interface SlateMember {
//   id: number;
//   slateId: number;
//   candidateId: number;
//   rankOrder: number;
// }

export interface ContestView extends Contest {
  slate: SlateView;
}

export interface SlateMemberView {
  id: number;
  slateId: number;
  contestId: number;
  candidateId: number;
  candidateName: string;
  rankOrder: number;
  content?: string;
  asset: Asset;
}

export interface SlateView {
  id: number;
  contestId: number;
  authorId: number;
  slateMemberViews: SlateMemberView[];
}
