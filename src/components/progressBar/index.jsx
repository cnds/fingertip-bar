import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";

const ProgressBar = ({ percent }) => {
  const progressRef = useRef(null);
  const [fullWidth, setFullWidth] = useState(null);

  const percentText = useMemo(() => {
    if (typeof percent === "number") {
      if (percent < 1) {
        return "下载中";
      }

      return `${Math.floor(percent)}%`;
    }

    return percent;
  }, [percent]);

  useEffect(() => {
    setFullWidth(progressRef?.current?.clientWidth || 280);
  }, []);

  return (
    <div className={styles.progress} ref={progressRef}>
      <div className={styles.bg} style={{ width: `${percent}%` }} />
      <div className={styles.outer}>
        {percentText}
        <div className={styles.inner} style={{ width: `${percent}%` }}>
          <div className={styles.full} style={{ width: `${fullWidth}px` }}>
            {percentText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
