declare interface DictionaryData {
  id: number;
  dictType: string;
  dictName: string;
  status: OptionType;
}

declare interface DictEnum {
  dictType: string;
}

declare type DictionaryQueryParams = Partial<
  Pick<DictionaryData, 'dictType' | 'dictName'>
>;

declare type DeleteDictionaryParams = Partial<Pick<DictionaryData, 'id'>>;

declare interface CreateDictionaryDto {
  dictType: string;
  dictName: string;
}
