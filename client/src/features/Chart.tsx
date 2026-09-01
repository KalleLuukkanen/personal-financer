import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useAccounts } from "../context/AccountsContext";
import type { HistoryPoint } from "../types/types";

function Chart({ accountId }: { accountId: number | null }) {
    const [history, setHistory] = useState<HistoryPoint[]>([]);
    const { getHistory } = useAccounts();

    useEffect(() => {
        if (accountId === null) {
            setHistory([]);
            return;
        }

        getHistory(accountId).then(setHistory);
    }, [accountId, getHistory]);

    const chartData = history.map((h) => ({
        date: new Date(h.recorded_at).toLocaleDateString("fi-FI"),
        balance: h.balance,
    }));

    if (accountId === null) {
        return <p>Select an account</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#3b82f6"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default Chart;