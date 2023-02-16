import styles from "./index.module.scss";
import RankList from "./rankList";

const Rankings = ({ rank, desc = "" }) => {
  const classifyRank = (rankList = []) => {
    const totalRankArr = [];

    let thresholdArr = rankList?.map((rankItem) => rankItem?.threshold);
    thresholdArr = [...new Set(thresholdArr)];

    thresholdArr?.forEach((thresholdStr) => {
      let categoryRankArr = rankList?.filter(
        (rankItem) => rankItem?.threshold === thresholdStr
      );

      totalRankArr?.push(categoryRankArr);
    });

    return totalRankArr;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tips}>
        最先达到指定阶梯且最先领取者可获得奖励，名额领完即止。
      </div>
      <For
        of={classifyRank(rank?.level)}
        each="categoryLevelRankArr"
        index="index"
      >
        <RankList
          key={index}
          rankListData={categoryLevelRankArr}
          type="level"
        />
      </For>
      <For
        of={classifyRank(rank?.recharge)}
        each="categoryRechargeRankArr"
        index="index"
      >
        <RankList
          key={index}
          rankListData={categoryLevelRankArr}
          type="recharge"
        />
      </For>
      <div className={styles.disclaimer}>
        免责声明：游戏由第三方提供并独立运营，氪金请理性。
      </div>
    </div>
  );
};

export default Rankings;
