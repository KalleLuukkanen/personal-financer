import Chart from "../features/Chart";
import HoldingsSummary from "../features/holdings/HoldingsSummary";
import TransactionsSummary from "../features/transactions/TransactionsSummary";
import { useAccounts } from "../context/AccountsContext";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
    const { accounts } = useAccounts();

    const net_worth = accounts.reduce((sum, a) => Number(sum) + Number((a.balance ?? 0)), 0);

    const [currentAccount_id, setCurrentAccount_id] =
        useState<number | null>(null);

    useEffect(() => {
        if (accounts.length > 0 && currentAccount_id === null) {
            setCurrentAccount_id(accounts[0].id);
        }
    }, [accounts, currentAccount_id]);

    return (
        <div className="flex flex-col space-y-6">
            <div className="space-y-4 shadow-lg p-2 border border-gray-300 rounded w-64">
                <p className="text-3xl font-bold">Networth:</p>
                <p className="text-2xl ml-2">{net_worth.toFixed(2)} €</p>
            </div>
            <div className="grid grid-cols-2 gap-2 divide-x shadow-lg p-2 border border-gray-300 rounded">
                <HoldingsSummary />
                <TransactionsSummary />
            </div>
            <div className="space-y-4 shadow-lg p-2 border border-gray-300 rounded">
                <select
                    value={currentAccount_id ?? ""}
                    onChange={(e) =>
                        setCurrentAccount_id(Number(e.target.value))
                    }
                    className="rounded border border-gray-300 p-1"
                >
                    {accounts.map((a) => (
                        <option key={a.id} value={a.id}>
                            {a.name}
                        </option>
                    ))}
                </select>
                <Chart accountId={currentAccount_id} />
            </div>
        </div>
    );
}