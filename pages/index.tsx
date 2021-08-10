import { NextApiRequest, NextApiResponse } from "next";
import { FC } from "react";
import Button from "../components/common/Button/Button";
import { checkAuth } from "../backend/checkAuth";
import PrivateRoute from "../components/privateRoute";

const Home: FC<{ name: string }> = ({ name }) => {
  return (
    <PrivateRoute>
      <div>
        <h1>You are logged in</h1>
        <h1>{`Hello ${name}!`}</h1>
        <div>
          <form method="POST" action="/api/logout">
            <div style={{ width: "fit-content" }}>
              <Button>Log out</Button>
            </div>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Home;

export type ReqRes = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export const getServerSideProps = async ({ req, res }: ReqRes) => {
  const auth = await checkAuth({ req, res });

  if (auth?.error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { name: auth?.username || "" },
  };
};

export const config = {
  unstable_runtimeJS: false,
};
