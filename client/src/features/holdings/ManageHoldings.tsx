import FullHoldings from "./FullHoldings";
import HoldingsForm from "./HoldingsForm";

function ManageHoldings() {
    return (
        <div className="grid grid-cols-[2fr_1fr] gap-1">
            <FullHoldings />
            <HoldingsForm />
        </div>
    )
}

export default ManageHoldings;