import {useMutation, useQuery, useQueryClient} from 'react-query';
import {
  getBenefitDetail,
  getBenefitList,
  patchBenefitDatail,
} from '../../api/benefit';
import {BenefitDetailPatchRequest} from '../../types/benefit/remote';

const benefitKeys = {
  all: ['benefit'] as const,
  list: () => [...benefitKeys.all, 'list'] as const,
  details: () => [...benefitKeys.all, 'detail'] as const,
  detail: (id: number) => [...benefitKeys.details(), id] as const,
};

export const useGetBenefitList = ({
  hideCloseCheck,
}: {
  hideCloseCheck: boolean;
}) => {
  return useQuery({
    queryKey: benefitKeys.list(),
    queryFn: getBenefitList,
    select: data =>
      data.filter(item => (hideCloseCheck ? item.is_active : item)),
  });
};

export const useGetBenefitDetail = ({id}: {id: number}) => {
  return useQuery({
    queryKey: benefitKeys.detail(id),
    queryFn: () => getBenefitDetail({id}),
  });
};

export const usePatchBenefitDetail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patchData: BenefitDetailPatchRequest) =>
      patchBenefitDatail(patchData),
    onSuccess: () => {
      queryClient.invalidateQueries(benefitKeys.all);
    },
  });
};
