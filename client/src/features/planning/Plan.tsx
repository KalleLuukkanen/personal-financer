import { useAccounts } from "../../context/AccountsContext";
import { useTransactions } from "../../context/TransactionsContext";

export default function Plan() {

    const { accounts } = useAccounts();
    const { transactions } = useTransactions();

    return (
        <div></div>
    )
}