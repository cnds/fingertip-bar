import avatar1 from "@/public/avatar1.png";
import Image from "next/image";
import styles from "./index.module.scss";

const Friend = () => {
  return (
    <div className={styles.friend}>
      <Image src={avatar1} width={48} height={48} />
      <div className={styles.content}>
        <div className={styles.first}>
          <span className={styles.name}>好友65****01</span>
          <span className={styles.amount}>+888.0</span>
        </div>
        <div className={styles.second}>
          <span className={styles.time}>2022/01/20 20:00:50</span>
          <span className={styles.type}>贡献提成</span>
        </div>
      </div>
    </div>
  );
};

export default Friend;
