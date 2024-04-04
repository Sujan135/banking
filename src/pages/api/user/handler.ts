import { pool } from "@/library/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponsePayload, RequestBody } from "./login";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload>
) {
  if (req.method === "POST") {
    const body: RequestBody = req.body;
    const { username, password } = body;

    try {
      const { rows } = await pool.query("SELECT username, password from users");
    } finally {
      // Login with a username and password
    }
  }
  // Login with a username and password
  // If it is valid console log "valid"
  // If it is not valid return an error and show it on the frontend
}
