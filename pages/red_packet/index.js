import ActionBtn from "@/components/actionBtn";
import MenuTabBar from "@/components/menuTabBar";
import Clouds from "@/public/clouds.svg";
import Gameplay from "@/public/gameplay.svg";
import MoreArrow from "@/public/more_arrow.svg";
import RecordBg from "@/public/record_bg.svg";
import RedPacketMain from "@/public/red_packet_main.svg";
import SavedImage from "@/public/saved_image.svg";
import TitleInvite from "@/public/title_invite.svg";
import TitleRule from "@/public/title_rule.svg";
import {
  getDashboard,
  getInvitationLink,
  getInvitationReward,
} from "@/request/index";
import { Mask, Swiper, Toast } from "antd-mobile";
import { CloseCircleOutline } from "antd-mobile-icons";
import html2canvas from "html2canvas";
import Head from "next/head";
import { useRouter } from "next/router";
import { QRCodeCanvas } from "qrcode.react";
import queryString from "query-string";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./index.module.scss";

const RedPacket = ({ invitationLink, rewardPayload, dashboard }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const slides = [
    { content: "用户58**1 获得+100" },
    { content: "用户58**1 获得+120" },
  ];

  const onShare = () => {
    setVisible(true);
  };

  const onSaveAndCopy = () => {
    html2canvas(document?.querySelector("#capture")).then((canvas) => {
      const url = canvas?.toDataURL("image/png");
      const link = document?.createElement("a");
      link.download = "领红包.png";
      link.href = url;
      link.click();

      Toast.show({
        content: "已保存并复制",
      });
    });
  };

  const gotoDetail = () => {
    router.push(`/my_friends?${queryString.stringify(router?.query)}`);
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>拆红包</title>
        <meta name="description" content="拆红包" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <TitleInvite className={styles.titleInvite} />
        <div className={styles.notices}>
          <Swiper
            style={{ "--height": "24px" }}
            autoplay={true}
            loop={true}
            allowTouchMove={false}
            indicator={() => {}}
          >
            <For of={rewardPayload?.slides || []} each="slide" index="index">
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

        <div className={styles.packet}>
          <RedPacketMain className={styles.redPacketMain} />
          <ActionBtn className={styles.share} onClick={onShare}>
            立即分享给好友
          </ActionBtn>
          <Mask visible={visible}>
            <div className={styles.savedImage}>
              <div className={styles.imgWrapper} id="capture">
                <SavedImage />
                {invitationLink && (
                  <QRCodeCanvas
                    value={invitationLink}
                    size={90}
                    className={styles.qrcode}
                  />
                )}
              </div>
              <CopyToClipboard text={`实时提现到账，打开领${invitationLink}`}>
                <ActionBtn className={styles.saveBtn} onClick={onSaveAndCopy}>
                  保存图片并复制
                </ActionBtn>
              </CopyToClipboard>
              <CloseCircleOutline
                fontSize={24}
                color="#f7f7f7"
                onClick={() => setVisible(false)}
              />
            </div>
          </Mask>
        </div>
      </div>
      <div className={styles.contentBg}>
        <div className={styles.content}>
          <div className={styles.myRecord}>
            <RecordBg />
            <div className={styles.title}>我的战绩</div>
            <div className={styles.result}>
              <div className={styles.left} onClick={gotoDetail}>
                <div className={styles.btn}>
                  已邀请 <MoreArrow />
                </div>
                <div className={styles.text}>{rewardPayload?.invited_num}</div>
              </div>
              <div className={styles.right} onClick={gotoDetail}>
                <div className={styles.btn}>
                  已分成 <MoreArrow />
                </div>
                <div className={styles.text}>{rewardPayload?.total_reward}</div>
              </div>
            </div>
          </div>
          <div className={styles.gameplay}>
            <Gameplay />
          </div>

          <div className={styles.rule}>
            <TitleRule style={{ marginBottom: 12 }} />
            <div>
              1、好友（被邀请人）通过您（邀请人）的专属链接或二维码下载APP完成试玩后，您可获得好友奖励20%的提成，最高可获得提成100.0/人。
            </div>
            <div>
              2、“补贴”或“今日补贴”对应的好友奖励不计入提成，以游戏详情页显示为准。
            </div>
            <div>
              3、同一用户/设备仅能被邀请1次，好友被多人重复邀请时以最先锁定邀请关系者为有效邀请。
            </div>
            <div>
              4、经平台大数据系统识别，好友设备、手机号、提现账户等信息相同或相似时，可能被系统判定为无效邀请。
            </div>
            <div>
              5、若活动内容有变更，将在本页面实时展示公布，不做单独通知。
            </div>
            <div>
              6、平台保有对本活动的最终解释权。
            </div>
          </div>
        </div>
        <Clouds className={styles.clouds} />
      </div>
      <MenuTabBar pageType={dashboard?.page_type} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const linkRes = await getInvitationLink(
    queryString.stringify(context?.query)
  );
  const rewardRes = await getInvitationReward(
    queryString.stringify(context?.query)
  );

  const dashboardRes = await getDashboard(
    queryString.stringify(context?.query)
  );

  return {
    props: {
      invitationLink: linkRes?.data?.payload?.link,
      rewardPayload: rewardRes?.data?.payload,
      dashboard: dashboardRes?.data?.payload,
    },
  };
}

export default RedPacket;
