CREATE TABLE "transactions" (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    source TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
    user_id VARCHAR(255) NOT NULL REFERENCES app_user(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);