import { useAccounts } from "../../context/AccountsContext";

function Holdings() {
    const { accounts } = useAccounts();

    return (
        <div className="flex flex-col space-y-4">
            <a href="/manage/holdings" className="text-2xl font-bold hover:text-gray-600 hover:underline">Holdings</a>
            {accounts.length > 0 &&
                <div className="space-y-4">
                    <div className="space-y-2">
                        <p className="text-xl">Balances</p>
                        <ul className="ml-2 text-lg">
                            {accounts.map((a) =>
                                <li key={a.id}>
                                    <p>{a.name}: {a.balance}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl">Goals</p>
                        <ul className="ml-2 text-lg">
                            {accounts.map((a) =>
                                <li key={a.id}>
                                    <p>{a.name}: {a.goal}</p>
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

export default Holdings;