import { useTransactions } from "../../context/TransactionsContext";
import type { TransactionType } from "../../types/types";
import Transaction from "./Transaction";

export default function FullTransactions() {
    const { transactions, income, expenses } = useTransactions();

    const sum = (arr: TransactionType[]) => {
        if (arr.length === 0) return 0;
        if (arr[0].type === "income") return arr.reduce((sum, t) => Number(sum) + Number((t.amount ?? 0)), 0);
        if (arr[0].type === "expense") return arr.reduce((sum, t) => Number(sum) - Number((t.amount ?? 0)), 0);
    };

    const revenuePerMonth = ((sum(income ?? []) as number) + (sum(expenses ?? []) as number)).toFixed(2);

    return (
        <div className="flex flex-col space-y-4">
            <p className="text-2xl font-bold">Transactions</p>
            {transactions.length === 0 ? <p>No transactions added. Add some on the right!</p> :
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col space-y-2">
                        <p className="text-xl">Income:</p>
                        <ul className="flex flex-col space-y-2">
                            {income.length === 0 && <li>You have no income added</li>}
                            {income.map((t) =>
                                <li className="border border-gray-300 p-1" key={t.id}>
                                    <Transaction transaction={t} />
                                </li>
                            )}
                        </ul>
                        <p className="text-xl mt-2">In total: {sum(income)?.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className="text-xl">Expenses:</p>
                        <ul className="flex flex-col space-y-2">
                            {expenses.length === 0 && <li>You have no expenses added</li>}
                            {expenses.map((t) =>
                                <li className="border border-gray-300 p-1" key={t.id}>
                                    <Transaction transaction={t} />
                                </li>
                            )}
                        </ul>
                        <p className="text-xl mt-2">In total: {sum(expenses)?.toFixed(2)}</p>
                    </div>
                </div>
            }
            {transactions.length > 0 && <p className="text-2xl">Revenue per month: {revenuePerMonth}</p>}
        </div>
    )

}