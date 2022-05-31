import classNames from "classnames";
import RedPacketIcon from "@/public/red_packet_icon.svg";
import TrophyGold from "@/public/trophy_gold.svg";
import TrophyGray from "@/public/trophy_gray.svg";
import RankingsBg from "@/public/rankings_bg.svg";
import styles from "./rankings.module.scss";

const RankList = () => {
  const lists = [
    {
      text: "最先达到520的第1名",
      redPacket: 999.9,
      num: "1/1",
      status: 1,
    },
    {
      text: "最先达到9999的第2～9名",
      redPacket: 999.9,
      num: "1/1",
      status: 0,
    },
    {
      text: "最先达到9999的第9～99名",
      redPacket: 999.9,
      num: "1/1",
      status: 0,
    },
  ];

  return (
    <div className={styles.box}>
      <RankingsBg className={styles.rankingsBg} />
      <div className={styles.title}>
        <span className={styles.amount}>
          <RedPacketIcon />
          <span>奖励</span>
          <em>3000.0</em>
        </span>
        <span className={styles.rankingName}>等级排行榜一</span>
        <span className={styles.listStatus}>
          <TrophyGold />
          <span>恭喜中榜</span>
        </span>
      </div>

      <div className={styles.rankingHead}>
        <span>名次</span>
        <span>红包</span>
        <span>名额</span>
        <span>状态</span>
      </div>
      <For of={lists} each="rank" index="index">
        <div className={styles.rankingRow} key={index}>
          <span>{rank?.text}</span>
          <span>{rank?.redPacket}</span>
          <span>{rank?.num}</span>
          <span
            className={classNames({
              [styles.received]: rank?.status,
            })}
          >
            {rank?.status ? "已满员" : "已领取"}
          </span>
        </div>
      </For>
    </div>
  );
};

export default RankList;
