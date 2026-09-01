import type { AccountType } from "../../types/types";
import { useAccounts } from "../../context/AccountsContext";
import { useState } from "react";

export default function Holding({ account, showingAmounts }: { account: AccountType, showingAmounts: boolean }) {

    const { updateBalance, updateGoal, deleteAccount } = useAccounts();

    const [newBalance, setNewBalance] = useState("");
    const [newGoal, setNewGoal] = useState("");

    const [balance, setBalance] = useState(account.balance);
    const [goal, setGoal] = useState(account.goal);

    const deleteHolding = async () => {
        if (!confirm("Are you sure you want to delete this holding?")) return;
        await deleteAccount(account.id);
    };

    return (
        <>
            <div className="flex">
                <p className="text-xl mr-2">{account.name}:</p>
                <button className="ml-auto bg-red-100 p-1 rounded-lg cursor-pointer" onClick={deleteHolding}>🗑️</button>
            </div>
            <div className="text-lg ml-2">
                {account.balance && !showingAmounts && <p>Balance: ****</p>}
                {account.balance && showingAmounts &&
                    <div className="flex items-center">
                        <p>Balance:</p>
                        <input
                            id="balance"
                            name="balance"
                            value={balance ?? ""}
                            type="number"
                            onChange={(e) => setBalance(Number(e.target.value))}
                            className="p-1 w-30"
                        />
                    </div>

                }
                {!account.balance &&
                    <div className="rounded border border-gray-300">
                        <input
                            id="new_balance"
                            name="new_balance"
                            value={newBalance}
                            type="number"
                            autoComplete="off"
                            onChange={(e) => setNewBalance(e.target.value)}
                            className="p-2 w-40"
                            placeholder="Add balance"
                        />
                        <button className="p-2 cursor-pointer" onClick={() => updateBalance(account.id, Number(newBalance))}>➕</button>
                    </div>
                }
                {account.goal && <p>Goal: {showingAmounts ? account.goal : "****"}</p>}
                {!account.goal &&
                    <div className="rounded border border-gray-300">
                        <input
                            id="new_goal"
                            name="new_goal"
                            value={newGoal}
                            type="number"
                            min="1"
                            autoComplete="off"
                            onChange={(e) => setNewGoal(e.target.value)}
                            className="p-1 w-40"
                            placeholder="Add goal"
                        />
                        <button className="p-1 cursor-pointer" onClick={() => updateGoal(account.id, Number(newGoal))}>➕</button>
                    </div>
                }
            </div>
        </>

    )
}