import classNames from "classnames";
import styles from "./index.module.scss";

const ActionBtn = ({ children, className, onClick }) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      <div className={styles.btn} onClick={onClick}>
        {children}
      </div>
    </div>
  );
};

export default ActionBtn;
