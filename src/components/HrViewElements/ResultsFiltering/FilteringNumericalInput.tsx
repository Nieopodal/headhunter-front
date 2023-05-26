import React from "react";
import { useFormContext } from "react-hook-form";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";

type Props = {
  registerName: string;
  placeholder: string;
  min?: number;
  max?: number;
};

export const FilteringNumericalInput = ({
  registerName,
  placeholder,
  min,
  max,
}: Props) => {
  const { register, setValue, getValues } = useFormContext();

  return (
    <div className="input-group flex items-center relative w-36">
      <input
        type="number"
        {...register(`${registerName}`)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-36 placeholder:text-neutral-500 input bg-base-200 pl-3 pr-[1.9rem] h-9"
      />
      <div className="absolute right-0 top-0 text-neutral-500 w-6 h-9 flex justify-center flex-col gap-[0.1rem]">
        <button
          type="button"
          onClick={() => {
            let curr = getValues(registerName);
            if (!max || (max && curr < max)) setValue(registerName, ++curr);
          }}
        >
          <IoCaretUp
            style={{ clipPath: "inset(3px)" }}
            className="scale-[180%] h-3 w-5 hover:text-neutral-200 hover:cursor-pointer"
          />
        </button>
        <button
          type="button"
          onClick={() => {
            let curr = getValues(registerName);
            if (min === 0 && (curr < min || curr === min)) {
              setValue(registerName, min);
              return;
            }
            if (!min || (min && curr > min)) setValue(registerName, --curr);
          }}
        >
          <IoCaretDown
            style={{ clipPath: "inset(3px)" }}
            className="scale-[180%] h-3 w-5 hover:text-neutral-200 hover:cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
};
