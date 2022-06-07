import Head from "next/head";
import { useRouter } from "next/router";
import { NavBar, Button } from "antd-mobile";
import ApplySuccess from "@/public/apply_success.svg";
import styles from "./index.module.scss";

const Success = () => {
  const router = useRouter();

  const onContinue = () => {
    router.push("/exchange");
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>申请成功</title>
        <meta name="description" content="申请成功" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar backArrow={false} className={styles.navBar}>申请成功</NavBar>
      <div className={styles.container}>
        <div className={styles.complete}>
          <Button
            fill="none"
            className={styles.completeBtn}
            onClick={onContinue}
          >
            完成
          </Button>
        </div>
        <ApplySuccess />
        <div className={styles.title}>申请兑换成功</div>
        <div className={styles.content}>
          您的兑换申请已提交，审核通过后将由支付机构发放至您的收款账户，请耐心等待。
        </div>

        <Button className={styles.continueBtn} onClick={onContinue}>
          继续领红包
        </Button>
      </div>
    </div>
  );
};

export default Success;
