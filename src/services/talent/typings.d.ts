declare interface TalentData {
  id: number;
  raceCode: number;
  talentTitle: string;
  talentDesc: string;
  talentLevelCode: number;
  talentEffectName: string;
  linkagePlotNames: string;
  status: OptionType;
}

declare interface TalentListData {
  attrCode: number;
  relationCode: number;
  num: number;
}

declare interface CreateTalentDto {
  talentTitle: string;
  talentLevelCode: number;
  talentDesc?: string;
  raceCode?: number;
  talentEffectList: TalentListData[];
  talentTriggerList: TalentListData[];
}

declare type TalentQueryParams = Partial<
  Pick<TalentData, 'talentTitle' | 'raceCode' | 'talentLevelCode'>
>;
