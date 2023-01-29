// common UI type

export type TypedCommonInput = {
  id: string;
  value: string;
  type: string;
  title: string;
  placeholder?: string;
  maxLength?: number;
  onChange: (e: React.ChangeEvent) => void;
};

export type TypedCommonButton = {
  type: "button" | "submit" | "reset";
  onClick: () => void;
  value?: string;
  style?: {
    padding?: string;
    margin?: string;
    border?: string;
  };
};

// styled type
export type StyledButtonType = {
  border?: string;
  padding?: string;
  margin?: string;
};

export type StyledCommonType = {
  justifyContent?:
    | "normal"
    | "center"
    | "flex-start"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?:
    | "normal"
    | "center"
    | "flex-start"
    | "flex-end"
    | "stretch"
    | "baseline";
  padding?: string;
  margin?: string;
};

export type StyledCheckBox = {
  isChecked: string;
};

// feature type

export type Props = {
  children?: React.ReactNode;
};

export class UserData {
  name: string;
  tel: string;
  member: number;
  child?: boolean;
  pet?: boolean;

  constructor(
    name: string,
    tel: string,
    member: number,
    child: boolean,
    pet: boolean
  ) {
    this.name = name;
    this.tel = tel;
    this.member = member;
    this.child = child;
    this.pet = pet;
  }
}

export type EventObject = {
  id: string;
  value?: string;
};
