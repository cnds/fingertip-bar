import Head from "next/head";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import { NavBar, Space, Button } from "antd-mobile";
import Image from "next/image";
import classNames from "classnames";
import MenuTabBar from "@/components/menuTabBar";
import Tag from "@/components/tag";
import game from "@/public/game.png";
import RightArrow from "@/public/right_arrow.svg";
import { getDashboard } from "@/request/index";
import styles from "./index.module.scss";

const Home = ({ dashboard }) => {
  const calRemainDays = (endDate) => {
    const remainDays = dayjs(endDate).diff(dayjs(), "days");
    return remainDays > 0 ? remainDays : 0;
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>指尖网咖</title>
        <meta name="description" content="指尖网咖" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar backArrow={false} className={styles.navBar}>
        指尖网咖
      </NavBar>

      <div className={styles.body}>
        <div className={styles.box}>
          <div
            className={classNames(
              styles.titleLine,
              styles.titleLine_attractive
            )}
          >
            <span className={styles.titleText}>最近在玩</span>
            <Link href="/my_games">
              <span className={styles.more}>
                更多
                <RightArrow />
              </span>
            </Link>
          </div>
          <div className={styles.recently}>
            <For of={dashboard?.playing} each="game">
              <div key={game?.game_id} className={styles.gameItem}>
                <span className={styles.imgWrapper}>
                  <If condition={game?.is_recommend}>
                    <span className={styles.recommendTag}>
                      <Tag type="recommend">推荐</Tag>
                    </span>
                  </If>
                  <Image
                    src={game?.logo}
                    width={48}
                    height={48}
                    style={{ borderRadius: "8px" }}
                    objectFit="cover"
                  />
                </span>
                <span className={styles.name}>{game?.app_name}</span>
                <span className={styles.reward}>
                  已领<span className={styles.amount}>{game?.rewarded}</span>
                </span>
              </div>
            </For>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.titleLine}>
            <span className={styles.titleText}>游戏任务</span>
          </div>
          <div className={styles.task}>
            <For of={dashboard?.list} each="game">
              <div key={game?.game_id} className={styles.gameItem}>
                <Image
                  src={game?.logo}
                  width={60}
                  height={60}
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
                <div className={styles.main}>
                  <div className={styles.first}>
                    <div className={styles.left}>
                      <span className={styles.name}>{game?.app_name}</span>
                      <Space>
                        <Tag type="period">{game?.stage}期</Tag>
                        <If condition={game?.is_new}>
                          <Tag type="new">NEW</Tag>
                        </If>
                      </Space>
                    </div>
                    <div className={styles.right}>
                      1分钟人均
                      <em className={styles.highlight}>
                        {game?.avg_minute_reward}
                      </em>
                    </div>
                  </div>

                  <div className={styles.second}>
                    <div className={styles.reward}>
                      <span>
                        总奖
                        <span className={styles.highlight}>
                          {game?.reward_total}
                        </span>
                      </span>
                      <span className={styles.divider} />
                      <span>剩{calRemainDays(game?.end_date)}天</span>
                      <span className={styles.divider} />
                      <span>等你挑战</span>
                    </div>
                    <Button className={styles.playBtn}>开玩</Button>
                  </div>
                </div>
              </div>
            </For>
          </div>
        </div>
      </div>

      <MenuTabBar />
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await getDashboard(queryString.stringify(context?.query));

  return {
    props: {
      dashboard: res?.data?.payload,
    },
  };
}

export default Home;
