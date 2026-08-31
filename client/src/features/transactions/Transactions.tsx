import { useTransactions } from "../../context/TransactionsContext";

function Transactions() {

    const { transactions, income, expenses } = useTransactions();

    return (
        <div className="flex flex-col space-y-4">
            <a href="/manage/transactions" className="text-2xl font-bold hover:text-gray-600 hover:underline">Transactions</a>
            {transactions.length > 0 &&
                <div className="space-y-4">
                    <div className="space-y-2">
                        <a className="text-xl">Income</a>
                        <ul className="ml-2 text-lg">
                            {income.map((t) => (
                                <li key={t.id}>
                                    <p></p>
                                </li>
                            ))}
                            {income.length === 0 && <p>No income, click on transactions to add.</p>}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl">Expenses</p>
                        <ul className="ml-2 text-lg">
                            {expenses.map((t) => (
                                <li key={t.id}>
                                    <p></p>
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

export default Transactions;