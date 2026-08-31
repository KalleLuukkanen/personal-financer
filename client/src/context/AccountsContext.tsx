import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react";
import * as accountsApi from "../api/accountsApi";
import type { AccountType } from "../types/types";

type AccountsContextValue = {
    accounts: AccountType[];
    getAccount: (id: number) => AccountType | null;
    createAccount: (account: AccountType) => Promise<void>;
    deleteAccount: (id: number) => Promise<void>;
    deleteAllAccounts: () => Promise<void>;
    updateBalance: (id: number, balance: number) => Promise<void>;
    updateGoal: (id: number, goal: number) => Promise<void>;
};

const AccountsContext = createContext<AccountsContextValue | null>(null);

export function AccountsProvider({ children }: { children: ReactNode }) {
    const [accounts, setAccounts] = useState<AccountType[]>([]);
    const fetchedRef = useRef(false)

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        accountsApi.getAll().then(setAccounts);
    }, []);

    const getAccount: AccountsContextValue["getAccount"] = (id: number) => {
        return accounts?.find((a) => a.id === id) ?? null;
    };

    const createAccount: AccountsContextValue["createAccount"] = async (account: AccountType) => {
        const created = await accountsApi.create(account);
        setAccounts((prev) => [...prev, created]);
    };

    const deleteAllAccounts: AccountsContextValue["deleteAllAccounts"] = async () => {
        await accountsApi.deleteAll();
        setAccounts([]);
    };

    const deleteAccount: AccountsContextValue["deleteAccount"] = async (id: number) => {
        const deleted = await accountsApi.deleteOne(id);
        setAccounts((prev) => prev.filter((a) => a.id !== deleted.id));
    };

    const updateBalance: AccountsContextValue["updateBalance"] = async (id: number, balance: number) => {
        const updated = await accountsApi.updateBalance(id, balance);
        setAccounts((prev) => prev.map((a) => (a.id === id ? updated : a)));
    };

    const updateGoal: AccountsContextValue["updateGoal"] = async (id: number, goal: number) => {
        const updated = await accountsApi.updateGoal(id, goal);
        setAccounts((prev) => prev.map((a) => (a.id === id ? updated : a)));
    };

    return (
        <AccountsContext.Provider value={{ accounts, getAccount, createAccount, deleteAllAccounts, deleteAccount, updateBalance, updateGoal }}>
            {children}
        </AccountsContext.Provider>
    )
}

export function useAccounts() {
    const ctx = useContext(AccountsContext);
    if (!ctx) throw new Error("useAccounts must be used within AccountsProvider");
    return ctx;
}