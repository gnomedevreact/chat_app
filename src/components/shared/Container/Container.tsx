import cl from "classnames";
import styles from "./Container.module.scss";

interface IContainer {
  children: React.ReactNode;
  classNames?: string;
}

export const Container = ({ children, classNames }: IContainer) => {
  return <div className={cl(styles.container, classNames)}>{children}</div>;
};
