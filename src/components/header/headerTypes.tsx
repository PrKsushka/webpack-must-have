interface subObj {
  id: number;
  label: string;
  path: string;
}
interface headerObject {
  id: number;
  label?: string;
  path?: string | any;
  sub?: Array<subObj>;
}
export interface HeaderItemTypes {
  item: headerObject;
  root: boolean;
}

export interface HeaderListTypes {
  headerMenuArr: Array<headerObject>;
  root: boolean;
}
