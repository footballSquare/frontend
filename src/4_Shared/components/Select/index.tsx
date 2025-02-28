import React from "react";
import { SelectProps } from "./type";

const Select = (props: SelectProps) => {
  const { defaultValue, options, onChangeHandler } = props;
  const [selectedValue, setSelectedValue] = React.useState<string | number>(
    defaultValue
  );
  return (
    <select
      value={selectedValue}
      className=" w-[164px] h-[32px] rounded-[4px] text-center border-1 border-blue"
      onChange={(e) => {
        setSelectedValue(e.target.value);
        if (onChangeHandler) {
          onChangeHandler(e);
        }
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
