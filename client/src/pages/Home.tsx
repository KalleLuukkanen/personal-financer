import Chart from "../features/Chart";
import Holdings from "../features/holdings/Holdings";
import Transactions from "../features/transactions/Transactions";

function Home() {
    return (
        <div className="grid grid-cols-[2fr_1fr] gap-1">
            <Chart />
            <div className="flex flex-col space-y-6 shadow-lg rounded border border-gray-300 p-4">
                <Holdings />
                <Transactions />
            </div>

        </div>
    )
}

export default Home;