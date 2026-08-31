import { useAccounts } from "../../context/AccountsContext";
import { useState } from "react";

export default function HoldingsForm() {

    const { createAccount } = useAccounts();

    const [holdingName, setHoldingName] = useState<string>("");
    const [holdingBalance, setHoldingBalance] = useState<string>("");
    const [holdingGoal, setHoldingGoal] = useState<string>("");

    const reset = () => {
        setHoldingName("");
        setHoldingBalance("");
        setHoldingGoal("");
    };

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createAccount({
            name: holdingName,
            balance: holdingBalance ? Number(holdingBalance) : null,
            goal: holdingGoal ? Number(holdingGoal) : null,
        });
        reset();
    };

    return (
        <div className="space-y-4">
            <p className="text-2xl font-bold">Add a new holding:</p>
            <form className="flex flex-col space-y-6 rounded border border-gray-500 shadow-lg p-4 w-fit" onSubmit={handleForm}>
                <label className="flex flex-col space-y-2">
                    <span>Name for holding:</span>
                    <input
                        id="name"
                        name="name"
                        value={holdingName}
                        type="text"
                        required
                        autoComplete="off"
                        onChange={(e) => setHoldingName(e.target.value)}
                        placeholder="For example savings account, checking account, mortgage etc..."
                        className="w-128 rounded p-2 border border-gray-300"
                    />
                </label>
                <label className="flex flex-col space-y-2">
                    <span>What's the balance of this holding currently?</span>
                    <input
                        id="balance"
                        name="balance"
                        value={holdingBalance}
                        type="number"
                        autoComplete="off"
                        onChange={(e) => setHoldingBalance(e.target.value)}
                        placeholder="You can leave this empty for now, if you choose so"
                        className="w-128 rounded p-2 border border-gray-300"
                    />
                </label>
                <label className="flex flex-col space-y-2">
                    <span>What's your goal for this holding?</span>
                    <input
                        id="goal"
                        name="goal"
                        value={holdingGoal}
                        type="number"
                        min="1"
                        autoComplete="off"
                        onChange={(e) => setHoldingGoal(e.target.value)}
                        placeholder="You can also leave this empty"
                        className="w-128 rounded p-2 border border-gray-300"
                    />
                </label>
                <div className="grid grid-cols-[1fr_2fr] gap-8 ml-6 mr-6 mb-2">
                    <button type="button" className="rounded p-2 bg-red-300 cursor-pointer rounded-xl" onClick={reset}>Cancel</button>
                    <button type="submit" className="rounded p-2 bg-blue-300 cursor-pointer rounded-xl">Add holding</button>
                </div>
            </form>
        </div>
    )
}