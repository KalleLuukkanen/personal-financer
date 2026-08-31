import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useUserState } from "../context/AuthContext";
import { AccountsProvider } from "../context/AccountsContext";
import { TransactionsProvider } from "../context/TransactionsContext";

function Layout() {
    const { userState } = useUserState();

    if (!userState.email) {
        return (
            <div className="flex flex-col min-h-screen">
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
        );
    }

    return (
        <AccountsProvider>
            <TransactionsProvider>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 p-4">
                        <Outlet />
                    </main>
                </div>
            </TransactionsProvider>
        </AccountsProvider>
    );
}

export default Layout;