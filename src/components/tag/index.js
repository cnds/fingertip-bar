import classNames from "classnames";
import styles from "./index.module.scss";

const Tag = ({ children, type }) => {
  return (
    <span
      className={classNames(styles.tag, {
        [styles.tag_period]: type === "period",
        [styles.tag_new]: type === "new",
        [styles.tag_recommend]: type === "recommend",
      })}
    >
      {children}
    </span>
  );
};

export default Tag;
