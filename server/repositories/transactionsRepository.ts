import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM transactions
        WHERE user_id = ${user_id};
    `;
    return result;
};

const getOne = async (user_id: string, id: number) => {
    const result = await sql`
        SELECT *
        FROM transactions
        WHERE user_id = ${user_id} AND id = ${id};
    `;
    return result[0];
};

const deleteOne = async (user_id: string, id: number) => {
    const result = await sql`
        DELETE
        FROM transactions
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;
    `;
    return result[0];
};

const deleteAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM transactions
        WHERE user_id = ${user_id}
        RETURNING *;
    `;
    return result;
};

const create = async (user_id: string, source: string, amount: number, type: string, frequency: string) => {
    const result = await sql`
        INSERT INTO transactions (user_id, source, amount, type, frequency)
        VALUES (${user_id}, ${source}, ${amount}, ${type}, ${frequency})
        RETURNING *;
    `;
    return result[0];
};

const updateAmount = async (user_id: string, id: number, new_amount: number) => {
    const result = await sql`
        UPDATE transactions
        SET amount = ${new_amount}
        RETURNING *;
    `;
    return result[0];
};

export { getAll, getOne, deleteOne, deleteAll, create, updateAmount };