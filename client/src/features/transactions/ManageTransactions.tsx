import FullTransactions from "./FullTransactions";
import TransactionForm from "./TransactionForm";

function ManageTransactions() {
    return (
        <div className="grid grid-cols-[2fr_1fr] gap-1">
            <FullTransactions />
            <TransactionForm />
        </div>
    )
}

export default ManageTransactions;