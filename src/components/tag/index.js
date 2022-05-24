import classNames from "classnames";
import styles from "./index.module.scss";

const Tag = ({ children, type }) => {
  return (
    <span
      className={classNames(styles.tag, {
        [styles.tag_period]: type === "period",
        [styles.tag_new]: type === "new",
      })}
    >
      {children}
    </span>
  );
};

export default Tag;
