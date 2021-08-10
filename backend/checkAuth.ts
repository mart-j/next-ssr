import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "./mongoose";
import { User } from "./models/User";
import { clearCookie } from "../pages/api/logout";
import { setCookie } from "../pages/api/login";

type ReqRes = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export const checkAuth = async ({ req, res }: ReqRes) => {
  try {
    await connectToDatabase();

    const token = parse(req.headers.cookie || "")?.token || "";

    if (!token)
      return {
        error: true,
      };

    const decodedUser = (() => {
      try {
        const { JWT_SECRET = "" } = process.env;
        return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
      } catch {
        console.log("cannot verify token");
        clearCookie(res);
        return {};
      }
    })();

    const { username, password } = decodedUser;

    if (!username || !password) {
      return { error: true };
    }

    const user = await User.findOne({ username });

    if (!user) {
      clearCookie(res);
      return {
        error: true,
      };
    }

    setCookie(token, res);
    return {
      error: false,
      username,
    };
  } catch (e) {
    console.log(e);
  }
};
