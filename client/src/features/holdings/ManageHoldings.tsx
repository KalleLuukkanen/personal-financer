import FullHoldings from "./FullHoldings";
import HoldingsForm from "./HoldingsForm";

function ManageHoldings() {
    return (
        <div className="grid grid-cols-2 gap-1">
            <FullHoldings />
            <HoldingsForm />
        </div>
    )
}

export default ManageHoldings;