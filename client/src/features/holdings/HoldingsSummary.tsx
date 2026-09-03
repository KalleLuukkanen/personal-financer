import { useAccounts } from "../../context/AccountsContext";
import { useState } from "react";

function HoldingsSummary() {
    const { accounts } = useAccounts();

    const [showingAmounts, setShowingAmounts] = useState(true);

    const assets = accounts.filter((a) => (a.balance ?? 0) >= 0);
    const liabilities = accounts.filter((a) => (a.balance ?? 0) < 0);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex">
                <a href="/manage/holdings" className="text-2xl font-bold hover:text-gray-600 hover:underline">Holdings</a>
                <button onClick={() => setShowingAmounts(!showingAmounts)} className="ml-6 cursor-pointer text-xl">{showingAmounts ? "🔒" : "🔓"}</button>
            </div>
            {accounts.length > 0 &&
                <div className="grid grid-cols-2 gap-1">
                    <div>
                        <p className="text-xl">Assets</p>
                        <ul className="ml-2 text-lg">
                            {assets.map((a) =>
                                <li key={a.id}>
                                    <p>{a.name}: {showingAmounts ? `${a.balance} €` : "****"}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <p className="text-xl">Liabilities</p>
                        <ul className="ml-2 text-lg">
                            {liabilities.map((a) =>
                                <li key={a.id}>
                                    <p>{a.name}: {showingAmounts ? `${a.balance} €` : "****"}</p>
                                </li>
                            )}
                        </ul>
                    </div>

                </div>
            }
            {accounts.length === 0 && <p>You haven't added any holdings yet, click above to get started!</p>}
        </ div>
    )
}

export default HoldingsSummary;