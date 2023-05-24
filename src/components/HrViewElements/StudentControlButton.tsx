import { HrViewMode } from "../../types/HrViewMode";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  handleStudent?: (
    viewMode: HrViewMode,
    firstName: string,
    lastName: string,
    path: string,
    message: string
  ) => void;
  studentId?: string;
  text: string;
  firstName: string;
  lastName: string;
  path?: string;
  message?: string;
  viewMode?: HrViewMode;
};

export const StudentControlButton = ({
  handleStudent,
  viewMode,
  text,
  firstName,
  lastName,
  studentId,
  path,
  message,
}: Props) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={
        handleStudent
          ? () =>
              handleStudent(
                viewMode!,
                `${firstName}`,
                `${lastName}`,
                `${path}`,
                `${message}`
              )
          : () => navigate(`/student-cv/${studentId}`, { replace: true })
      }
      className="z-10 w-1/8 btn-sm max-lg:leading-none max-lg:text-sm h-9 btn-primary normal-case font-normal text-base rounded-none"
    >
      {text}
    </button>
  );
};
