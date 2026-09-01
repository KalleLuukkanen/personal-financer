import { useUserState } from "../context/AuthContext";
import { useState } from "react";

function Menu({ onClose }: { onClose: () => void }) {

    const [isManageOpen, setIsManageOpen] = useState(false);

    const { logout } = useUserState();

    return (
        <>
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <div className="absolute right-0 z-50 flex flex-col text-xl shadow-xl w-64 p-2 bg-gray-100 min-h-screen rounded">
                <button onClick={onClose} className="text-lg ml-auto cursor-pointer">❌</button>
                <nav className="flex flex-col items-center justify-center space-y-2 mt-4">
                    <a href="/" className="hover:text-blue-600 hover:underline">Home</a>
                    <button onClick={() => setIsManageOpen(!isManageOpen)} className="cursor-pointer hover:font-bold">Manage</button>
                    {isManageOpen &&
                        <div className="text-sm flex flex-col space-y-2 items-center justify-center">
                            <a href="/manage/holdings" className="hover:text-blue-600 hover:underline">Holdings</a>
                            <a href="/manage/transactions" className="hover:text-blue-600 hover:underline">Transactions</a>
                        </div>
                    }
                    <a href="/plan" className="hover:text-blue-600 hover:underline">Plan</a>
                    <a href="/about" className="hover:text-blue-600 hover:underline">About</a>
                </nav>
                <button onClick={logout} className="mt-auto mb-4 rounded p-2 border bg-red-200 cursor-pointer">Log out</button>
            </div>
        </>
    )
}

export default Menu;