export type SelectProps = {
  defaultValue: string | number;
  options: {
    value: string | number;
    text: string;
  }[];
  onChangeHandler?: (event: React.ChangeEvent<HTMLSelectElement>)=>void;
};
