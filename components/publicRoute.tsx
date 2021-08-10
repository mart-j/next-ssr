import { FC, ReactNode } from "react";

const PublicRoute: FC<{ children: ReactNode }> = ({ children }) => {
  return <div id="public-route">{children}</div>;
};

export default PublicRoute;
