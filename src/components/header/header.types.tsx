interface SubObj {
  id: number;
  label: string;
  path: string;
}
interface HeaderObject {
  id: number;
  label?: string;
  path: string;
  sub?: Array<SubObj>;
}
export interface HeaderItemTypes {
  item: HeaderObject;
  root: boolean;
}

export interface HeaderListTypes {
  headerMenuArr: Array<HeaderObject>;
  root: boolean;
}
