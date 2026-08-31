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
    created_at: string;
};

export type TransactionInput = Omit<TransactionType, "id">;