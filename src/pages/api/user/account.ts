import { pool } from "@/library/db";
import { checkUserCookie } from "@/library/auth";
import { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  name:string,
};

type ResponsePayload = {
  message: string;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload>
) {
    if (req.method !== "PUT") {
      return res.status(405);
    }
    const body: RequestBody = req.body;
    const {  name } = body;

     if (name.length === 0) {
       return res.status(401).json({
         statusCode: 401,
         message: "Unauthorized",
       });
     }


    const authenticatedUser = await checkUserCookie(req, res);

      if (!authenticatedUser) {
        return res.status(401).json({
          message: "Unauthorized",
          statusCode: 401,
        });
      }

      const { userId:username } = authenticatedUser;

        try {
          const { rows: userRow } = await pool.query(
            "SELECT id AS user_id from users where username = $1;",
            [username]
          );
          const { user_id } = userRow[0];

             await pool.query("INSERT INTO accounts (name, user_id) VALUES ($1, $2);", [
               name,
               user_id,
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