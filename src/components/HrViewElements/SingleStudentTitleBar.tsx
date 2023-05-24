import React, { useContext, useEffect } from "react";
import { AvailableStudent, StudentToInterview } from "@Types";
import { HrViewMode } from "../../types/HrViewMode";
import { useFetch } from "../../hooks/useFetch";
import { UserContext } from "../../contexts/user.context";
import { apiUrl } from "../../config/api";
import { useModal } from "../../hooks/useModal";
import { Message } from "../common/Message";
import { ModalPosition } from "../../types/ModalPosition";
import { Avatar } from "../Header/Avatar";
import { StudentControlButton } from "./StudentControlButton";

type Props = {
  viewMode: HrViewMode;
  studentData: AvailableStudent | StudentToInterview;
  handleViewMode: (viewMode: HrViewMode) => void;
};

export const SingleStudentTitleBar = ({
  studentData,
  viewMode,
  handleViewMode,
}: Props) => {
  const { fetchApi, apiError } = useFetch();
  const { user } = useContext(UserContext);
  const { setModal } = useModal();

  const { firstName, lastName, id: studentId } = studentData;
  const pictureUrl =
    "githubUsername" in studentData && studentData.githubUsername !== ""
      ? `https://github.com/${studentData.githubUsername}.png`
      : "https://randomuser.me/api/portraits/lego/2.jpg";
  const reservationTime =
    "reservationTime" in studentData ? studentData.reservationTime : new Date();
  const userFullName = `${firstName} ${lastName}`;
  const userShortName = `${firstName} ${lastName.slice(0, 1).concat(".")}`;

  useEffect(() => {
    if (apiError) {
      setModal({ modal: <Message type={"error"} body={apiError} /> });
    }
  }, [apiError, setModal]);

  const handleStudent = async (
    viewMode: HrViewMode,
    firstName: string,
    lastName: string,
    path: string,
    message: string
  ) => {
    await fetchApi(
      user,
      `${apiUrl}/hr/${path}/${studentId}`,
      "PATCH",
      "Błąd przy ładowaniu wybranego kursanta"
    );

    setModal({
      modal: (
        <Message
          type={"success"}
          body={`Kandydat ${firstName} ${lastName} ${message}`}
        />
      ),
      position: ModalPosition.top,
      timer: 5,
    });
    handleViewMode(viewMode);
  };

  return (
    <>
      <div className="flex flex-row items-center gap-10">
        {viewMode === HrViewMode.StudentsToInterview ? (
          <div className="flex flex-col">
            <span className="text-sm font-normal">Rezerwacja do:</span>
            <span className="text-base font-bold">
              {new Intl.DateTimeFormat("pl").format(new Date(reservationTime))}{" "}
              r.
            </span>
          </div>
        ) : null}

        <div className="flex flex-row items-center gap-3">
          {viewMode === HrViewMode.StudentsToInterview ? (
            <Avatar imgUrl={pictureUrl} />
          ) : null}
          {viewMode === HrViewMode.AvailableStudents
            ? userShortName
            : userFullName}
        </div>
      </div>

      <div className="flex flex-row items-center gap-3 mr-14">
        {viewMode === HrViewMode.StudentsToInterview ? (
          <>
            <StudentControlButton
              text={"Pokaż CV"}
              firstName={firstName}
              lastName={lastName}
              studentId={studentId}
            />

            <StudentControlButton
              text={"Brak zainteresowania"}
              handleStudent={handleStudent}
              firstName={firstName}
              lastName={lastName}
              studentId={studentId}
              path={"withdraw"}
              viewMode={HrViewMode.AvailableStudents}
              message={"został przeniesiony do listy dostępnych"}
            />

            <StudentControlButton
              text={"Zatrudniony"}
              handleStudent={handleStudent}
              firstName={firstName}
              lastName={lastName}
              studentId={studentId}
              path={"employed"}
              viewMode={HrViewMode.AvailableStudents}
              message={"został oznaczony jako zatrudniony"}
            />
          </>
        ) : null}

        {viewMode === HrViewMode.AvailableStudents ? (
          <StudentControlButton
            text={"Zarezerwuj rozmowę"}
            handleStudent={handleStudent}
            firstName={firstName}
            lastName={lastName}
            studentId={studentId}
            path={"interview"}
            viewMode={HrViewMode.StudentsToInterview}
            message={'dodany do Twojej listy "Do rozmowy"'}
          />
        ) : null}
      </div>
    </>
  );
};
