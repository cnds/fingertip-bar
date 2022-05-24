import Head from "next/head";
import { NavBar, Space, Button } from "antd-mobile";
import Image from "next/image";
import classNames from "classnames";
import MenuTabBar from "@/components/menuTabBar";
import Tag from "@/components/tag";
import game from "@/public/game.png";
import RightArrow from "@/public/right_arrow.svg";
import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>指尖网咖</title>
        <meta name="description" content="指尖网咖" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar backArrow={false}>指尖网咖</NavBar>

      <div className={styles.box}>
        <div
          className={classNames(styles.titleLine, styles.titleLine_attractive)}
        >
          <span className={styles.titleText}>最近在玩</span>
          <span className={styles.more}>
            更多
            <RightArrow />
          </span>
        </div>
        <div className={styles.recently}>
          <For of={[1, 2, 3, 4]} each="item" index="index">
            <div key={index} className={styles.gameItem}>
              <Image src={game} width={48} height={48} objectFit="cover" />
              <span className={styles.name}>游戏名称游戏名称</span>
              <span className={styles.reward}>
                已领<span className={styles.amount}>22.6</span>
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
          <For of={[1, 2, 3, 4, 5, 6, 7]} each="item" index="index">
            <div key={index} className={styles.gameItem}>
              <Image src={game} width={60} height={60} objectFit="cover" />
              <div className={styles.main}>
                <div className={styles.first}>
                  <div className={styles.left}>
                    <span className={styles.name}>游戏名称游戏名称</span>
                    <Space>
                      <Tag type="period">1期</Tag>
                      <Tag type="new">NEW</Tag>
                    </Space>
                  </div>
                  <div className={styles.right}>
                    1分钟人均<em className={styles.highlight}>9.9</em>
                  </div>
                </div>

                <div className={styles.second}>
                  <div className={styles.reward}>
                    <span>
                      总奖<span className={styles.highlight}>8989</span>
                    </span>
                    <span className={styles.divider} />
                    <span>剩20天</span>
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

      <MenuTabBar />
    </div>
  );
};

export default Home;
