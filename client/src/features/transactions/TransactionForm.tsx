import { useTransactions } from "../../context/TransactionsContext";
import { useState } from "react";

export default function TransactionForm() {

    const { createTransaction } = useTransactions();

    const [transactionType, setTransactionType] = useState("income");
    const [transactionFreq, setTransactionFreq] = useState("monthly");
    const [transactionSource, setTransactionSource] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");

    const reset = () => {
        setTransactionType("income");
        setTransactionFreq("monthly");
        setTransactionSource("");
        setTransactionAmount("");
    };

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createTransaction({
            source: transactionSource,
            amount: Number(transactionAmount),
            type: transactionType,
            frequency: transactionFreq
        });

        reset();
    };

    return (
        <div className="space-y-4">
            <p className="text-2xl font-bold">Add a new transaction:</p>
            <form className="flex flex-col space-y-6 rounded border border-gray-500 shadow-lg p-4 w-fit" onSubmit={handleForm}>
                <label className="flex flex-col space-y-2">
                    <span>Income or expense?</span>
                    <select
                        className="w-64 rounded border border-gray-300 p-1"
                        onChange={(e) => setTransactionType(e.target.value)}
                        value={transactionType}
                    >
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </label>
                <label className="flex flex-col space-y-2">
                    <span>What's the source?</span>
                    <input
                        type="text"
                        value={transactionSource}
                        required
                        autoComplete="off"
                        className="w-128 rounded p-1 border border-gray-300"
                        onChange={(e) => setTransactionSource(e.target.value)}
                        placeholder="For example job, food, bills..."
                    />
                </label>
                <label className="flex flex-col space-y-2">
                    <span>How much?</span>
                    <input
                        type="number"
                        value={transactionAmount}
                        required
                        autoComplete="off"
                        className="w-128 rounded p-1 border border-gray-300"
                        onChange={(e) => setTransactionAmount(e.target.value)}
                    />
                </label>
                <label className="flex flex-col space-y-2">
                    <span>How often is this {transactionType === "income" ? "income" : "expense"}?</span>
                    <select
                        className="w-64 rounded border border-gray-300 p-1"
                        onChange={(e) => setTransactionFreq(e.target.value)}
                        value={transactionFreq}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </label>
                <div className="grid grid-cols-[1fr_2fr] gap-8 ml-6 mr-6 mb-2">
                    <button type="button" className="rounded p-2 bg-red-300 cursor-pointer rounded-xl" onClick={reset}>Cancel</button>
                    <button type="submit" className="rounded p-2 bg-blue-300 cursor-pointer rounded-xl">Add {transactionType === "income" ? "income" : "expense"}</button>
                </div>
            </form>
        </div>
    )
}