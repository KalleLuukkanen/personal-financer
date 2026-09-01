import express from "express";
import cors from "cors";
import morgan from "morgan";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "./auth.js";

import * as accountsController from "./controllers/accountsController.js";
import * as transactionsController from "./controllers/transactionsController.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.use(async (req, res, next) => {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session) {
        return next();
    }
    (req as any).userId = session.user.id;
    return next();
});

app.use("/api", (req, res, next) => {
    const userId = (req as any).userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    return next();
});

//accounts
app.get("/api/accounts", accountsController.getAll);
app.get("/api/accounts/:accountId", accountsController.getOne);
app.get("/api/accounts/:accountId/history", accountsController.getHistory)
app.delete("/api/accounts", accountsController.deleteAll);
app.delete("/api/accounts/:accountId", accountsController.deleteOne);
app.post("/api/accounts", accountsController.create);
app.patch("/api/accounts/:accountId/balance", accountsController.updateBalance);
app.patch("/api/accounts/:accountId/goal", accountsController.updateGoal);

//transactions
app.get("/api/transactions", transactionsController.getAll);
app.get("/api/transactions/:transactionId", transactionsController.getOne);
app.delete("/api/transactions", transactionsController.deleteAll);
app.delete("/api/transactions/:transactionId", transactionsController.deleteOne);
app.post("/api/transactions", transactionsController.create);
app.patch("/api/transactions/:transactionId/amount", transactionsController.updateAmount);

export default app;