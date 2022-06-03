import MenuTabBar from "@/components/menuTabBar";
import BalancedDetailIcon from "@/public/balanced_detail_icon.svg";
import Contact from "@/public/contact.svg";
import ContactUsIcon from "@/public/contact_us_icon.svg";
import RecordIcon from "@/public/record_icon.svg";
import RightArrow from "@/public/right_arrow.svg";
import SettingIcon from "@/public/setting_icon.svg";
import userAvatar from "@/public/user_avatar.png";
import { Button, NavBar } from "antd-mobile";
import Head from "next/head";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./index.module.scss";

const User = () => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>个人中心</title>
        <meta name="description" content="个人中心" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar right={<Contact />}>个人中心</NavBar>
      <div className={styles.container}>
        <div className={styles.info}>
          <Image src={userAvatar} />
          <div className={styles.detail}>
            <div className={styles.name}>用户名用户名</div>
            <div className={styles.userId}>
              <span>ID</span>
              <span>68500001</span>
              <CopyToClipboard text="68500001">
                <Button className={styles.copy}>复制</Button>
              </CopyToClipboard>
            </div>
          </div>
        </div>

        <div className={styles.money}>
          <div className={styles.balance}>
            <div>
              <div className={styles.label}>当前余额</div>
              <div className={styles.amount}>188.6</div>
            </div>
            <Button className={styles.exchange}>去兑换</Button>
          </div>

          <div className={styles.income}>
            <span className={styles.type}>
              <span className={styles.label}>今日收益</span>
              <span className={styles.amount}>28.2</span>
            </span>

            <span className={styles.type}>
              <span className={styles.label}>累计收益</span>
              <span className={styles.amount}>5882</span>
            </span>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.action}>
            <RecordIcon />
            <span className={styles.text}>参与记录</span>
            <RightArrow className={styles.rightArrow} />
          </div>

          <div className={styles.action}>
            <BalancedDetailIcon />
            <span className={styles.text}>参与记录</span>
            <RightArrow className={styles.rightArrow} />
          </div>

          <div className={styles.action}>
            <ContactUsIcon />
            <span className={styles.text}>参与记录</span>
            <RightArrow className={styles.rightArrow} />
          </div>

          <div className={styles.action}>
            <SettingIcon />
            <span className={styles.text}>参与记录</span>
            <RightArrow className={styles.rightArrow} />
          </div>
        </div>

        <div className={styles.slogan}>指尖网咖，挂机就能领红包</div>
      </div>
      <MenuTabBar />
    </div>
  );
};

export default User;
