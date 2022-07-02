import Tag from "@/components/tag";
import gameImg from "@/public/game.png";
import { getMyGames } from "@/request/index";
import { NavBar } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import styles from "./index.module.scss";

const MyGames = ({ myGames }) => {
  const router = useRouter();

  const handleClickBack = () => {
    router.push(`/?${queryString.stringify(router?.query)}`);
  };

  const getAdDetailUrl = ({ path, adId }) => {
    const queryStr = queryString.stringify({ ...router?.query, AdId: adId });

    return `${path}/${adId}?${queryStr}`;
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>我的游戏</title>
        <meta name="description" content="我的游戏" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar className={styles.headNavBar} onBack={handleClickBack}>
        我的游戏
      </NavBar>
      <div className={styles.body}>
        <div className={styles.box}>
          <div className={styles.title}>
            进行中
            <span className={styles.description}>
              到期后将停止更新，请尽快试玩哦～
            </span>
          </div>

          <For of={myGames?.playing} each="game" index="index">
            <Link
              href={getAdDetailUrl({ path: "/my_games", adId: game?.ad_id })}
              key={index}
            >
              <div className={styles.gameItem}>
                <Image
                  src={game?.logo || gameImg}
                  width={60}
                  height={60}
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
                <div className={styles.text}>
                  <div className={styles.first}>
                    <span className={styles.name}>{game?.app_name}</span>
                    <span className={styles.amount}>
                      已领<em>{game?.rewarded}</em>
                    </span>
                  </div>
                  <div className={styles.second}>
                    <span>
                      <span className={styles.endTime}>
                        {dayjs(game?.end_date).format("YYYY/MM/DD")}结束
                      </span>
                      <Tag type="period">{game?.stage}期</Tag>
                    </span>
                    <span className={styles.reward}>
                      总奖{game?.reward_total}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </For>
        </div>

        <div className={styles.box}>
          <div className={classNames(styles.title, styles.titleFinished)}>
            已结束
            <span className={styles.description}>
              数据停止更新，仅保留近7天记录
            </span>
          </div>

          <For of={myGames?.finished} each="game" index="index">
            <Link
              href={getAdDetailUrl({ path: "/my_games", adId: game?.ad_id })}
              key={index}
            >
              <div className={styles.gameItem}>
                <Image
                  src={game?.logo || gameImg}
                  width={60}
                  height={60}
                  objectFit="cover"
                  style={{ borderRadius: "8px" }}
                />
                <div className={styles.text}>
                  <div className={styles.first}>
                    <span className={styles.name}>{game?.app_name}</span>
                    <span className={styles.amount}>
                      已领<em>{game?.rewarded}</em>
                    </span>
                  </div>
                  <div className={styles.second}>
                    <span>
                      <span
                        className={classNames(
                          styles.endTime,
                          styles.endTimeFinished
                        )}
                      >
                        {dayjs(game?.end_date).format("YYYY/MM/DD")}结束
                      </span>
                      <Tag type="period">{game?.stage}期</Tag>
                    </span>
                    <span className={styles.reward}>
                      总奖{game?.reward_total}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </For>
        </div>

        <div className={styles.everybody}>
          <div className={styles.title}>大家都在玩</div>
          <div className={styles.games}>
            <For of={myGames?.recommend} each="game" index="index">
              <Link
                href={getAdDetailUrl({ path: "/my_games", adId: game?.ad_id })}
                key={index}
              >
                <div className={styles.gameItem} key={index}>
                  <Image
                    src={game?.logo || gameImg}
                    width={48}
                    height={48}
                    objectFit="cover"
                    style={{ borderRadius: "8px" }}
                  />
                  <div className={styles.name}>{game?.app_name}</div>
                </div>
              </Link>
            </For>
          </div>
        </div>

        <div className={styles.uid}>UID：{myGames?.uid}</div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await getMyGames(queryString.stringify(context?.query));

  return {
    props: {
      myGames: res?.data?.payload,
    },
  };
}

export default MyGames;
