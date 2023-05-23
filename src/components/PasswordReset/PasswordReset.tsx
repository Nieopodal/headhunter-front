import React, {useState} from "react";
import {GoBack} from "../common/GoBack";
import {FormProvider, useForm} from "react-hook-form";
import {Input} from "../common/Form/Input";
import {useFetch} from "../../hooks/useFetch";
import {useModal} from "../../hooks/useModal";
import {apiUrl} from "../../config/api";
import {Message} from "../common/Message";
import {useNavigate} from "react-router-dom";
import {Loader} from "../common/Loader";
import {ResponseParagraph} from "../common/ResponseParagraph";
import {RecoveryPasswordResponse} from "@Types";

export const PasswordReset = () => {
    const {setModal} = useModal();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const {fetchApi, apiError} = useFetch();

    const methods = useForm({
        defaultValues: {
            email: '',
        },
    });

    const formSubmitHandler = async (data: { email: string }) => {
        setLoading(true);
        const responseData = await fetchApi(null, `${apiUrl}/auth/password/recovery`, "POST", "Wystąpił nieznany błąd.", data, true, "application/json");
        if (responseData) {
            setModal({
                modal: <Message type={"success"}
                                body={`Jeśli adres ${(responseData as RecoveryPasswordResponse).sentToEmail} jest prawidłowy, to został na niego wysłany link do zmiany hasła.`}
                />
            });
            navigate("/", {replace: true});
        }
        setLoading(false);
    };

    return <div className="flex flex-col items-center justify-start w-full mt-10">
        <div className="">
            <div className="mb-7"><GoBack/></div>
            <div className="flex flex-col">
                <div className="flex flex-col justify-start">
                    <h1 className="text-2xl font-bold">Przypomnij hasło</h1>
                </div>

                {apiError && <ResponseParagraph text={apiError}/>}

                {loading && <Loader/>}

                {
                    !loading && <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
                        <FormProvider {...methods}>
                            <div className="form-control gap-4 my-4">

                                <Input
                                    type="email"
                                    placeholder="E-mail"
                                    name="email"
                                    required
                                    maxLength={255}
                                    additionalClasses="h-10 bg-neutral input text-3xl tracking-widest placeholder:tracking-normal placeholder:text-base placeholder:text-neutral-content"
                                />
                            </div>
                            <div className="items-center flex flex-row place-content-between align-middle mt-6">
                                <button
                                    className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none">
                                    Zmień hasło
                                </button>
                            </div>
                        </FormProvider>
                    </form>
                }
            </div>
        </div>
    </div>
};