import BubbleTriangle from "@/public/bubble_triangle.svg";
import styles from "./index.module.scss";

const Bubble = ({ children, content }) => {
  return (
    <span className={styles.wrapper}>
      {children}
      <span className={styles.bubble}>
        {content}
        <BubbleTriangle className={styles.triangle} />
      </span>
    </span>
  );
};

export default Bubble;
