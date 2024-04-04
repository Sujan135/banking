import { pool } from "@/library/db";

export type User = {
  username: string;
  name: string;
};

export const getUser = async (username: string) => {
  const { rows } = await pool.query(
    "SELECT username,name FROM users Where username = $1",
    [username]
  );

  return rows[0] as User;
};

export type Account = {
  id: string;
  balance: string;
  user_id: string;
  name: string;
};

export const getUserAccounts = async (username: string) => {
  const { rows: userRow } = await pool.query(
    "SELECT id AS user_id from users where username = $1;",
    [username]
  );
  console.log("username", username);
  const { user_id } = userRow[0];

  const { rows } = await pool.query(
    "SELECT * from accounts Where user_id = $1",
    [user_id]
  );

  return rows as Account[];
};

export type Transaction = {
  id: string;
  account_id: string;
  amount: string;
  timestamp: string;
  description: string;
};

export const getUserTransactions = async (account_id: string) => {
  const { rows } = await pool.query(
    "SELECT * FROM transaction WHERE account_id = $1 AND timestamp >= CURRENT_DATE - INTERVAL '60 days' ORDER BY timestamp DESC",
    [account_id]
  );

  rows.forEach((row) => {
    row.timestamp = row.timestamp.toISOString();
  });

  //  const verifyAccount = rows.find((transaction) => transaction.account_id === account_id && transaction.user_id)

  // for (let i = 0; i < rows.length; i++) {
  //   rows[i].timestamp = rows[i].timestamp.toISOString();
  // }

  // return rows.map((row) => ({
  //   ...row,
  //   timestamp: row.timestamp.toISOString(),
  // })) as Transaction[];
  //  return verifyAccount;

  console.log("Transactions", rows);

  return rows as Transaction[];
};
