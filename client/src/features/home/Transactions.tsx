import Income from "./Income";
import Expenses from "./Expenses";

function Transactions() {
    return (
        <div className="flex flex-col space-y-4">
            <a href="/manage/transactions" className="text-2xl font-bold hover:text-gray-600 hover:underline">Transactions</a>
            <div className="space-y-4">
                <Income />
                <Expenses />
            </div>
        </div>
    )
}
export default Transactions;