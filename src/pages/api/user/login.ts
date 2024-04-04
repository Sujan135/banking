import { pool } from "@/library/db";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt, { hash } from "bcrypt";
import { authenticateUser, hashPassword } from "@/library/auth";

type RequestBody = {
  username: string;
  password: string;
};

type ResponsePayload = {
  name: string;
  message: string;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload>
) {
  if (req.method === "POST") {
    const body: RequestBody = req.body;
    const { username, password } = body;

    try {
      const { rows } = await pool.query(
        "SELECT username, password FROM users WHERE username = $1;",
        [username]
      );

      const hashedPassed = rows[0].password;
      const match = await bcrypt.compare(password, hashedPassed);

      if (!match) {
        return res.status(400).json({
          statusCode: 400,
          message: "Invalid username or password",
          name: "",
        });
      }

      await authenticateUser(rows[0].username, req, res);

      res.status(201).json({
        statusCode: 201,
        message: "Success",
        name: "",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        name: "",
        statusCode: 500,
      });
    }
  }
  // If it is not valid return an error and show it on the frontend
}
