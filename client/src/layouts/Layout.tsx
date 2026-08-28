import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useUserState } from "../context/AuthContext";

function Layout() {
    const { userState } = useUserState();

    if (!userState.email) {
        return (
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 p-4 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 p-4 bg-gray-100">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;