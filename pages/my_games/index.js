import Head from "next/head";
import Image from "next/image";
import Link from "next/Link";
import classNames from "classnames";
import { NavBar } from "antd-mobile";
import Tag from "@/components/tag";
import gameImg from "@/public/game.png";
import styles from "./index.module.scss";

const MyGames = () => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>我的游戏</title>
        <meta name="description" content="我的游戏" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar className={styles.headNavBar}>我的游戏</NavBar>
      <div className={styles.body}>
        <div className={styles.box}>
          <div className={styles.title}>
            进行中
            <span className={styles.description}>
              到期后将停止更新，请尽快试玩哦～
            </span>
          </div>

          <For of={[1, 2]} index="index" each="gameId">
            <Link href={`/my_games/${gameId}`}>
              <div key={index} className={styles.gameItem}>
                <Image src={gameImg} width={60} height={60} objectFit="cover" />
                <div className={styles.text}>
                  <div className={styles.first}>
                    <span className={styles.name}>梦幻新诛仙游戏游戏游戏</span>
                    <span className={styles.amount}>
                      已领<em>29.6</em>
                    </span>
                  </div>
                  <div className={styles.second}>
                    <span>
                      <span className={styles.endTime}>2022/4/16结束</span>
                      <Tag type="period">1期</Tag>
                    </span>
                    <span className={styles.reward}>总奖9999.9</span>
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

          <For of={[3, 4]} index="index" each="gameId">
            <Link href={`/my_games/${gameId}`}>
              <div key={index} className={styles.gameItem}>
                <Image src={gameImg} width={60} height={60} objectFit="cover" />
                <div className={styles.text}>
                  <div className={styles.first}>
                    <span className={styles.name}>梦幻新诛仙游戏游戏游戏</span>
                    <span className={styles.amount}>
                      已领<em>29.6</em>
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
                        2022/4/16已结束
                      </span>
                      <Tag type="period">1期</Tag>
                    </span>
                    <span className={styles.reward}>总奖9999.9</span>
                  </div>
                </div>
              </div>
            </Link>
          </For>
        </div>

        <div className={styles.everybody}>
          <div className={styles.title}>大家都在玩</div>
          <div className={styles.games}>
            <For of={[1, 2, 3, 4]} index="index">
              <div className={styles.gameItem} key={index}>
                <Image src={gameImg} width={48} height={48} objectFit="cover" />
                <div className={styles.name}>游戏名称游戏名称</div>
              </div>
            </For>
          </div>
        </div>

        <div className={styles.uid}>UID：92893845</div>
      </div>
    </div>
  );
};

export default MyGames;
