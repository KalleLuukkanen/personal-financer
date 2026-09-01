import type { TransactionType } from "../../types/types";
import { useTransactions } from "../../context/TransactionsContext";
import { useState } from "react";

export default function Transaction({ transaction }: { transaction: TransactionType }) {
    const { updateAmount, deleteTransaction } = useTransactions();

    const freq = () => {
        if (transaction.frequency === "daily") return "per day";
        if (transaction.frequency === "weekly") return "per week";
        if (transaction.frequency === "monthly") return "per month";
        if (transaction.frequency === "yearly") return "per year";
    };

    const [amount, setAmount] = useState(transaction.amount);

    const [modifying, setModifying] = useState(false);
    const cancelModifying = () => {
        setModifying(false);
        setAmount(transaction.amount);
    };

    const deleteT = async () => {
        if (!confirm("Are you sure you want to delete this?")) return;
        await deleteTransaction(transaction.id);
    };

    return (
        <div className="ml-2 flex items-center space-x-2">
            <p className="text-lg">{transaction.source}:</p>
            <p>{transaction.type === "expense" && "-"}</p>
            <input
                value={amount ?? ""}
                type="number"
                onChange={(e) => {
                    setAmount(Number(e.target.value));
                    setModifying(true);
                }}
                className="w-20"
            />
            {!modifying ? <p>{freq()}</p> :
                <div className="flex">
                    <button className="p-1 border border-gray-300 rounded cursor-pointer" onClick={cancelModifying}>Cancel</button>
                    <button className="p-1 border border-gray-300 rounded cursor-pointer" onClick={() => {
                        updateAmount(transaction.id, Number(amount));
                        setModifying(false);
                    }}>Update</button>
                </div>
            }
            <button className="ml-auto cursor-pointer" onClick={deleteT}>❌</button>
        </div>
    )
}