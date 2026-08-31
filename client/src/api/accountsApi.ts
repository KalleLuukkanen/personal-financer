const BASE_URL = `${import.meta.env.VITE_API_URL}/api/accounts`;
import type { AccountInput } from "../types/types";

const getAll = async () => {
    const response = await fetch(BASE_URL, {
        credentials: "include",
    });
    return await response.json();
};

const getOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
};

const deleteOne = async (id: number) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
};

const deleteAll = async () => {
    const response = await fetch(`${BASE_URL}`, {
        credentials: "include",
        method: "DELETE",
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
};

const create = async (account: AccountInput) => {
    const response = await fetch(`${BASE_URL}`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
};

const updateBalance = async (id: number, balance: number) => {
    const response = await fetch(`${BASE_URL}/${id}/balance`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
};

const updateGoal = async (id: number, goal: number) => {
    const response = await fetch(`${BASE_URL}/${id}/goal`, {
        credentials: "include",
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    return await response.json();
};


export { getAll, getOne, deleteAll, deleteOne, create, updateBalance, updateGoal };