import * as transactionsRepository from "../repositories/transactionsRepository.js";
import { Request, Response } from "express";

const getAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const transactions = await transactionsRepository.getAll(user_id);
    return res.status(200).json(transactions);
};

const getOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.transactionId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const transaction = await transactionsRepository.getOne(user_id, id);
    if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
    }
    return res.status(200).json(transaction);
};

const deleteOne = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.transactionId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const deleted_transaction = await transactionsRepository.deleteOne(user_id, id);
    if (!deleted_transaction) {
        return res.status(404).json({ error: "Could not delete transaction" });
    }
    return res.status(200).json(deleted_transaction);
};

const deleteAll = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const deleted_transactions = await transactionsRepository.deleteAll(user_id);
    if (deleted_transactions.length === 0) {
        return res.status(404).json({ error: "Could not delete transactions" });
    }
    return res.status(200).json(deleted_transactions);
};

const create = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const transaction = req.body;
    if (!transaction.type || !transaction.source || !transaction.amount) {
        return res.status(400).json({ error: "Missing required parameters" });
    }
    const created_transaction = await transactionsRepository.create(user_id, transaction.source, transaction.amount, transaction.type);
    if (!created_transaction) {
        return res.status(404).json({ error: "Could not create transaction" });
    }
    return res.status(200).json(created_transaction);
};

const updateAmount = async (req: Request, res: Response) => {
    const user_id = (req as any).userId;
    const id = Number(req.params.transactionId);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const transaction = req.body;
    if (!transaction.amount) {
        return res.status(400).json({ error: "Missing new amount" });
    }
    const updated_transaction = await transactionsRepository.updateAmount(user_id, id, transaction.amount);
    if (!updated_transaction) {
        return res.status(404).json({ error: "Could not update transaction" });
    }
    return res.status(200).json(updated_transaction);
};

export { getAll, getOne, deleteOne, deleteAll, create, updateAmount };