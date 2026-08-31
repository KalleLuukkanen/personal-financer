export type AccountType = {
    id: number;
    name: string;
    balance: number | null;
    goal: number | null;
};

export type TransactionType = {
    id: number;
    source: string;
    type: string;
    amount: number;
    created_at: string;
};