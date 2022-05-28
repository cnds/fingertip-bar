import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { NavBar, Button, Steps, Tabs } from "antd-mobile";
import Tag from "@/components/tag";
import Contact from "@/public/contact.svg";
import gameImg from "@/public/game.png";
import Bonus from "./bonus";
import Cash from "./cash";
import Rankings from "./rankings";
import styles from "./index.module.scss";

const { Step } = Steps;

const GameDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>游戏详情</title>
        <meta name="description" content="游戏详情" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar className={styles.headNavBar} right={<Contact />}>
        游戏详情
      </NavBar>

      <div className={styles.overview}>
        <Image src={gameImg} width={60} height={60} objectFit="cover" />
        <div className={styles.text}>
          <div className={styles.first}>
            <span className={styles.name}>
              游戏名称游戏名称游戏名称游戏名称
            </span>
            <span className={styles.amount}>99999.9</span>
          </div>
          <div className={styles.second}>
            <span>
              <span className={styles.endTime}>2022/4/14结束</span>
              <Tag type="period">1期</Tag>
            </span>
            <span className={styles.total}>总奖励</span>
          </div>
        </div>
      </div>

      <div className={styles.binding}>
        <div className={styles.title}>
          <span className={styles.id}>
            游戏ID：<span className={styles.notBound}>尚未绑定</span>
          </span>
          <Button size="mini" className={styles.refresh}>
            刷新
          </Button>
        </div>

        <Steps direction="vertical">
          <Step
            title="下载/注册账号"
            status="wait"
            description={
              <span className={styles.start}>
                点击<span className={styles.entry}>开始</span>
                进入，中途请勿切换网络
              </span>
            }
            icon={<span className={styles.stepNumber}>1</span>}
          />
          <Step
            title="指定区服创建角色"
            status="wait"
            description="要求「最新区服」，请不要重复创建"
            icon={<span className={styles.stepNumber}>2</span>}
          />
        </Steps>
      </div>

      <div className={styles.tabsWrapper}>
        <Tabs activeLineMode="fixed">
          <Tabs.Tab title="等级奖励" key="bonus">
            <Bonus />
          </Tabs.Tab>
          <Tabs.Tab title="充值返现" key="recharge">
            <Cash />
          </Tabs.Tab>
          <Tabs.Tab title="排行榜" key="rankings">
            <Rankings />
          </Tabs.Tab>
        </Tabs>

        <div className={styles.btnWrap}>
          <Button fill="solid" block className={styles.startBtn}>
            开始
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
