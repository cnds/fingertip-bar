import ActionBtn from "@/components/actionBtn";
import MenuTabBar from "@/components/menuTabBar";
import Clouds from "@/public/clouds.svg";
import Gameplay from "@/public/gameplay.png";
import MoreArrow from "@/public/more_arrow.svg";
import RecordBg from "@/public/record_bg.png";
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
import Image from "next/image";
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
            <Image src={RecordBg} objectFit="cover" />
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
            <Image src={Gameplay} objectFit="cover" />
          </div>

          <div className={styles.rule}>
            <TitleRule style={{ marginBottom: 12 }} />
            <div>
              （1）仅针对指定媒体APP上线邀请好友模块（在CPL平台新增一个媒体，邀请模块仅自己APP使用）。
            </div>
            <div>
              （2）奖励统计规则：提成=好友已领奖励*20%
              <div>
                --补贴不参与提成（同详情页标签，第1个充值红包默认为补贴，是不计入的）。
              </div>
              <div>--每个好友贡献分成最多100，达到100后不再分成。</div>
              <div>
                --师傅和徒弟的媒体一致性。举例：A用户通过「甲媒体」邀请路B用户，B用户可能同时在多个媒体玩游戏，仅有B用户在「甲媒体」获得的奖励，才能给A用户带来提成。
              </div>
            </div>
            <div>
              （3）师傅邀请码：为每个用户生成专属的二维码和链接。(保存的图片二维码替换为实际二维码)
              <div>
                --点击“保存图片并复制”，海报保存到手机相册，同时复制链接和文案到剪切板，内容：“实时提现到账，打开领https://xxx.com/xxx/xxxx”（链接为用户专属的邀请链接，供用户直接粘贴）；
              </div>
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
