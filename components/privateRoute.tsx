import { FC, ReactNode } from "react";

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  return <div style={{padding: 60}}>{children}</div>;
};

export default PrivateRoute;
