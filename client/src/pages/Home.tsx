import Chart from "../features/home/Chart";
import Accounts from "../features/home/Accounts";
import Transactions from "../features/home/Transactions";

function Home() {
    return (
        <div className="grid grid-cols-[2fr_1fr] gap-1">
            <Chart />
            <div className="flex flex-col space-y-6 shadow-lg rounded border border-gray-300 p-4">
                <Accounts />
                <Transactions />
            </div>

        </div>
    )
}

export default Home;