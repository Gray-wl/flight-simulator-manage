declare interface ScenarioData {
  id: number;
  storyTitle: string;
  storyTypeCode: number;
  raceCode: number;
  talentCode: number;
  linkagePlotNames: string;
  minAge: number;
  maxAge: number;
  status: OptionType;
  talents: Pick<TalentData, 'id' | 'talentTitle'>[];
}

declare type ScenarioQueryParams = Partial<
  Pick<
    TalentData,
    'storyTitle' | 'storyTypeCode' | 'raceCode',
    'minAge' | 'maxAge'
  >
>;

declare interface ScenarioAttributeData {
  attrCode: number;
  relationCode: number;
  num: number;
}

declare interface ScenarioChapterData {
  judgeCode: number;
  content: string;
  attributeList?: ScenarioAttributeData[];
  selection?: string;
}

declare interface CreateScenarioDto {
  storyTitle: string;
  storyTypeCode: number;
  raceCode?: number;
  minAge?: number;
  maxAge?: number;
  talentIds?: number[];
  attributeList: ScenarioAttributeData[];
  chapterList: ScenarioChapterData[];
}
