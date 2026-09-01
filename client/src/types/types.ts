export type AccountType = {
    id: number;
    name: string;
    balance: number | null;
    goal: number | null;
};

export type AccountInput = Omit<AccountType, "id">;

export type TransactionType = {
    id: number;
    source: string;
    type: string;
    amount: number;
    frequency: string;
    created_at: string;
};

export type TransactionInput = Omit<TransactionType, "id" | "created_at">;

export type HistoryPoint = {
    id: number;
    account_id: number;
    balance: number;
    recorded_at: string;
};