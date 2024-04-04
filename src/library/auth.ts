import bcrypt from "bcrypt";
import Cookies from "cookies";
import Cryptr from "cryptr";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiRequest, NextApiResponse } from "next";

const cryptr = new Cryptr("SujanProject");
const saltRounds = 10;

export const hashPassword = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error("Error");
  }
};

type Session = {
  userId: string;
};

export const checkUserCookie = async (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  try {
    const cookies = new Cookies(req, res);

    const hasCookie = cookies.get("session");

    if (hasCookie) {
      console.log("User has the cookie");

      const decryptedString = cryptr.decrypt(hasCookie);

      // console.log(typeof decryptedString, decryptedString);
      // console.log(
      //   typeof JSON.parse(decryptedString),
      //   JSON.parse(decryptedString)
      // );

      return JSON.parse(decryptedString) as Session;
    } else {
      console.log("User has no cookie");
      return null;
    }
  } catch (e) {
    console.error("Error checking user cookie");
    console.log(e);
    return null;
  }
};

export const authenticateUser = async (
  userId: string,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const cookies = new Cookies(req, res);
    const session: Session = {
      userId,
    };
    const encryptedString = cryptr.encrypt(JSON.stringify(session));

    cookies.set("session", encryptedString, {
      httpOnly: true,
      path: "/",
      maxAge: 1000 * 60 * 60 * 24,
    });
  } catch (e) {
    throw new Error("Failed to authenticate");
  }
};
