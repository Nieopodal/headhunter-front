import { StudentSummary } from "./StudentSummary";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user.context";
import { useFetch } from "../../hooks/useFetch";
import { StudentCv } from "../../types/StudentCv";
import { Loader } from "../common/Loader";
import { apiUrl } from "../../config/api";

export const StudentSummaryFetched = () => {
  const { user, rerender } = useContext(UserContext);
  const { fetchApi, data, apiError } = useFetch();
  useEffect(() => {
    (async () => {
      await fetchApi(user, `${apiUrl}/student/cv/`, "GET", "Wystąpił błąd");
    })();
  }, [rerender]);

  if (apiError) return <p>{apiError}</p>;

  if (data) {
    return (
      <StudentSummary
        firstName={(data as StudentCv).student_first_name}
        lastName={(data as StudentCv).student_last_name}
        avatarUrl={
          (data as StudentCv).student_github_username
            ? `https://github.com/${
                (data as StudentCv).student_github_username
              }.png`
            : ""
        }
        githubName={(data as StudentCv).student_github_username}
        phone={(data as StudentCv).student_contact_number}
        email={(data as StudentCv).student_email}
        about={(data as StudentCv).student_bio}
      />
    );
  }

  return <Loader />;
};
