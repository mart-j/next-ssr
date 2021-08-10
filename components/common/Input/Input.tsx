import { FC, ComponentProps } from "react";
import styles from "./Input.module.scss";
import classNames from "classnames";

interface Props extends ComponentProps<"input"> {
  className?: string;
}

const Input: FC<Props> = ({ className, ...props }) => {
  return (
    <input
      autoComplete="off"
      className={classNames(styles.input, className)}
      {...props}
    />
  );
};

export default Input;
