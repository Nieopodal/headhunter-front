import React from "react";
import { useFormContext } from "react-hook-form";

export const ApprenticeshipToggle = () => {
  const { register } = useFormContext();
  return <div className="mt-3">
      <label
        className="label cursor-pointer justify-start gap-5"
        style={{ paddingLeft: 0 }}
      >
        <span className="">
          Zgoda na odbycie bezpłatnych praktyk/stażu na początek
        </span>
        <input
          type="checkbox"
          {...register("canTakeApprenticeship")}
          style={{ borderRadius: "20px" }}
          className="toggle toggle-primary"
          defaultChecked={false}
        />
      </label>
    </div>
};
