import { NavBar } from "antd-mobile";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

// 客服页面
const CustomerService = () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>客服</title>
        <meta name="description" content="客服" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar onBack={onBack} className={styles.navBar}>
        客服
      </NavBar>
      <iframe
        className={styles.iframeWrapper}
        src="https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97d27354c7714d9ce849e1b76461665a28638153f3870fab90fcd400b714017e14abd8e4d6b2cd5f432111bb53880c16"
      />
    </div>
  );
};

export default CustomerService;
