import { FC, ComponentProps, ReactNode } from "react";
import styles from "./Button.module.scss";

interface Props extends ComponentProps<"button"> {
  children: ReactNode;
}

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
