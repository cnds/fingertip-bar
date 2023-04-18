import { NavBar } from "antd-mobile";
import Head from "next/head";
import { useRouter } from "next/router";
import Friend from "./friend";
import styles from "./index.module.scss";

const MyFriends = () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>我的好友</title>
        <meta name="description" content="我的好友" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar onBack={onBack}>我的好友</NavBar>

      <div className={styles.main}>
        <For of={[1, 2, 3]} index="index" each="friend">
          <Friend key={index} />
        </For>
      </div>
    </div>
  );
};

export default MyFriends;
