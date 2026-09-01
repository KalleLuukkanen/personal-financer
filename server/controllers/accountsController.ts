import * as accountsRepository from "../repositories/accountsRepository.js";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const accounts = await accountsRepository.getAll(user_id);
    return res.status(200).json(accounts);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.accountId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const account = await accountsRepository.getOne(user_id, id);
    if (!account) {
        return res.status(404).json({ error: "Account not found" });
    }
    return res.status(200).json(account);
};

const deleteOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.accountId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const deleted_account = await accountsRepository.deleteOne(user_id, id);
    if (!deleted_account) {
        return res.status(404).json({ error: "Account could not be deleted" });
    }
    return res.status(200).json(deleted_account);
};

const deleteAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const deleted_accounts = await accountsRepository.deleteAll(user_id);
    if (deleted_accounts.length === 0) {
        return res.status(404).json({ error: "No accounts deleted" });
    }
    return res.status(200).json(deleted_accounts);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const account = req.body;
    if (!account.name) {
        return res.status(400).json({ error: "Missing name for account" });
    }
    const created_account = await accountsRepository.create(user_id, account.name, account.balance, account.goal);
    if (!created_account) {
        return res.status(404).json({ error: "Account could not be created" });
    }
    return res.status(200).json(created_account);
};

const updateBalance = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.accountId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const account = req.body;
    if (!account.balance) {
        return res.status(400).json({ error: "Missing new balance for account" });
    }
    const updated_account = await accountsRepository.updateBalance(user_id, id, account.balance);
    if (!updated_account) {
        return res.status(404).json({ error: "Could not update balance" });
    }
    return res.status(200).json(updated_account);
};

const updateGoal = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.accountId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const account = req.body;
    if (!account.goal) {
        return res.status(400).json({ error: "Missing new goal for account" });
    }
    const updated_account = await accountsRepository.updateGoal(user_id, id, account.goal);
    if (!updated_account) {
        return res.status(404).json({ error: "Could not update goal" });
    }
    return res.status(200).json(updated_account);
};

const getHistory = async (req: Request, res: Response) => {
    const account_id = Number(req.params.accountId);
    if (!Number.isInteger(account_id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const history = await accountsRepository.getHistory(account_id);
    return res.status(200).json(history);
};

export { getAll, getOne, deleteOne, deleteAll, create, updateBalance, updateGoal, getHistory };