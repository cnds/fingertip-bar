import Homepage from "@/public/homepage.svg";
import HomepageActive from "@/public/homepage_active.svg";
import RedPacket from "@/public/red_packet.svg";
import RedPacketActive from "@/public/red_packet_active.svg";
import User from "@/public/user.svg";
import UserActive from "@/public/user_active.svg";
import { TabBar } from "antd-mobile";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useMemo } from "react";
import styles from "./index.module.scss";

// 0:菜单不展示
// 1:展示【首页】【我的】
// 2:展示【首页】【拆红包】【我的】
const MenuTabBar = ({ pageType }) => {
  const router = useRouter();

  const tabs = useMemo(() => {
    const defaultTabs = [
      {
        key: "/",
        title: "首页",
        icon: router?.pathname === "/" ? <HomepageActive /> : <Homepage />,
      },
      {
        key: "/red_packet",
        title: "拆红包",
        icon:
          router?.pathname === "/red_packet" ? (
            <RedPacketActive />
          ) : (
            <RedPacket />
          ),
      },
      {
        key: "/user",
        title: "我的",
        icon: router?.pathname === "/user" ? <UserActive /> : <User />,
      },
    ];

    if (pageType === 1) {
      return defaultTabs.filter((t, index) => index !== 1);
    }

    if (pageType === 2) {
      return defaultTabs;
    }

    return defaultTabs;
  }, []);

  const handleChangeTabBar = (key) => {
    const queryStr = queryString.stringify(router?.query);

    router.push(`${key}?${queryStr}`);
  };

  if (pageType === 0) {
    return null;
  }

  return (
    <TabBar
      className={styles.tabBar}
      activeKey={router?.pathname}
      onChange={handleChangeTabBar}
    >
      <For of={tabs} each="tab">
        <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} />
      </For>
    </TabBar>
  );
};

export default MenuTabBar;
