import Holdings from "./Holdings"
import Goals from "./Goals"

function Accounts() {
    return (
        <div className="flex flex-col space-y-4">
            <a href="/manage/accounts" className="text-2xl font-bold hover:text-gray-600 hover:underline">Accounts</a>
            <div className="space-y-4">
                <Holdings />
                <Goals />
            </div>
        </ div>
    )
}

export default Accounts;