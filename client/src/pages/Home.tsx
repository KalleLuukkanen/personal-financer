import Chart from "../features/Chart";
import HoldingsSummary from "../features/holdings/HoldingsSummary";
import TransactionsSummary from "../features/transactions/TransactionsSummary";

function Home() {
    return (
        <div className="grid grid-cols-[2fr_1fr] gap-1">
            <Chart />
            <div className="flex flex-col space-y-6 shadow-lg rounded border border-gray-300 p-4">
                <HoldingsSummary />
                <TransactionsSummary />
            </div>
        </div>
    )
}

export default Home;