import { useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { Collapse } from "react-collapse";
import BalanceDecrease from "@/public/balance_decrease.svg";
import BalanceGame from "@/public/balance_game.svg";
import BalanceIncrease from "@/public/balance_increase.svg";
import BalanceInvitation from "@/public/balance_invitation.svg";
import ArrowDown from "@/public/arrow_down.svg";
import CompleteIcon from "@/public/complete_icon.svg";
import InProgressIcon from "@/public/in_progress_icon.svg";
import styles from "./index.module.scss";

const Detail = ({ detail }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleToggleIsOpened = () => {
    setIsOpened((isOpened) => !isOpened);
  };

  return (
    <div className={styles.detailWrapper}>
      <div className={styles.detail}>
        <Choose>
          <When condition={detail.type === "increase"}>
            <BalanceIncrease />
          </When>
          <When condition={detail.type === "game"}>
            <BalanceGame />
          </When>
          <When condition={detail.type === "invitation"}>
            <BalanceInvitation />
          </When>
          <When condition={detail.type === "decrease"}>
            <BalanceDecrease />
          </When>
        </Choose>
        <div className={styles.content}>
          <div className={styles.title}>{detail?.title}</div>
          <div className={styles.time}>
            {dayjs(detail?.time).format("YYYY/MM/DD hh:mm:ss")}
          </div>
        </div>
        <div
          className={classNames(styles.amount, {
            [styles.increase]: detail?.isIncrease,
          })}
        >
          {detail?.isIncrease ? "+" : "-"}
          {detail?.amount}
        </div>
      </div>

      <div className={styles.collapse}>
        <Collapse isOpened={isOpened}>
          <div className={styles.flowWrapper}>
            <div className={styles.flow}>
              <CompleteIcon />
              <span className={styles.content}>资料开始审核</span>
              <span className={styles.time}>2022/01/20 20:50:59</span>
            </div>
            <div className={styles.flow}>
              <CompleteIcon />
              <span className={styles.content}>发起打款流程</span>
              <span className={styles.time}>2022/01/20 20:50:59</span>
            </div>
            <div className={styles.flow}>
              <InProgressIcon />
              <span className={styles.content}>打款审核中...</span>
              <span className={styles.time}>2022/01/20 20:50:59</span>
            </div>
          </div>
        </Collapse>
        <div className={styles.action} onClick={handleToggleIsOpened}>
          <span>{isOpened ? "收起" : "更多"}</span>
          <ArrowDown
            className={classNames(styles.arrow, {
              [styles.opened]: isOpened,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
