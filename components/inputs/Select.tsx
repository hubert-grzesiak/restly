"use client";

import clsx from "clsx";
import ReactSelect, { MultiValue, ActionMeta, SingleValue } from "react-select";
interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  value?: Option | Option[];
  onChange: (
    value: MultiValue<Option> | SingleValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  options: Option[];
  disabled?: boolean;
}
const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  disabled,
}) => {
  return (
    <div className="z-[100]">
      <label
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
          dark:text-gray-200
        ">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
            option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isFocused
                ? "rgb(107 114 128)"
                : isSelected
                ? "rgb(156 163 175)"
                : "#3a3b3c",
            }),
          }}
          classNames={{
            control: (state) =>
              clsx(
                `
                text-sm 
                dark:bg-lightgray 
                dark:border-gray-500`,
                state.isFocused && "border-gray-400"
              ),
            menu: () => "dark:bg-lightgray",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
