import Head from "next/head";
import { NavBar } from "antd-mobile";
import { useRouter } from "next/router";
import RightArrow from "@/public/right_arrow.svg";
import styles from "./index.module.scss";

const Settings = () => {
  const router = useRouter();

  const onBack = () => {
    router.push("/user");
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>关于设置</title>
        <meta name="description" content="关于设置" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar onBack={onBack} className={styles.navBar}>
        关于设置
      </NavBar>

      <div className={styles.container}>
        <div className={styles.profile}>
          <span className={styles.logo}>LOGO</span>
          <div className={styles.name}>指尖网咖</div>
          <div className={styles.banner}>挂机就能领红包</div>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>我的资料</div>
          <div className={styles.text}>昵称：苏苏苏</div>
          <div className={styles.text}>UID：1255256</div>
          <div className={styles.text}>手机号：188****8888</div>
          <div className={styles.text}>邀请人：-</div>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>协议资料</div>
          <div className={styles.agreement}>
            用户协议
            <RightArrow />
          </div>
          <div className={styles.agreement}>
            隐私协议
            <RightArrow />
          </div>
          <div className={styles.agreement}>
            共享经济协议
            <RightArrow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
