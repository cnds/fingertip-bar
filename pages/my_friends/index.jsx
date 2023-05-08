import { getInvitationRewardDetail } from "@/request/index";
import { InfiniteScroll, NavBar } from "antd-mobile";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useState } from "react";
import Friend from "./friend";
import styles from "./index.module.scss";

const MyFriends = () => {
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const onBack = () => {
    router.back();
  };

  async function loadMore() {
    if (Object.keys(router?.query)?.length === 0) {
      return;
    }

    const queryObj = {
      ...router?.query,
      start_id: friends?.[friends?.length - 1]?.id,
    };

    const res = await getInvitationRewardDetail(
      queryString.stringify(queryObj)
    );
    const newFriends = res?.data?.payload;

    setFriends((val) => [...val, ...newFriends]);
    setHasMore(newFriends?.length > 0);
  }

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
        <For of={friends} index="index" each="friend">
          <Friend key={index} friend={friend} />
        </For>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
};

export default MyFriends;
