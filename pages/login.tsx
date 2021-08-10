import { FC } from "react";
import styles from "../styles/Home.module.scss";
import { checkAuth } from "../backend/checkAuth";
import { ReqRes } from ".";
import PublicRoute from "../components/publicRoute";
import LoginForm from "../components/forms/Login/LoginForm";
import RegisterForm from "../components/forms/Register/RegisterForm";

const Login: FC = () => {
  return (
    <PublicRoute>
      <div className={styles.container}>
        <div>
          <LoginForm />
        </div>
        <div>
          <RegisterForm />
        </div>
      </div>
    </PublicRoute>
  );
};

export default Login;

export const getServerSideProps = async ({ req, res }: ReqRes) => {
  const auth = await checkAuth({ req, res });
  const authorized = !auth?.error;

  if (authorized) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export const config = {
  unstable_runtimeJS: false,
};
