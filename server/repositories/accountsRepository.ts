import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM accounts
        WHERE user_id = ${user_id};`;
    return result;
};

const getOne = async (user_id: string, id: number) => {
    const result = await sql`
        SELECT *
        FROM accounts
        WHERE user_id = ${user_id} AND id = ${id};`;
    return result[0];
};

const deleteOne = async (user_id: string, id: number) => {
    const result = await sql`
        DELETE
        FROM accounts
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;
    `;
    return result[0];
};

const deleteAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM accounts
        WHERE user_id = ${user_id}
        RETURNING *;
    `;
    return result;
};

const create = async (user_id: string, name: string, balance: number | null, goal: number | null) => {
    return await sql.begin(async (sql) => {
        const result = await sql`
            INSERT INTO accounts (name, balance, goal, user_id)
            VALUES (${name}, ${balance}, ${goal}, ${user_id})
            RETURNING *;`;
        const account = result[0];

        if (balance !== null) {
            await sql`
                INSERT INTO account_balance_history (account_id, balance)
                VALUES (${account.id}, ${balance});`;
        }

        return account;
    });
};

const updateBalance = async (user_id: string, id: number, new_balance: number) => {
    return await sql.begin(async (sql) => {
        const result = await sql`
            UPDATE accounts
            SET balance = ${new_balance}
            WHERE user_id = ${user_id} AND id = ${id}
            RETURNING *;`;
        await sql`INSERT INTO account_balance_history (account_id, balance) VALUES (${id}, ${new_balance});`;
        return result[0] ?? null;
    });
};

const updateGoal = async (user_id: string, id: number, new_goal: number) => {
    const result = await sql`
        UPDATE accounts
        SET goal = ${new_goal}
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;
    `;
    return result[0];
};

const getHistory = async (account_id: number) => {
    const result = await sql`
        SELECT *
        FROM account_balance_history
        WHERE account_id = ${account_id};
    `;
    return result;
};

export { getAll, getOne, deleteAll, deleteOne, create, updateBalance, updateGoal, getHistory };