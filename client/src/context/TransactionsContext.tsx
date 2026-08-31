import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import * as transactionsApi from "../api/transactionsApi";
import type { TransactionType } from "../types/types";

type TransactionsContextValue = {
    transactions: TransactionType[];
    getTransaction: (id: number) => TransactionType | null;
    createTransaction: (transaction: TransactionType) => Promise<void>;
    deleteTransaction: (id: number) => Promise<void>;
    deleteAllTransactions: () => Promise<void>;
    updateAmount: (id: number, amount: number) => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextValue | null>(null);

export function TransactionsProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        transactionsApi.getAll().then(setTransactions);
    }, []);

    const getTransaction: TransactionsContextValue["getTransaction"] = (id: number) => {
        return transactions?.find((t) => t.id === id) ?? null;
    };

    const createTransaction: TransactionsContextValue["createTransaction"] = async (transaction: TransactionType) => {
        const created = await transactionsApi.create(transaction);
        setTransactions((prev) => [...prev, created]);
    };

    const deleteTransaction: TransactionsContextValue["deleteTransaction"] = async (id: number) => {
        const deleted = await transactionsApi.deleteOne(id);
        setTransactions((prev) => prev.filter((t) => t.id !== deleted.id));
    };

    const deleteAllTransactions: TransactionsContextValue["deleteAllTransactions"] = async () => {
        await transactionsApi.deleteAll();
        setTransactions([]);
    };

    const updateAmount: TransactionsContextValue["updateAmount"] = async (id: number, amount: number) => {
        const updated = await transactionsApi.updateAmount(id, amount);
        setTransactions((prev) => prev.map((t) => t.id === updated.id ? updated : t));
    };

    return (
        <TransactionsContext.Provider value={{ transactions, getTransaction, createTransaction, deleteAllTransactions, deleteTransaction, updateAmount }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const ctx = useContext(TransactionsContext);
    if (!ctx) throw new Error("useTransactions must be used within TransactionsProvider");
    return ctx;
}