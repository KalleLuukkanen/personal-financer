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
    }

    const [modifying, setModifying] = useState(false);

    const deleteT = async () => {
        if (!confirm("Are you sure you want to delete this?")) return;
        await deleteTransaction(transaction.id);
    };

    return (
        <div className="ml-2 flex items-center space-x-2">
            <p className="text-lg">{transaction.source}:</p>
            <p>{transaction.type === "expense" && "- "}{transaction.amount}</p>
            <p>{freq()}</p>
            <button className="ml-auto cursor-pointer" onClick={deleteT}>❌</button>
        </div>
    )
}