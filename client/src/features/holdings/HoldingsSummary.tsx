import { useAccounts } from "../../context/AccountsContext";
import { useState } from "react";

function HoldingsSummary() {
    const { accounts } = useAccounts();

    const holdingsBalance = accounts.reduce((sum, a) => Number(sum) + Number((a.balance ?? 0)), 0);

    const [showingAmounts, setShowingAmounts] = useState(true);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex">
                <a href="/manage/holdings" className="text-2xl font-bold hover:text-gray-600 hover:underline">Holdings</a>
                <button onClick={() => setShowingAmounts(!showingAmounts)} className="ml-6 cursor-pointer text-xl">{showingAmounts ? "🔒" : "🔓"}</button>
            </div>
            {accounts.length > 0 &&
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-xl">Balances</p>
                        <ul className="ml-2 text-lg">
                            {accounts.map((a) =>
                                <li key={a.id}>
                                    <p>{a.name}: {showingAmounts ? a.balance : "****"}</p>
                                </li>
                            )}
                        </ul>
                        <p className="text-xl ml-2">In total: {showingAmounts ? Number(holdingsBalance).toFixed(2) : "****"}</p>
                    </div>
                </div>
            }
            {accounts.length === 0 && <p>You haven't added any holdings yet, click above to get started!</p>}
        </ div>
    )
}

export default HoldingsSummary;