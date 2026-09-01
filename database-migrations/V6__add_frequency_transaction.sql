ALTER TABLE transactions
ADD COLUMN frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'yearly'));