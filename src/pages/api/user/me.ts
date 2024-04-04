import { pool } from "@/library/db";
import { NextApiRequest, NextApiResponse } from "next";
import { checkUserCookie } from "@/library/auth";

type ResponsePayload = {
  password: string;
  message: string;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload>
) {
  const authenticatedUser = await checkUserCookie(req, res);

  if (!authenticatedUser) {
    return res.status(401).json({
      password: "",
      message: "Unauthorized",
      statusCode: 401,
    });
  }

  const { userId } = authenticatedUser;

  try {
    const { rows } = await pool.query(
      "SELECT username, password FROM users WHERE username = $1;",
      [userId]
    );

    if (rows.length === 0) {
      throw new Error("No such user");
    }

    const { password } = rows[0];

    return res.status(201).json({
      message: "This is the password",
      password,
      statusCode: 201,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error",
      password: "",
      statusCode: 500,
    });
  }
}
