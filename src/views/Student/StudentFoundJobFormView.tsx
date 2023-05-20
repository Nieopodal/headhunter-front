import {SmallFormContainer} from "../../components/common/SmallFormContainer";
import {useContext} from "react";
import {UserContext} from "../../contexts/user.context";
import {useFetch} from "../../hooks/useFetch";
import {apiUrl} from "../../config/api";
import {useLogout} from "../../hooks/useLogout";
import {ResponseParagraph} from "../../components/common/ResponseParagraph";

export const StudentFoundJobFormView = () => {

    const {user} = useContext(UserContext);
    const {fetchApi, apiError} = useFetch();
    const {logoutUser} = useLogout();

    return <SmallFormContainer title="Potwierdź znalezienie pracy." description="Opcja ta dezaktywuje konto.">
        <form onSubmit={(e)=> {
            e.preventDefault();
            (async () => {
                const data = await fetchApi(user, `${apiUrl}/student/employed`, "PATCH", "Wystąpił nieznany błąd");
                if (data) {
                    await logoutUser();
                }
            })();
        }}>
            <button className="w-full btn-sm h-10 btn-primary normal-case font-normal text-base rounded-none">Potwierdzam</button>
            {apiError && <ResponseParagraph text={apiError}/>}
        </form>
    </SmallFormContainer>
};