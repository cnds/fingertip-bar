import RankingsBg from "@/public/rankings_bg.svg";
import RedPacketIcon from "@/public/red_packet_icon.svg";
import TrophyGold from "@/public/trophy_gold.svg";
import classNames from "classnames";
import styles from "./rankings.module.scss";

const RankList = ({ rankListData }) => {
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
      <For of={rankListData} each="rank" index="index">
        <div className={styles.rankingRow} key={index}>
          <span>{rank?.ad_title}</span>
          <span>{rank?.reward}</span>
          <span>{rank?.reward_num}</span>
          <span
            className={classNames({
              [styles.received]: rank?.rewarded,
            })}
          >
            {rank?.rewarded ? "已领取" : "未领取"}
          </span>
        </div>
      </For>
    </div>
  );
};

export default RankList;
