import { useTransactions } from "../../context/TransactionsContext";
import { useState } from "react";

export default function TransactionsSummary() {

    const { transactions, income, expenses } = useTransactions();

    const [showingAmounts, setShowingAmounts] = useState(true);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex">
                <a href="/manage/transactions" className="text-2xl font-bold hover:text-gray-600 hover:underline">Transactions</a>
                <button onClick={() => setShowingAmounts(!showingAmounts)} className="ml-6 cursor-pointer text-xl">{showingAmounts ? "🔒" : "🔓"}</button>
            </div>
            {transactions.length > 0 &&
                <div className="space-y-4">
                    <div className="space-y-2">
                        <a className="text-xl">Income</a>
                        <ul className="ml-2 text-lg">
                            {income.map((t) => (
                                <li className="flex items-center space-x-1" key={t.id}>
                                    <p className="text-lg">{t.source}:</p>
                                    <p>{showingAmounts ? t.amount : "****"}</p>
                                    <p>{t.frequency}</p>
                                </li>
                            ))}
                            {income.length === 0 && <p>No income, click on transactions to add.</p>}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl">Expenses</p>
                        <ul className="ml-2 text-lg">
                            {expenses.map((t) => (
                                <li className="flex items-center space-x-1" key={t.id}>
                                    <p className="text-lg">{t.source}:</p>
                                    <p>-{showingAmounts ? t.amount : "****"}</p>
                                    <p>{t.frequency}</p>
                                </li>
                            ))}
                            {income.length === 0 && <p>No expenses added, click on transactions to add.</p>}
                        </ul>
                    </div>
                </div>
            }
            {transactions.length === 0 && <p>No transactions added, click on transactions to add some.</p>}
        </div>
    )
}