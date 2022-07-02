import Detail from "@/components/detail";
import { getBalanceDetail } from "@/request/index";
import { Button, NavBar } from "antd-mobile";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";
import styles from "./index.module.scss";

const BalanceDetail = ({ balanceDetail }) => {
  const router = useRouter();

  const onBack = () => {
    router.push(`/user?${queryString.stringify(router?.query)}`);
  };

  const mockDetails = [
    {
      type: "increase",
      amount: "10.0",
      isIncrease: true,
      time: "2022-01-20",
      title: "兑换失败退回",
    },
    {
      type: "game",
      amount: "10.0",
      isIncrease: true,
      time: "2022-01-20",
      title: "通过《XX》获得",
    },
    {
      type: "invitation",
      amount: "10.0",
      isIncrease: true,
      time: "2022-01-20",
      title: "通过《XX》获得",
    },
    {
      type: "decrease",
      amount: "10.0",
      isIncrease: false,
      time: "2022-01-20",
      title: "兑换消耗",
    },
  ];

  const onContinue = () => {
    router.push(`/?${queryString.stringify(router?.query)}`);
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>余额明细</title>
        <meta name="description" content="余额明细" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar onBack={onBack} className={styles.navBar}>
        余额明细
      </NavBar>
      <div className={styles.container}>
        <For of={balanceDetail} each="detail" index="index">
          <Detail key={index} detail={detail} />
        </For>

        <div className={styles.tip}>只保留近30天余额记录</div>

        <div className={styles.btnWrapper}>
          <Button className={styles.continueBtn} block onClick={onContinue}>
            继续领红包
          </Button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await getBalanceDetail(queryString.stringify(context?.query));

  return {
    props: {
      balanceDetail: res?.data?.payload,
    },
  };
}

export default BalanceDetail;
