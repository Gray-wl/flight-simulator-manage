declare interface EditDataFormListShowParams {
  index: number;
}

interface EditDataFormListColumns {
  type: string;
  label: string;
  name: string;
  required?: boolean;
  options?: any[];
  show?: (params: EditDataFormListShowParams) => boolean;
}
