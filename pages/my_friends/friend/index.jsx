import avatar1 from "@/public/avatar1.png";
import Image from "next/image";
import styles from "./index.module.scss";

const Friend = ({ friend }) => {
  return (
    <div className={styles.friend}>
      <Image src={avatar1} width={48} height={48} />
      <div className={styles.content}>
        <div className={styles.first}>
          <span className={styles.name}>{friend?.apprentice_name}</span>
          <span className={styles.amount}>+{friend?.rewarded}</span>
        </div>
        <div className={styles.second}>
          <span className={styles.time}>{friend?.bind_time}</span>
          <span className={styles.type}>贡献提成</span>
        </div>
      </div>
    </div>
  );
};

export default Friend;
