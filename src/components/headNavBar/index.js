import { NavBar } from "antd-mobile";
import styles from "./index.module.scss";

const HeadNavBar = ({ children, ...props }) => {
  return (
    <NavBar className={styles.headNavBar} {...props}>
      {children}
    </NavBar>
  );
};

export default HeadNavBar;
