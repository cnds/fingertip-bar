import { useState } from "react";
import { Button } from "antd-mobile";
import classNames from "classnames";
import ArrowDown from "@/public/arrow_down.svg";
import styles from "./bonus.module.scss";

const Bonus = () => {
  const [isFolded, setIsFolded] = useState(true);

  const handleToggleIsFolded = () => {
    setIsFolded((isFolded) => !isFolded);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.guide}>
        引导文案占位，若有就展示；引导文案占位，若有就展示；引导文案占位，若有就展示；
      </div>
      <div
        className={classNames(styles.completedWrapper, {
          [styles.completedWrapperFolded]: isFolded,
        })}
      >
        <For of={[1, 2, 3]} index="index">
          <div className={styles.bonusCompleted} key={index}>
            <span className={styles.text}>{index + 1}.等级达到80级</span>
            <span className={styles.amount}>
              已领<em>0.5</em>
            </span>
            <span className={styles.bonusTag}>限时用户</span>
          </div>
        </For>
      </div>
      <Button onClick={handleToggleIsFolded} block className={styles.foldBtn}>
        {isFolded ? (
          <>
            查看已完成任务
            <ArrowDown className={styles.folded} />
          </>
        ) : (
          <>
            收起
            <ArrowDown className={styles.opened} />
          </>
        )}
      </Button>

      <For of={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} index="index">
        <div className={styles.bonus} key={index}>
          <span className={styles.text}>{index + 1}.等级达到80级</span>
          <span className={styles.amount}>
            + <em>0.5</em>
          </span>
          <span className={styles.bonusTag}>今日补贴</span>
        </div>
      </For>
    </div>
  );
};

export default Bonus;
