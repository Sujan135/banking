import { checkUserCookie } from "@/library/auth";
import { pool } from "@/library/db";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  account_id: number;
  amount: number;
  description: string;
  date: string;
};

type ResponsePayload = {
  message: string;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload>
) {
     //   return res.status(400).send({ message: "Error", statusCode: 400 });
     if (req.method === "PUT") {
     if (req.method !== "PUT") {
      return res.status(405);
        }
      const body: RequestBody = req.body;
      const { account_id, amount, description, date } = body;

    const authenticatedUser = await checkUserCookie(req, res);

    if (!authenticatedUser) {
      return res.status(401).json({
        message: "Unauthorized",
        statusCode: 401,
      });
    }

    const { userId: username } = authenticatedUser;

    try {
      const { rows: userRow } = await pool.query(
        "SELECT id AS user_id from users where username = $1;",
        [username]
      );
      const { user_id } = userRow[0];

      const { rows: accountRows } = await pool.query(
        `SELECT * FROM accounts WHERE id=$1 AND user_id=$2`,
        [account_id, user_id]
      );

      if (accountRows.length === 0) {
        return res.status(401).json({
          statusCode: 401,
          message: "Unauthorized",
        });
      }
      await pool.query(
        "INSERT INTO transaction (account_id,amount,description,timestamp) VALUES ($1, $2, $3, $4);",
        [account_id, amount, description, date]
      );

      await pool.query("UPDATE accounts SET balance=balance-$1 WHERE id=$2", [
        amount,
        account_id,
      ]);

      res.status(201).json({
        statusCode: 201,
        message: "Successfully added",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
      });
    }
  }
}
