import Chart from "../features/Chart";
import HoldingsSummary from "../features/holdings/HoldingsSummary";
import TransactionsSummary from "../features/transactions/TransactionsSummary";
import { useAccounts } from "../context/AccountsContext";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
    const { accounts } = useAccounts();

    const [currentAccount_id, setCurrentAccount_id] =
        useState<number | null>(null);

    useEffect(() => {
        if (accounts.length > 0 && currentAccount_id === null) {
            setCurrentAccount_id(accounts[0].id);
        }
    }, [accounts, currentAccount_id]);

    return (
        <div className="grid grid-cols-[2fr_1fr] gap-1">
            <div className="space-y-4">
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

            <div className="flex flex-col space-y-6 shadow-lg rounded border border-gray-300 p-4">
                <HoldingsSummary />
                <TransactionsSummary />
            </div>
        </div>
    );
}