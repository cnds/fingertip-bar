import ArrowDown from "@/public/arrow_down.svg";
import { Button } from "antd-mobile";
import classNames from "classnames";
import { useState } from "react";
import styles from "./bonus.module.scss";

const Bonus = ({ level = [] }) => {
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
        <For
          of={level?.filter((item) => item?.rewarded)}
          index="index"
          each="task"
        >
          <div className={styles.bonusCompleted} key={index}>
            <span className={styles.text}>
              {index + 1}.{task?.content}
            </span>
            <span className={styles.amount}>
              已领<em>{task?.reward}</em>
            </span>
            <Choose>
              <When condition={task?.support_old_user === 0}>
                <span className={styles.bonusTag}>限新用户</span>
              </When>
              <Otherwise>
                <span className={styles.bonusTag}>今日补贴</span>
              </Otherwise>
            </Choose>
          </div>
        </For>
      </div>
      <If condition={level?.filter((item) => item?.rewarded)?.length > 0}>
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
      </If>

      <For
        of={level?.filter((item) => !item?.rewarded)}
        index="index"
        each="task"
      >
        <div className={styles.bonus} key={index}>
          <span className={styles.text}>
            {index + 1}.{task?.content}
          </span>
          <span className={styles.amount}>
            + <em>{task?.reward}</em>
          </span>
          <Choose>
            <When condition={task?.support_old_user === 0}>
              <span className={styles.bonusTag}>限新用户</span>
            </When>
            <Otherwise>
              <span className={styles.bonusTag}>今日补贴</span>
            </Otherwise>
          </Choose>
        </div>
      </For>
    </div>
  );
};

export default Bonus;
