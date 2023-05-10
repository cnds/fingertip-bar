import { useMemo } from "react";
import styles from "./index.module.scss";

const ProgressBar = ({ percent }) => {
  const percentText = useMemo(() => {
    if (typeof percent === "number") {
      if (percent < 1) {
        return "下载中";
      }

      return `${Math.floor(percent)}%`;
    }

    return percent;
  }, [percent]);

  return (
    <div className={styles.progress}>
      <div className={styles.bg} style={{ width: `${percent}%` }} />
      <div className={styles.outer}>
        {percentText}
        <div className={styles.inner} style={{ width: `${percent}%` }}>
          <If condition={percent > 0}>
            <div
              className={styles.full}
              style={{ width: `${(100 * 100) / percent}%` }}
            >
              {percentText}
            </div>
          </If>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
