import ArrowDown from "@/public/arrow_down.svg";
import { Button } from "antd-mobile";
import classNames from "classnames";
import { useMemo, useState } from "react";
import styles from "./index.module.scss";

const Cash = ({ recharge, desc = "" }) => {
  const [isFolded, setIsFolded] = useState(true);

  const handleToggleIsFolded = () => {
    setIsFolded((isFolded) => !isFolded);
  };

  const rewardedRechargeArr = useMemo(() => {
    return recharge?.filter((item) => item?.rewarded);
  }, [recharge]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.guide}>{desc}</div>
      <div
        className={classNames(styles.completedWrapper, {
          [styles.completedWrapperFolded]: isFolded,
        })}
      >
        <For of={rewardedRechargeArr} index="index" each="rechargeItem">
          <div className={styles.bonusCompleted} key={index}>
            <span className={styles.text}>
              {index + 1}.{rechargeItem?.content}
            </span>
            <span className={styles.amount}>
              已领<em>{rechargeItem?.reward}</em>
            </span>
            <If condition={rewardedRechargeArr?.length > 0 && index === 0}>
              <Choose>
                <When condition={rechargeItem?.support_old_user === 0}>
                  <span className={styles.bonusTag}>限新用户</span>
                </When>
                <Otherwise>
                  <span className={styles.bonusTag}>今日补贴</span>
                </Otherwise>
              </Choose>
            </If>
          </div>
        </For>
      </div>
      <If condition={rewardedRechargeArr?.length > 0}>
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
        of={recharge?.filter((item) => !item?.rewarded)}
        index="index"
        each="rechargeItem"
      >
        <div className={styles.bonus} key={index}>
          <span className={styles.text}>
            {rewardedRechargeArr?.length + index + 1}.{rechargeItem?.content}
          </span>
          <span className={styles.amount}>
            + <em><b>{rechargeItem?.reward}</b></em>
          </span>
          <If condition={rewardedRechargeArr?.length === 0 && index === 0}>
            <Choose>
              <When condition={rechargeItem?.support_old_user === 0}>
                <span className={styles.bonusTag}>限新用户</span>
              </When>
              <Otherwise>
                <span className={styles.bonusTag}>今日补贴</span>
              </Otherwise>
            </Choose>
          </If>
        </div>
      </For>
    </div>
  );
};

export default Cash;
