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
        src="https://m.maoyoo.cn/col.jsp?id=116"
      />
    </div>
  );
};

export default CustomerService;
