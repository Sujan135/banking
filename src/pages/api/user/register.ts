// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { authenticateUser, hashPassword } from "@/library/auth";
import { pool } from "@/library/db";

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
  if (req.method !== "POST") {
    return res.status(405);
  }

  const body: RequestBody = req.body;
  const { username, password } = body;

  try {
    const hashedPassword = await hashPassword(password);

    const { rows } = await pool.query(
      "SELECT id FROM users WHERE username = $1;",
      [body.username]
    );

    /*
    1. Using bcrypt to secure user password
    2. Store username and password in database
    3. On frontend if user already exists show an error
  */

    if (rows.length !== 0) {
      console.log("User already exists");
      return res.status(400).json({
        message: "User already exists. Please choose diffetent user name",
        statusCode: 400,
        name: "",
      });
    } else {
      await pool.query(
        "INSERT INTO users (username, password) values ($1, $2);",
        [username, hashedPassword]
      );

      await authenticateUser("", req, res);

      res.status(201).json({
        message: "User registered sucessfully",
        name: "",
        statusCode: 201,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error",
      name: "",
      statusCode: 500,
    });
  }
}
