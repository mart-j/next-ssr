import { FC } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import styles from "./LoginForm.module.scss";

const LoginForm: FC = () => {
  return (
    <form className={styles.form} method="POST" action="/api/login">
      <h2>Login</h2>
      <Input
        className="mb-20"
        placeholder="username"
        type="text"
        name="username"
      />
      <Input
        className="mb-20"
        placeholder="password"
        type="password"
        name="password"
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginForm;
