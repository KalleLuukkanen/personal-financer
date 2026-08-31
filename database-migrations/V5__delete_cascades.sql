-- delete history of account if it's deleted
ALTER TABLE account_balance_history
DROP CONSTRAINT account_balance_history_account_id_fkey;

ALTER TABLE account_balance_history
ADD CONSTRAINT account_balance_history_account_id_fkey
FOREIGN KEY (account_id)
REFERENCES accounts(id)
ON DELETE CASCADE;


-- delete account and transactions if user deleted
ALTER TABLE accounts
DROP CONSTRAINT accounts_user_id_fkey;

ALTER TABLE accounts
ADD CONSTRAINT accounts_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES app_user(id)
ON DELETE CASCADE;

ALTER TABLE transactions
DROP CONSTRAINT transactions_user_id_fkey;

ALTER TABLE transactions
ADD CONSTRAINT transactions_user_id_fkey
FOREIGN KEY (user_id)
REFERENCES app_user(id)
ON DELETE CASCADE;