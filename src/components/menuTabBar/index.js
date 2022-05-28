import { TabBar } from "antd-mobile";
import { useRouter } from "next/router";
import Homepage from "@/public/homepage.svg";
import RedPacket from "@/public/red_packet.svg";
import User from "@/public/user.svg";
import HomepageActive from "@/public/homepage_active.svg";
import RedPacketActive from "@/public/red_packet_active.svg";
import UserActive from "@/public/user_active.svg";
import styles from "./index.module.scss";

const MenuTabBar = () => {
  const router = useRouter();

  const tabs = [
    {
      key: "/",
      title: "首页",
      icon: router?.pathname === "/" ? <HomepageActive /> : <Homepage />,
    },
    {
      key: "/redPacket",
      title: "拆红包",
      icon:
        router?.pathname === "/redPacket" ? <RedPacketActive /> : <RedPacket />,
    },
    {
      key: "/user",
      title: "我的",
      icon: router?.pathname === "/user" ? <UserActive /> : <User />,
    },
  ];

  const handleChangeTabBar = (key) => {
    router.push(key);
  };

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
