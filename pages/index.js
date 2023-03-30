import MenuTabBar from "@/components/menuTabBar";
import Tag from "@/components/tag";
import game from "@/public/game.png";
import RightArrow from "@/public/right_arrow.svg";
import { deduplicate, getDashboard, getMenuBar } from "@/request/index";
import { Button, NavBar, Space, Toast } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useMemo } from "react";
import styles from "./index.module.scss";

const StartBtn = ({ game }) => {
  const router = useRouter();
  let callLib = null;

  useEffect(() => {
    const CallApp = require("callapp-lib");

    const options = {
      scheme: {
        protocol: game?.scheme,
      },
      fallback: game?.download_url,
    };

    callLib = new CallApp(options);
  }, []);

  const handleClickPlay = (e, game) => {
    e.stopPropagation();
    if (game?.need_deduplicate) {
      const str = queryString.stringify({ ...router.query, AdId: game?.ad_id });

      deduplicate(str).then((res) => {
        // 排重失败，不可以进行试玩
        if (res?.data?.err_code !== 0) {
          Toast.show({ content: "该游戏不可参与，试试其他的哦" });
        } else {
          callLib?.open({
            path: "",
          });
        }
      }).catch(function(error) {
        if (error.response.status != 200) {
          Toast.show({ content: "该游戏不可参与，试试其他的哦" });
        }
      });
    } else {
      callLib?.open({
        path: "",
      });
    }
  };

  return (
    <Button
      className={styles.playBtn}
      onClick={(e) => handleClickPlay(e, game)}
    >
      开玩
    </Button>
  );
};

const Home = ({ dashboard }) => {
  const router = useRouter();

  const calRemainDays = (endDate) => {
    const remainDays = dayjs(endDate).diff(dayjs(), "days");
    return remainDays > 0 ? remainDays : 0;
  };

  const queryStr = useMemo(() => {
    return queryString.stringify(router?.query);
  }, []);

  const getAdDetailUrl = ({ path, adId }) => {
    const queryStr = queryString.stringify({ ...router?.query, AdId: adId });

    return `${path}/${adId}?${queryStr}`;
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>指尖试玩</title>
        <meta name="description" content="指尖试玩" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar backArrow={false} className={styles.navBar}>
        指尖试玩
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
            <Link href={`/my_games?${queryStr}`}>
              <span className={styles.more}>
                更多
                <RightArrow />
              </span>
            </Link>
          </div>
          <div className={styles.recently}>
            <For of={dashboard?.playing} each="game" index="index">
              <Link
                href={getAdDetailUrl({ path: "/my_games", adId: game?.ad_id })}
                key={index}
              >
                <div className={styles.gameItem}>
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
                    <Choose>
                      <When
                        condition={game?.is_recommend || game?.rewarded === "0"}
                      >
                        即将领
                        <span className={styles.amount}>
                          {game?.reward_first}
                        </span>
                      </When>
                      <Otherwise>
                        已领
                        <span className={styles.amount}>{game?.rewarded}</span>
                      </Otherwise>
                    </Choose>
                  </span>
                </div>
              </Link>
            </For>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.titleLine}>
            <span className={styles.titleText}>热门游戏</span>
          </div>
          <div className={styles.task}>
            <For of={dashboard?.list} each="game" index="index">
              <Link
                href={getAdDetailUrl({ path: "/my_games", adId: game?.ad_id })}
                key={index}
              >
                <div className={styles.gameItem}>
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
                            <Tag type="new">新</Tag>
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
                        <Choose>
                          <When condition={calRemainDays(game?.end_date) <= 0}>
                            <span>即将结束</span>
                          </When>
                          <Otherwise>
                            <span>剩{calRemainDays(game?.end_date)}天</span>
                          </Otherwise>
                        </Choose>
                        <If condition={game?.label}>
                          <span className={styles.divider} />
                          <span>{game?.label}</span>
                        </If>
                      </div>
                      <Button className={styles.playBtn}>开玩</Button>
                    </div>
                  </div>
                </div>
              </Link>
            </For>
          </div>
        </div>
      </div>

      <If condition={dashboard?.show_menu_bar}>
        <MenuTabBar />
      </If>
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
