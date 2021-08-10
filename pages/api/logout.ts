
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export const clearCookie = (res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: false,
      expires: new Date(0),
      sameSite: "lax",
      path: "/",
    })
  );
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  clearCookie(res);
  res.redirect("/login");
};
