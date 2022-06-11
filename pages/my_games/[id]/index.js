import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { NavBar, Button, Steps, Tabs, Modal, Space, Swiper } from "antd-mobile";
import Tag from "@/components/tag";
import Bubble from "@/components/bubble";
import Contact from "@/components/contact";
import gameImg from "@/public/game.png";
import playerImg from "@/public/player.png";
import Exclamation from "@/public/exclamation.svg";
import BubbleTriangle from "@/public/bubble_triangle.svg";
import redPacketLeft from "@/public/red_packet_left.png";
import redPacketRight from "@/public/red_packet_right.png";
import RedPacketSpeed from "@/public/red_packet_speed.svg";
import Banner from "@/public/banner.svg";
import Gift from "@/public/gift.svg";
import MoneyLeft from "@/public/money_left.svg";
import MoneyRight from "@/public/money_right.svg";
import Bonus from "./bonus";
import Cash from "./cash";
import Rankings from "./rankings";
import styles from "./index.module.scss";

const { Step } = Steps;

const GameDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const isAccountSync = id > 2;

  const handleClickRefresh = () => {
    Modal.alert({
      bodyClassName: styles.matchInfoModal,
      title: "未匹配到有效信息",
      content:
        "您尚未注册或操作有误，暂不要试玩或充值。请务必按要求操作，绑定账号后才能领取红包。",
      onConfirm: () => {
        // console.log("Confirmed");
      },
    });
  };

  const handleClickStart = () => {
    Modal.alert({
      content: (
        <>
          <span className={styles.redPacketLeft}>
            <Image src={redPacketLeft} />
          </span>
          <span className={styles.redPacketRight}>
            <Image src={redPacketRight} />
          </span>
          <Gift className={styles.gift} />
          <Banner className={styles.banner} />
          <span className={styles.title}>恭喜获得奖励</span>
          <div className={styles.amount}>+0.5</div>
          <div className={styles.content}>奖励已发放至余额账户</div>
        </>
      ),
      bodyClassName: styles.getRewardModal,
      onConfirm: () => {
        // console.log("Confirmed");
      },
      confirmText: "继续努力",
    });

    Modal.alert({
      content: (
        <>
          <MoneyLeft className={styles.moneyLeft} />
          <MoneyRight className={styles.moneyRight} />
          <div className={styles.title}>当前落后于85%玩家</div>
          <div className={styles.subTitle}>升级太慢？送你一个加速补贴</div>
          <div className={styles.redPacketSpeed}>
            <span className={styles.amount}>+10</span>
            <span className={styles.text}>累计充值10元</span>
            <span className={styles.bubble}>
              今日限时
              <BubbleTriangle className={styles.triangle} />
            </span>
            <RedPacketSpeed />
          </div>
          <div className={styles.content}>完成后升级指数：</div>
          <div className={styles.content}>
            近3分钟完成的玩家平均加快<em>180%</em>
          </div>
        </>
      ),
      bodyClassName: styles.speedUpModal,
      onConfirm: () => {
        // console.log("Confirmed");
      },
      confirmText: "试一试",
    });
  };

  const handleClickBack = () => {
    router.push('/my_games');
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>游戏详情</title>
        <meta name="description" content="游戏详情" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar className={styles.headNavBar} right={<Contact />} onBack={handleClickBack}>
        游戏详情
      </NavBar>

      <div className={styles.notices}>
        <Swiper
          direction="vertical"
          style={{ "--height": "24px" }}
          autoplay={true}
          loop={true}
          allowTouchMove={false}
          indicator={() => {}}
        >
          <For of={[1, 2, 3, 4]} each="id">
            <Swiper.Item key={id}>
              <div className={styles.notice}>
                <Image
                  src={playerImg}
                  width={20}
                  height={20}
                  objectFit="cover"
                />
                <span className={styles.noticeText}>
                  {`用户X**X 领取红包0.5 ${id}秒前`}
                </span>
              </div>
            </Swiper.Item>
          </For>
        </Swiper>
      </div>
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
              <Tag type="yellowPeriod">1期</Tag>
            </span>
            <span className={styles.total}>总奖励</span>
          </div>
        </div>
      </div>

      <div className={styles.binding}>
        <div className={styles.title}>
          <span className={styles.id}>
            游戏ID：
            <Choose>
              <When condition={isAccountSync}>
                <Space>
                  X20228877<Tag type="period">老用户</Tag>
                </Space>
              </When>
              <Otherwise>
                <Bubble content="显示账号后试玩才能领奖">
                  <span className={styles.notBound}>尚未绑定</span>
                </Bubble>
              </Otherwise>
            </Choose>
          </span>
          <Button
            size="mini"
            className={styles.refresh}
            onClick={handleClickRefresh}
          >
            刷新
          </Button>
        </div>

        <Choose>
          <When condition={isAccountSync}>
            <div className={styles.player}>
              <div className={styles.info}>
                <span>
                  <span className={styles.name}>
                    账号：玩家昵称玩家昵称玩家昵称
                  </span>
                  <span className={styles.level}>等级：203 | 充值：12</span>
                </span>
                <span>
                  <span className={styles.amount}>999.9</span>
                  <span className={styles.amountLabel}>本期已领</span>
                </span>
              </div>

              <div className={styles.tips}>
                <Exclamation />
                <span>请认准绑定账号，不要更换设备、账号或角色。</span>
              </div>
            </div>
          </When>
          <Otherwise>
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
          </Otherwise>
        </Choose>
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
        <span className={styles.bubble}>
          首充最高返20
          <BubbleTriangle className={styles.triangle} />
        </span>

        <div className={styles.btnWrap}>
          <Button
            fill="solid"
            block
            className={styles.startBtn}
            size="large"
            onClick={handleClickStart}
          >
            开始
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
