import ActionBtn from "@/components/actionBtn";
import LandingPage from "@/public/landing_page.svg";
import { bindLink, getLandingReward } from "@/request/index";
import { isWeixin } from "@/utils/index.js";
import { Toast } from "antd-mobile";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useMemo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./index.module.scss";

const Invitation = ({ landingReward }) => {
  const router = useRouter();

  useEffect(() => {
    if (isWeixin()) {
      Toast.show({
        content: "请使用浏览器打开",
      });
    }
  }, []);

  const onBindLink = () => {
    const queryStr = queryString.stringify(router?.query);

    bindLink(queryStr, { code: router?.query?.id })
      .then((res) => {
        if (res?.data?.err_code === 0) {
        }
      })
      .catch((err) => {
        if (err?.response?.data?.err_msg) {
          Toast.show({
            content: err?.response?.data?.err_msg,
          });
        }
      });
  };

  const onOpenApp = () => {
    console.log("ok")
    const customScheme = "maobey://com.maobey.fingertip:6060/data"
    const fallbackUrl = "https://www.maoyoo.cn/"
    window.location.href =  `${customScheme}`;
    setTimeout(function() {
      if (document.hidden) {
        console.log("app opened")
      } else {
        console.log("app open failed")
        window.location.href = fallbackUrl;
      }
    }, 2000);
  }

  const rewardText = useMemo(() => {
    if (landingReward) {
      const rewardArr = [...String(landingReward)];
      rewardArr[rewardArr?.length - 2] = "?";

      return rewardArr?.join("");
    }

    return landingReward;
  }, []);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>天天领红包</title>
        <meta name="description" content="天天领红包" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingPage />
      <div className={styles.reward}>{rewardText}</div>
      <CopyToClipboard text={router?.query?.id}>
        <ActionBtn className={styles.action} onClick={onOpenApp}>
          立即领红包
        </ActionBtn>
      </CopyToClipboard>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await getLandingReward(queryString.stringify(context?.query));

  return {
    props: {
      landingReward: res?.data?.payload?.reward,
    },
  };
}

export default Invitation;
