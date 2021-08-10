import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { User } from "../../backend/models/User";
import { connectToDatabase } from "../../backend/mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const setCookie = (token: string, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 10, //10 min
      sameSite: "lax",
      path: "/",
    })
  );
};

const generateToken = (username: string, password: string) => {
  const { JWT_SECRET = "" } = process.env;
  return jwt.sign({ username, password }, JWT_SECRET);
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();
  const { username: unmodifiedUsername, password: passworInput } = req.body;

  const usernameInput = unmodifiedUsername.toLowerCase();

  const user = await User.findOne({ username: usernameInput });

  if (!user) {
    res.redirect("/");
    return;
  }

  const { username, password } = user;

  const match = await bcrypt.compare(passworInput, password);

  if (!match) {
    res.redirect("/");
    return;
  }
  const token = generateToken(username, password);

  setCookie(token, res);

  res.redirect("/");
};
