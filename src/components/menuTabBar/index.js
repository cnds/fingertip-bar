import { TabBar } from "antd-mobile";
import { useRouter } from "next/router";
import Homepage from "@/public/homepage.svg";
import RedPacket from "@/public/red_packet.svg";
import User from "@/public/user.svg";
import styles from "./index.module.scss";

const MenuTabBar = () => {
  const tabs = [
    {
      key: "/",
      title: "首页",
      icon: <Homepage />,
    },
    {
      key: "/redPacket",
      title: "拆红包",
      icon: <RedPacket />,
    },
    {
      key: "/user",
      title: "我的",
      icon: <User />,
    },
  ];

  const router = useRouter();

  return (
    <TabBar className={styles.tabBar} activeKey={router?.pathname}>
      <For of={tabs} each="tab">
        <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} />
      </For>
    </TabBar>
  );
};

export default MenuTabBar;
