import Bonus from "@/components/bonus";
import Bubble from "@/components/bubble";
import Cash from "@/components/cash";
import Contact from "@/components/contact";
import ProgressBar from "@/components/progressBar";
import Rankings from "@/components/rankings";
import Tag from "@/components/tag";
import Banner from "@/public/banner.svg";
import BubbleTriangle from "@/public/bubble_triangle.svg";
import Exclamation from "@/public/exclamation.svg";
import gameImg from "@/public/game.png";
import Gift from "@/public/gift.svg";
import MoneyLeft from "@/public/money_left.svg";
import MoneyRight from "@/public/money_right.svg";
import redPacketLeft from "@/public/red_packet_left.png";
import redPacketRight from "@/public/red_packet_right.png";
import RedPacketSpeed from "@/public/red_packet_speed.svg";
import Safari from "@/public/safari.svg";
import {
  deduplicate,
  getClientAdDetail,
  getServeAdDetail,
} from "@/request/index";
import {
  Button,
  Input,
  Modal,
  NavBar,
  Popover,
  Space,
  Steps,
  Swiper,
  Tabs,
  Toast,
} from "antd-mobile";
import axios from "axios";
import dayjs from "dayjs";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useMemo, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./index.module.scss";

const { Step } = Steps;

const GameDetail = ({ adDetail: initAdDetail }) => {
  const router = useRouter();
  const { MobileModel } = router.query;
  const [adDetail, setAdDetail] = useState(initAdDetail);
  const [isCopyPopoverVisible, setIsCopyPopoverVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const btnRef = useRef(null);
  let callLib = null;

  const handleClickRefresh = () => {
    getClientAdDetail(queryString.stringify(router?.query))
      .then((res) => {
        if (res?.data?.err_code === 0) {
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
          } else {
            Toast.show({
              content: "刷新成功",
            });
          }
        } else {
          Toast.show({
            content: "网络异常，稍后再试",
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
    const advertisement = adDetail?.messages?.find(
      (modal) => modal?.type === 2
    );

    if (advertisement) {
      Modal.alert({
        content: (
          <>
            <MoneyLeft className={styles.moneyLeft} />
            <MoneyRight className={styles.moneyRight} />
            <div className={styles.title}>{advertisement?.title}</div>
            <div className={styles.subTitle}>{advertisement?.sub_title}</div>
            <div className={styles.redPacketSpeed}>
              <span className={styles.amount}>+{advertisement?.amount}</span>
              {/* <span className={styles.text}>累计充值10元</span> */}
              <span className={styles.bubble}>
                今日限时
                <BubbleTriangle className={styles.triangle} />
              </span>
              <RedPacketSpeed />
            </div>
            <div className={styles.content}>{advertisement?.content}</div>
          </>
        ),
        bodyClassName: styles.speedUpModal,
        onConfirm: () => {
          // console.log("Confirmed");
        },
        confirmText: "去充值",
      });
    }
  };

  useEffect(() => {
    const CallApp = require("callapp-lib");

    const options = {
      scheme: {
        protocol: adDetail?.game_info?.scheme,
      },
      fallback: adDetail?.game_info?.download_url,
      appstore: adDetail?.game_info?.download_url,
      timeout: 300,
    };

    callLib = new CallApp(options);
  }, []);

  const download = (fileName) => {
    axios({
      url: `/api/downloadApk?url=${adDetail?.game_info?.download_url}`,
      responseType: "arraybuffer",
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        setProgress((loaded / total) * 100);
      },
    }).then((res) => {
      const buffer = new Blob([res?.data]);
      const link = document.createElement("a");
      link.href = URL.createObjectURL(buffer);
      link.download = `${fileName || "game"}.apk`;
      link.click();
    });
  };

  const handleClickStart = () => {
    const userAgent = window?.navigator?.userAgent?.toLowerCase();
    const safari = /safari/.test(userAgent);
    const ios = /iphone|ipod|ipad/.test(userAgent);

    // // ios and webview
    // if (ios && !safari) {
    //   setIsCopyPopoverVisible(true);

    //   return;
    // }

    if (adDetail?.need_deduplicate) {
      const str = queryString.stringify({
        ...router.query,
        AdId: adDetail?.game_info?.ad_id,
      });

      deduplicate(str)
        .then((res) => {
          // 排重失败，不可以进行试玩
          if (res?.data?.err_code !== 0) {
            Toast.show({ content: "该游戏不可参与，试试其他的哦" });
          } else {
            // ios and webview
            if (ios && !safari) {
              setIsCopyPopoverVisible(true);
              return;
            }
            if (adDetail?.game_info?.download_url?.endsWith(".apk")) {
              const strArr = adDetail?.game_info?.download_url?.split("/");
              const fileName = strArr?.[strArr?.length - 1]?.replace(
                ".apk",
                ""
              );

              download(fileName);
            } else {
              callLib?.open({
                path: "",
              });
            }
          }
        })
        .catch(function (error) {
          if (error.response.status != 200) {
            Toast.show({ content: "该游戏不可参与，试试其他的哦" });
          }
        });
    } else {
      // ios and webview
      if (ios && !safari) {
        setIsCopyPopoverVisible(true);
        return;
      }

      if (adDetail?.game_info?.download_url?.endsWith(".apk")) {
        const strArr = adDetail?.game_info?.download_url?.split("/");
        const fileName = strArr?.[strArr?.length - 1]?.replace(".apk", "");

        download(fileName);
      } else {
        callLib?.open({
          path: "",
        });
      }
    }
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
  }, [adDetail]);

  const isShowLevelTab = useMemo(() => {
    return adDetail?.tasks?.level?.length > 0;
  }, [adDetail]);

  const isShowRechargeTab = useMemo(() => {
    return adDetail?.tasks?.recharge?.length > 0;
  }, [adDetail]);

  const isShowRankTab = useMemo(() => {
    return (
      adDetail?.tasks?.rank?.level?.length > 0 ||
      adDetail?.tasks?.rank?.recharge?.length > 0
    );
  }, [adDetail]);

  const bubbleLeftStyle = useMemo(() => {
    if (isShowLevelTab && isShowRankTab) {
      return "44%";
    }

    if (isShowLevelTab && !isShowRankTab) {
      return "67%";
    }

    if (!isShowLevelTab && isShowRankTab) {
      return "18%";
    }

    if (!isShowLevelTab && !isShowRankTab) {
      return "42%";
    }
  }, [isShowLevelTab, isShowRankTab]);

  const defaultActiveKey = useMemo(() => {
    if (isShowLevelTab) {
      return "bonus";
    }

    if (isShowRechargeTab) {
      return "recharge";
    }

    if (isShowRankTab) {
      return "rankings";
    }

    return "bonus";
  }, [isShowLevelTab, isShowRechargeTab, isShowRankTab]);

  const onCopy = (text, result) => {
    if (result) {
      Toast.show({
        content: "已复制，请到浏览器打开",
      });
    }
  };

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

      <If condition={adDetail?.slides?.length > 0}>
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
                  {/* <Image
                    src={playerImg}
                    width={20}
                    height={20}
                    objectFit="cover"
                  /> */}
                  {/* <span className={styles.noticeText}>
                    {`${slide?.content} ${calSecondAgo(slide?.time)}`}
                  </span> */}
                  <span className={styles.noticeText}>
                    {`${slide?.content} 1秒前`}
                  </span>
                </div>
              </Swiper.Item>
            </For>
          </Swiper>
        </div>
      </If>
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
                  <Choose>
                    <When condition={adDetail?.account_info?.is_new}>
                      <Tag type="period">新用户</Tag>
                    </When>
                    <Otherwise>
                      <Tag type="period">老用户</Tag>
                    </Otherwise>
                  </Choose>
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
                    <When condition={adDetail?.game_info?.os == 1}>
                      <span className={styles.start}>
                        点击<span className={styles.entry}>开始</span>
                        进入，必须「允许」广告追踪
                      </span>
                    </When>
                    <Otherwise>
                      <span className={styles.start}>
                        点击<span className={styles.entry}>开始</span>
                        进入，请勿跳转自带应用商店
                      </span>
                    </Otherwise>
                  </Choose>
                  // <span className={styles.start}>
                  //   点击<span className={styles.entry}>开始</span>
                  //   进入，中途请勿切换网络
                  // </span>
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
        <Tabs activeLineMode="fixed" defaultActiveKey={defaultActiveKey}>
          <If condition={isShowLevelTab}>
            <Tabs.Tab title="等级奖励" key="bonus">
              <Bonus
                level={adDetail?.tasks?.level}
                desc={adDetail?.game_info?.desc}
              />
            </Tabs.Tab>
          </If>
          <If condition={isShowRechargeTab}>
            <Tabs.Tab title="充值返现" key="recharge">
              <Cash
                recharge={adDetail?.tasks?.recharge}
                desc={adDetail?.game_info?.desc}
              />
            </Tabs.Tab>
          </If>
          <If condition={isShowRankTab}>
            <Tabs.Tab title="排行榜" key="rankings">
              <Rankings
                rank={adDetail?.tasks?.rank}
                desc={adDetail?.game_info?.desc}
              />
            </Tabs.Tab>
          </If>
        </Tabs>
        <If condition={isShowRechargeTab}>
          <span className={styles.bubble} style={{ left: bubbleLeftStyle }}>
            首充最高返20
            <BubbleTriangle className={styles.triangle} />
          </span>
        </If>

        <div className={styles.btnWrap} ref={btnRef}>
          <Popover
            content={
              <CopyToClipboard
                text={adDetail?.game_info?.download_url}
                onCopy={onCopy}
              >
                <div className={styles.popoverWrap}>
                  <Space>
                    <Input
                      value={adDetail?.game_info?.download_url}
                      className={styles.linkInput}
                      disabled
                    />
                    <Button size="small" className={styles.copy}>
                      复制
                    </Button>
                  </Space>
                  <div className={styles.copyText}>
                    👆复制链接，到
                    <Safari className={styles.safari} />
                    Safari浏览器打开
                  </div>
                </div>
              </CopyToClipboard>
            }
            getContainer={btnRef?.current || (() => document?.body)}
            visible={isCopyPopoverVisible}
          >
            <Choose>
              <When condition={progress > 0 && progress < 100}>
                <ProgressBar percent={progress} />
              </When>
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
          </Popover>
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
