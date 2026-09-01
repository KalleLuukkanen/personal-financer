import type { AccountType } from "../../types/types";
import { useAccounts } from "../../context/AccountsContext";
import { useState } from "react";

export default function Holding({ account, showingAmounts }: { account: AccountType, showingAmounts: boolean }) {

    const { updateBalance, updateGoal, deleteAccount } = useAccounts();

    const [newBalance, setNewBalance] = useState("");
    const [newGoal, setNewGoal] = useState("");

    const [modifyingBalance, setModifyingBalance] = useState(false);
    const [balance, setBalance] = useState(account.balance);
    const cancelModBalance = () => {
        setModifyingBalance(false);
        setBalance(account.balance);
    };

    const [modifyingGoal, setModifyingGoal] = useState(false);
    const [goal, setGoal] = useState(account.goal);
    const cancelModGoal = () => {
        setModifyingGoal(false);
        setGoal(account.goal);
    };


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
                {!showingAmounts ? <p>Balance: ****</p> :
                    <>
                        {account.balance ?
                            <div className="flex items-center">
                                {!modifyingBalance ?
                                    <>
                                        <p>Balance:</p>
                                        <input
                                            id="balance"
                                            name="balance"
                                            value={balance ?? ""}
                                            type="number"
                                            onChange={(e) => {
                                                setBalance(Number(e.target.value));
                                                setModifyingBalance(true);
                                            }}
                                            className="p-1 w-30"
                                        />
                                    </> :
                                    <>
                                        <p>New balance:</p>
                                        <input
                                            id="balance"
                                            name="balance"
                                            value={balance ?? ""}
                                            type="number"
                                            onChange={(e) => { setBalance(Number(e.target.value)) }}
                                            className="p-1 w-30"
                                        />
                                        <div className="flex flex-col ml-2">
                                            <button className="p-1 border border-gray-300 rounded cursor-pointer" onClick={cancelModBalance}>Cancel</button>
                                            <button className="p-1 border border-gray-300 rounded cursor-pointer" onClick={() => {
                                                updateBalance(account.id, Number(balance));
                                                setModifyingBalance(false);
                                            }}>Update</button>
                                        </div>
                                    </>
                                }
                            </div>
                            :
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
                                <button className="p-2 cursor-pointer" onClick={() => {
                                    updateBalance(account.id, Number(newBalance))
                                }}>➕</button>
                            </div>
                        }
                    </>
                }
                {!showingAmounts ? <p>Goal: ****</p> :
                    <>
                        {account.goal ?
                            <div className="flex items-center">
                                {!modifyingGoal ?
                                    <>
                                        <p>Goal:</p>
                                        <input
                                            id="goal"
                                            name="goal"
                                            value={goal ?? ""}
                                            type="number"
                                            onChange={(e) => {
                                                setGoal(Number(e.target.value));
                                                setModifyingGoal(true);
                                            }}
                                            className="p-1 w-30"
                                        />
                                    </> :
                                    <>
                                        <p>New goal:</p>
                                        <input
                                            id="goal"
                                            name="goal"
                                            value={goal ?? ""}
                                            type="number"
                                            onChange={(e) => { setGoal(Number(e.target.value)) }}
                                            className="p-1 w-30"
                                        />
                                        <div className="flex flex-col ml-2">
                                            <button className="p-1 border border-gray-300 rounded cursor-pointer" onClick={cancelModGoal}>Cancel</button>
                                            <button className="p-1 border border-gray-300 rounded cursor-pointer" onClick={() => {
                                                updateGoal(account.id, Number(goal));
                                                setModifyingGoal(false);
                                            }}>Update</button>
                                        </div>
                                    </>
                                }
                            </div>
                            :
                            <div className="rounded border border-gray-300">
                                <input
                                    id="new_goal"
                                    name="new_goal"
                                    value={newGoal}
                                    type="number"
                                    autoComplete="off"
                                    onChange={(e) => setNewGoal(e.target.value)}
                                    className="p-2 w-40"
                                    placeholder="Add goal"
                                />
                                <button className="p-2 cursor-pointer" onClick={() => {
                                    updateGoal(account.id, Number(newGoal))
                                }}>➕</button>
                            </div>
                        }
                    </>
                }
            </div>
        </>

    )
}