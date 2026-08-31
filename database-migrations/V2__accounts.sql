CREATE TABLE "accounts" (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    balance NUMERIC(12, 2),
    goal NUMERIC(12, 2) CHECK (amount > 0),
    user_id VARCHAR(255) NOT NULL REFERENCES app_user(id),
    CONSTRAINT unique_account_per_user UNIQUE (user_id, name)
);