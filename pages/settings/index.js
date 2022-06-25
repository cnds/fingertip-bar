import RightArrow from "@/public/right_arrow.svg";
import { getAccount } from "@/request/index";
import { NavBar } from "antd-mobile";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";
import styles from "./index.module.scss";

const Settings = ({ account }) => {
  const router = useRouter();

  const onBack = () => {
    router.push(`/user?${queryString.stringify(router?.query)}`);
  };

  const gotoAgreement = (path) => {
    router.push(path);
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
          <div className={styles.text}>昵称：{account?.nickname}</div>
          <div className={styles.text}>UID：{account?.uid}</div>
          <div className={styles.text}>手机号：{account?.mobile}</div>
          <div className={styles.text}>邀请人：-</div>
        </div>

        <div className={styles.box}>
          <div className={styles.title}>协议资料</div>
          <div
            className={styles.agreement}
            onClick={() => {
              gotoAgreement("/agreement/user");
            }}
          >
            用户协议
            <RightArrow />
          </div>
          <div
            className={styles.agreement}
            onClick={() => {
              gotoAgreement("/agreement/privacyPolicy");
            }}
          >
            隐私协议
            <RightArrow />
          </div>
          <div
            className={styles.agreement}
            onClick={() => {
              gotoAgreement("/agreement/shareeconomy");
            }}
          >
            共享经济协议
            <RightArrow />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await getAccount(queryString.stringify(context?.query));

  return {
    props: {
      account: res?.data?.payload,
    },
  };
}

export default Settings;
