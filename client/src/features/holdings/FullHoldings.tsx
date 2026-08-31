import { useAccounts } from "../../context/AccountsContext";
import { useState } from "react";
import Holding from "./Holding";

function FullHoldings() {
    const { accounts } = useAccounts();

    const [showingAmounts, setShowingAmounts] = useState(true);

    const holdingsBalance = accounts.reduce((sum, a) => Number(sum) + Number((a.balance ?? 0)), 0);
    const holdingsGoals = accounts.reduce((sum, a) => Number(sum) + Number((a.goal ?? 0)), 0);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex">
                <p className="text-2xl font-bold">Holdings</p>
                <button onClick={() => setShowingAmounts(!showingAmounts)} className="ml-6 cursor-pointer text-xl">{showingAmounts ? "🔒" : "🔓"}</button>
            </div>

            <div className="text-xl">
                <p>Balances in full: {showingAmounts ? Number(holdingsBalance).toFixed(2) : "****"}</p>
                <p>Goals in full: {showingAmounts ? Number(holdingsGoals).toFixed(2) : "****"}</p>
            </div>
            {accounts.length > 0 &&
                <ul className="flex flex-wrap gap-4">
                    {accounts.map((a) =>
                        <li key={a.id} className="flex flex-col space-y-2 rounded shadow-lg p-4 bg-gray-100">
                            <Holding account={a} showingAmounts={showingAmounts} />
                        </li>
                    )}
                </ul>
            }
            {accounts.length === 0 && <p>You haven't added any holdings yet.</p>}
        </ div >
    )
}

export default FullHoldings;