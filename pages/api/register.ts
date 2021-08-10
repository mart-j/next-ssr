import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../backend/models/User";
import { connectToDatabase } from "../../backend/mongoose";
import bcrypt from "bcrypt";
import loginReq from "./login";

type Body = {
  username: string;
  password: string;
  repeatPassword: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();
  const {
    username: unmodifiedUsername,
    password,
    repeatPassword,
  }: Body = req.body;

  const username = unmodifiedUsername.toLowerCase();

  if (username.length < 8) {
    res.redirect("/login");
    return;
  }

  if (password.length < 8) {
    res.redirect("/login");
    return;
  }

  if (password !== repeatPassword) {
    res.redirect("/login");
    return;
  }

  const registerdUsername = await User.findOne({ username });

  if (registerdUsername) {
    res.redirect("/login");
    return;
  }

  const cryptedPassword = await bcrypt.hash(password, 10);
  await new User({ username: username, password: cryptedPassword }).save();
  await loginReq(req, res);
};
