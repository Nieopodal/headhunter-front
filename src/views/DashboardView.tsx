import {useLogout} from "../hooks/useLogout";

export const DashboardView = () => {
    const {logoutUser} = useLogout();

    return <>
        <p>Zalogowano!</p>
        <button onClick={logoutUser}>Wyloguj!</button>
    </>
}