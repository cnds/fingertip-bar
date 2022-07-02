import Bonus from "@/components/bonus";
import Bubble from "@/components/bubble";
import Cash from "@/components/cash";
import Contact from "@/components/contact";
import Rankings from "@/components/rankings";
import Tag from "@/components/tag";
import Banner from "@/public/banner.svg";
import BubbleTriangle from "@/public/bubble_triangle.svg";
import Exclamation from "@/public/exclamation.svg";
import gameImg from "@/public/game.png";
import Gift from "@/public/gift.svg";
import MoneyLeft from "@/public/money_left.svg";
import MoneyRight from "@/public/money_right.svg";
import playerImg from "@/public/player.png";
import redPacketLeft from "@/public/red_packet_left.png";
import redPacketRight from "@/public/red_packet_right.png";
import RedPacketSpeed from "@/public/red_packet_speed.svg";
import { getClientAdDetail, getServeAdDetail } from "@/request/index";
import {
  Button,
  Modal,
  NavBar,
  Space,
  Steps,
  Swiper,
  Tabs,
  Toast,
} from "antd-mobile";
import dayjs from "dayjs";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./index.module.scss";

const { Step } = Steps;

const GameDetail = ({ adDetail: initAdDetail }) => {
  const router = useRouter();
  const { MobileModel } = router.query;
  const adTimeoutRef = useRef(null);
  const [adDetail, setAdDetail] = useState(initAdDetail);

  const handleClickRefresh = () => {
    getClientAdDetail(queryString.stringify(router?.query))
      .then((res) => {
        if (res?.data?.err_code === 0) {
          Toast.show({
            content: "刷新成功",
          });
        } else {
          Toast.show({
            content: "网络异常，稍后再试",
          });
        }

        const refreshedAdDetail = res?.data?.payload;

        setAdDetail(res?.data?.payload);

        if (!refreshedAdDetail?.account_info?.account_id) {
          Modal.alert({
            bodyClassName: styles.matchInfoModal,
            title: "未匹配到有效信息",
            content:
              "您尚未注册或操作有误，暂不要试玩或充值。请务必按要求操作，绑定账号后才能领取红包。",
            onConfirm: () => {
              // console.log("Confirmed");
            },
          });
        }
      })
      .catch((err) => {
        Toast.show({
          content: "网络异常，稍后再试",
        });
      });
  };

  const alertReward = () => {
    const reward = adDetail?.messages?.find((modal) => modal?.type === 1);

    if (reward) {
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
            <div className={styles.amount}>+{reward?.amount}</div>
            <div className={styles.content}>{reward?.content}</div>
          </>
        ),
        bodyClassName: styles.getRewardModal,
        onConfirm: () => {
          // console.log("Confirmed");
        },
        confirmText: "继续努力",
      });
    }
  };

  const alertAdvertisement = () => {
    adTimeoutRef.current = setTimeout(() => {
      const advertisement = adDetail?.messages?.find(
        (modal) => modal?.type === 2
      );

      if (advertisement) {
        Modal.alert({
          content: (
            <>
              <MoneyLeft className={styles.moneyLeft} />
              <MoneyRight className={styles.moneyRight} />
              <div className={styles.title}>
                当前落后于{generateRandom(85, 99)}%玩家
              </div>
              <div className={styles.subTitle}>{advertisement?.title}</div>
              <div className={styles.redPacketSpeed}>
                <span className={styles.amount}>+{advertisement?.amount}</span>
                {/* <span className={styles.text}>累计充值10元</span> */}
                <span className={styles.bubble}>
                  今日限时
                  <BubbleTriangle className={styles.triangle} />
                </span>
                <RedPacketSpeed />
              </div>
              <div className={styles.content}>{addEventListener?.content}</div>
              <div className={styles.content}>
                近3分钟完成的玩家平均加快<em>{generateRandom(140, 199)}%</em>
              </div>
            </>
          ),
          bodyClassName: styles.speedUpModal,
          onConfirm: () => {
            // console.log("Confirmed");
          },
          confirmText: "去完成",
        });
      }
    }, 2 * 60 * 1000);
  };

  const handleClickStart = () => {
    const CallApp = require("callapp-lib");

    const options = {
      scheme: {
        protocol: adDetail?.game_info?.scheme,
      },
    };

    callLib = new CallApp(options);

    callLib?.open({
      path: "",
    });
  };

  const generateRandom = (min = 0, max = 100) => {
    let difference = max - min;

    let rand = Math.random();

    rand = Math.floor(rand * difference);

    rand = rand + min;

    return rand;
  };

  useEffect(() => {
    alertReward();
    alertAdvertisement();

    return () => {
      if (adTimeoutRef?.current) {
        clearTimeout(adTimeoutRef?.current);
        adTimeoutRef.current = null;
      }
    };
  }, []);

  const handleClickBack = () => {
    const { AdId, id, ...restQueryObj } = router?.query;
    router.push(`/my_games?${queryString.stringify(restQueryObj)}`);
  };

  const calSecondAgo = (time) => {
    const secondAgo = dayjs().diff(dayjs(time), "seconds");

    if (secondAgo > 60) {
      return `${Math.floor(secondAgo / 60)}分钟前`;
    }

    return `${secondAgo}秒前`;
  };

  const isAccountSync = useMemo(() => {
    return !!adDetail?.account_info?.account_id;
  }, []);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>游戏详情</title>
        <meta name="description" content="游戏详情" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar
        className={styles.headNavBar}
        right={<Contact className={styles.contactIcon} />}
        onBack={handleClickBack}
      >
        游戏详情
      </NavBar>

      <div className={styles.notices}>
        <Swiper
          style={{ "--height": "24px" }}
          autoplay={true}
          loop={true}
          allowTouchMove={false}
          indicator={() => {}}
        >
          <For of={adDetail?.slides} each="slide" index="index">
            <Swiper.Item key={index}>
              <div className={styles.notice}>
                <Image
                  src={playerImg}
                  width={20}
                  height={20}
                  objectFit="cover"
                />
                <span className={styles.noticeText}>
                  {`${slide?.content} ${calSecondAgo(slide?.time)}`}
                </span>
              </div>
            </Swiper.Item>
          </For>
        </Swiper>
      </div>
      <div className={styles.overview}>
        <Image
          src={adDetail?.game_info?.logo || gameImg}
          width={60}
          height={60}
          objectFit="cover"
        />
        <div className={styles.text}>
          <div className={styles.first}>
            <span className={styles.name}>{adDetail?.game_info?.app_name}</span>
            <span className={styles.amount}>
              {adDetail?.game_info?.reward_total}
            </span>
          </div>
          <div className={styles.second}>
            <span>
              <span className={styles.endTime}>
                {dayjs(adDetail?.game_info?.end_date)?.format("YYYY/MM/DD")}结束
              </span>
              <Tag type="yellowPeriod">{adDetail?.game_info?.stage}期</Tag>
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
                  {adDetail?.account_info?.account_id}
                  <Tag type="period">老用户</Tag>
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
                    账号：{adDetail?.account_info?.character_name}
                    <If condition={adDetail?.account_info?.server_name}>
                      <span className={styles.divider} />
                      区服：{adDetail?.account_info?.server_name}
                    </If>
                  </span>
                  <span className={styles.level}>
                    等级：{adDetail?.account_info?.level} | 充值：
                    {adDetail?.account_info?.recharge}
                  </span>
                </span>
                <span>
                  <span className={styles.amount}>
                    {adDetail?.account_info?.rewarded}
                  </span>
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
                  <Choose>
                    <When condition={MobileModel?.includes("iPhone")}>
                      <span className={styles.start}>
                        必须“允许”广告跟踪，中途请勿切换网络
                      </span>
                    </When>
                    <When condition={MobileModel?.includes("android")}>
                      <span className={styles.start}>
                        选择“普通”下载，不能跳转应用商店，请勿切换网络
                      </span>
                    </When>
                    <Otherwise>
                      <span className={styles.start}>
                        点击<span className={styles.entry}>开始</span>
                        进入，中途请勿切换网络
                      </span>
                    </Otherwise>
                  </Choose>
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
            <Bonus level={adDetail?.tasks?.level} />
          </Tabs.Tab>
          <Tabs.Tab title="充值返现" key="recharge">
            <Cash recharge={adDetail?.tasks?.recharge} />
          </Tabs.Tab>
          <Tabs.Tab title="排行榜" key="rankings">
            <Rankings rank={adDetail?.tasks?.rank} />
          </Tabs.Tab>
        </Tabs>
        <span className={styles.bubble}>
          首充最高返20
          <BubbleTriangle className={styles.triangle} />
        </span>

        <div className={styles.btnWrap}>
          <Choose>
            <When condition={isAccountSync}>
              <Button
                fill="solid"
                block
                className={styles.startBtn}
                size="large"
                onClick={handleClickStart}
              >
                继续
              </Button>
            </When>
            <Otherwise>
              <Button
                fill="solid"
                block
                className={styles.startBtn}
                size="large"
                onClick={handleClickStart}
              >
                开始
              </Button>
            </Otherwise>
          </Choose>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await getServeAdDetail(queryString.stringify(context?.query));

  return {
    props: {
      adDetail: res?.data?.payload,
    },
  };
}

export default GameDetail;
