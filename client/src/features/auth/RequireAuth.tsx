import { Outlet } from "react-router-dom";
import { useUserState } from "../../context/AuthContext";
import Login from "./Login";
import Loading from "../../layouts/Loading";

function RequireAuth() {
    const { userState } = useUserState();

    if (userState.loading) {
        return <Loading />;
    }

    if (!userState.email) {
        return <Login />;
    }

    return <Outlet />;
}

export default RequireAuth;