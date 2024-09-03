import axios from 'axios';
import {
  BenefitDetailPatchRequest,
  BenefitDetailRequest,
  BenefitDetailResponse,
  BenefitListResponse,
} from '../types/benefit/remote';

export const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI1MzY3OTI1LCJqdGkiOiI0YjMwMTU4ZTI1ZjE0ZWQwYmU3ZmViOTRkMmM0ZTM3ZSIsInVzZXJfaWQiOjE4MDg3fQ.4t7ySfl7r1kbG4YFN7-khQwwlyMyYexuXHG87136MaI';

export const getBenefitList = async () => {
  const response = await axios.get<BenefitListResponse>(
    'https://test.nurihaus.com/api/lounge/spend/list/?page_size=40',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data.results;
};

export const getBenefitDetail = async (payload: BenefitDetailRequest) => {
  const {id} = payload;

  const response = await axios.get<BenefitDetailResponse>(
    `https://test.nurihaus.com/api/lounge/spend/detail/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data;
};

export const patchBenefitDatail = async (
  payload: BenefitDetailPatchRequest,
) => {
  const {patchData, id} = payload;

  const response = await axios.patch(
    `https://test.nurihaus.com/api/lounge/spend/update/${id}/`,
    patchData,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
