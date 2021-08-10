import { FC } from "react";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import styles from "./RegisterForm.module.scss";

const RegisterForm: FC = () => {
  return (
    <form className={styles.form} method="POST" action="/api/register">
      <h2>Register</h2>
      <Input
        className="mb-20"
        placeholder="Username"
        name="username"
        type="text"
        required
      />
      <Input
        className="mb-20"
        placeholder="Password"
        name="password"
        type="text"
        required
      />
      <Input
        className="mb-20"
        placeholder="Reapeat password"
        name="repeatPassword"
        type="text"
        required
      />
      <Button>Register</Button>
    </form>
  );
};

export default RegisterForm;
