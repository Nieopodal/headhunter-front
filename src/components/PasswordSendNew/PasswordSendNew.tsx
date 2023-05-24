import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFetch } from "../../hooks/useFetch";
import { NavLink, useParams } from "react-router-dom";
import { AppLogo } from "../Header/AppLogo";
import { apiUrl } from "../../config/api";
import { NewPassword } from "../common/NewPassword";
import { ConfirmResponse } from "@Types";
import { Loader } from "../common/Loader";
import { useModal } from "../../hooks/useModal";
import { Message } from "../common/Message";
import { ResponseParagraph } from "../common/ResponseParagraph";
import { validationSchema } from "./validation-schema";

type PasswordSetNewRequest = {
  password: string;
  confirmNewPass: string;
};

interface Props {
  newHr?: boolean;
  newHrMail?: string;
  innerToken?: string;
}

export const PasswordSendNew = ({ newHrMail, innerToken, newHr }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [emailToken, setEmailToken] = useState<string | null>(null);
  const { fetchApi, apiError } = useFetch();
  const { setModal } = useModal();

  const { id, token, role } = useParams();

  const schema = validationSchema();

  const { handleSubmit, formState, ...methods } =
    useForm<PasswordSetNewRequest>({
      defaultValues: {},
      resolver: yupResolver(schema),
    });

  const onSendNewPass = async ({ password }: PasswordSetNewRequest) => {
    const data = await fetchApi(
      null,
      `${newHr ? `${apiUrl}/hr/update` : `${apiUrl}/auth/password/reset`}`,
      "PATCH",
      "Wystąpił nieznany błąd.",
      {
        id,
        password,
      },
      true,
      "application/json",
      newHr ? innerToken! : emailToken!
    );

    if (data) {
      setSuccess(true);
      setModal({
        modal: (
          <Message
            type={"success"}
            body={
              newHr
                ? "Hasło zostało zapisane. Zaloguj się."
                : "Hasło zostało zmienione. Zaloguj się."
            }
          />
        ),
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (newHr) return;
      setLoading(true);
      const data = await fetchApi(
        null,
        `${apiUrl}/auth/${role}/confirm/${id}/${token}`,
        "POST",
        "Wystąpił nieznany błąd"
      );
      if (data) {
        setEmail((data as ConfirmResponse).email);
        setEmailToken((data as ConfirmResponse).emailToken);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start w-full mt-10">
      {!newHr && (
        <div className="flex justify-center">
          <AppLogo classes="w-32 mb-12" />
        </div>
      )}

      {loading && <Loader />}
      {apiError && <ResponseParagraph text={apiError} />}

      {success && (
        <NavLink
          to="/"
          className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none"
        >
          Zaloguj się
        </NavLink>
      )}

      {!loading && !apiError && !success && (
        <FormProvider
          handleSubmit={handleSubmit}
          formState={formState}
          {...methods}
        >
          <form onSubmit={handleSubmit(onSendNewPass)}>
            <NewPassword newHrMail={newHrMail} />
          </form>
        </FormProvider>
      )}
    </div>
  );
};
