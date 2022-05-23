import Head from "next/head";
import { NavBar, Space } from "antd-mobile";
import Image from "next/image";
import classNames from "classnames";
import styles from "../styles/Home.module.scss";
import Tag from "../src/components/tag";
import game from "../public/game.png";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>指尖网咖</title>
        <meta name="description" content="指尖网咖" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar backArrow={false}>指尖网咖</NavBar>

      <Space direction="vertical" style={{ "--gap-vertical": "16px" }}>
        <div className={styles.box}>
          <div
            className={classNames(
              styles.titleLine,
              styles.titleLine_attractive
            )}
          >
            <span className={styles.titleText}>最近在玩</span>
            <span className={styles.more}>更多></span>
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
                <div className={styles.}>
                  <div>
                    <span>游戏名称游戏名称</span>
                    <Space>
                      <Tag type="period">1期</Tag>
                      <Tag type="new">NEW</Tag>
                    </Space>
                  </div>
                  <div>
                    1分钟人均<span>9.9</span>
                  </div>
                </div>
              </div>
            </For>
          </div>
        </div>
      </Space>
    </div>
  );
}
