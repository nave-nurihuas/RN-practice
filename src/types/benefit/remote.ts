import {BenefitDetailType, BenefitItemType} from './internal';

export interface BenefitListResponse {
  count: number;
  next: string;
  previous: null | string;
  results: BenefitItemType[];
}

export interface BenefitDetailRequest {
  id: number;
}

export interface BenefitDetailResponse extends BenefitDetailType {}

export interface BenefitDetailPatchRequest {
  patchData: FormData;
  id: number;
}
