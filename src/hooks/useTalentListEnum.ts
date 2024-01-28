import { StatusType } from '@/constants/enum';
import { queryTalentList } from '@/services/talent';
import { useCallback, useEffect, useState } from 'react';

interface TalentListEnumDTO {
  talentListEnum: TalentData[];
}

const useTalentListEnum = (): TalentListEnumDTO => {
  const [talentListEnum, setTalentListEnum] = useState<TalentData[]>([]);

  const queryTalentListEnum = useCallback(async () => {
    const res = await queryTalentList({ current: 1, pageSize: 10000 });
    setTalentListEnum(
      res?.data?.list?.filter(
        ({ status }: TalentData) => status === StatusType.ONLINE,
      ),
    );
  }, []);

  useEffect(() => {
    queryTalentListEnum();
  }, [queryTalentListEnum]);

  return {
    talentListEnum,
  };
};

export default useTalentListEnum;
