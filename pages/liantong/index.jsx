import ActionBtn from "@/components/actionBtn";
import LandingPage from "@/public/landing_page.svg";
import { getLandingReward } from "@/request/index";
import { isWeixin, isIOS } from "@/utils/index.js";
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

  const onClick = () => {
    if (isIOS()) {
      window.location.href = "https://fqm001.com/aurora?u=10935948&referer_code=bc87e230cd&v=20240305"
    } else {
      window.location.href = "https://download.s21i.faiusr.com/16014459/0/2/ABUIABBKGAAg7NubrwYonaT4-gE.apk?f=app-ltshiwan.apk&v=1709633013"
    }
  };

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
      {/* <CopyToClipboard text={router?.query?.id}> */}
        <ActionBtn className={styles.action} onClick={onClick}>
          立即领红包
        </ActionBtn>
      {/* </CopyToClipboard> */}
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
