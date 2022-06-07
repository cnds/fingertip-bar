import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import MenuTabBar from "@/components/menuTabBar";
import BalancedDetailIcon from "@/public/balanced_detail_icon.svg";
import Contact from "@/public/contact.svg";
import ContactUsIcon from "@/public/contact_us_icon.svg";
import RecordIcon from "@/public/record_icon.svg";
import RightArrow from "@/public/right_arrow.svg";
import SettingIcon from "@/public/setting_icon.svg";
import userAvatar from "@/public/user_avatar.png";
import { Button, NavBar, Popup, Form, Input, Radio } from "antd-mobile";
import Head from "next/head";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { isPhone } from "@/utils/index.js";
import styles from "./index.module.scss";

const { useForm } = Form;
const COUNTDOWN_SECOND = 60;

const User = () => {
  const router = useRouter();
  const [form] = useForm();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [phone, setPhone] = useState(0);
  const intervalIdRef = useRef(0);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECOND);
  const [isSending, setIsSending] = useState(false);

  const handleClickExchange = () => {
    setIsPopupVisible(true);
  };

  const handleClickCancel = () => {
    setIsPopupVisible(false);
  };

  const handleChangePhone = (value) => {
    setPhone(value);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef?.current);
    };
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(intervalIdRef?.current);
      setIsSending(false);
      setCountdown(COUNTDOWN_SECOND);
    }
  }, [countdown]);

  const startCountdown = () => {
    intervalIdRef.current = setInterval(() => {
      setCountdown((number) => number - 1);
    }, 1000);
  };

  const handleClickGetCaptcha = () => {
    setIsSending(true);
    startCountdown();
  };

  const handleClickConfirm = () => {
    router.push("/exchange");
  };

  const handleClickBalance = () => {
    router.push("/balance_detail");
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>个人中心</title>
        <meta name="description" content="个人中心" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar right={<Contact />}>个人中心</NavBar>
      <div className={styles.container}>
        <div className={styles.info}>
          <Image src={userAvatar} />
          <div className={styles.detail}>
            <div className={styles.name}>用户名用户名</div>
            <div className={styles.userId}>
              <span>ID</span>
              <span>68500001</span>
              <CopyToClipboard text="68500001">
                <Button className={styles.copy}>复制</Button>
              </CopyToClipboard>
            </div>
          </div>
        </div>

        <div className={styles.money}>
          <div className={styles.balance}>
            <div>
              <div className={styles.label}>当前余额</div>
              <div className={styles.amount}>188.6</div>
            </div>
            <Button className={styles.exchange} onClick={handleClickExchange}>
              去兑换
            </Button>
          </div>

          <div className={styles.income}>
            <span className={styles.type}>
              <span className={styles.label}>今日收益</span>
              <span className={styles.amount}>28.2</span>
            </span>

            <span className={styles.type}>
              <span className={styles.label}>累计收益</span>
              <span className={styles.amount}>5882</span>
            </span>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.action}>
            <RecordIcon />
            <span className={styles.text}>参与记录</span>
            <RightArrow className={styles.rightArrow} />
          </div>

          <div className={styles.action} onClick={handleClickBalance}>
            <BalancedDetailIcon />
            <span className={styles.text}>余额明细</span>
            <RightArrow className={styles.rightArrow} />
          </div>

          <div className={styles.action}>
            <ContactUsIcon />
            <span className={styles.text}>联系客服</span>
            <RightArrow className={styles.rightArrow} />
          </div>

          <div className={styles.action}>
            <SettingIcon />
            <span className={styles.text}>关于设置</span>
            <RightArrow className={styles.rightArrow} />
          </div>
        </div>

        <div className={styles.slogan}>指尖网咖，挂机就能领红包</div>
      </div>
      <Popup
        visible={isPopupVisible}
        onMaskClick={() => {
          setIsPopupVisible(false);
        }}
        bodyStyle={{
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
        getContainer={null}
        bodyClassName={styles.verificationPopup}
      >
        <div className={styles.title}>
          <span className={styles.cancelBtn} onClick={handleClickCancel}>
            取消
          </span>
          隐私政策提示
        </div>
        <div className={styles.content}>
          根据国家有关政策规定，为保障数据和信息安全，请做简单验证。
        </div>
        <Form form={form}>
          <Form.Item name="phone">
            <Input
              placeholder="请输入手机号码"
              clearable
              onChange={handleChangePhone}
            />
          </Form.Item>
          <Form.Item
            name="captcha"
            extra={
              <>
                <em className={styles.division} />
                <Button
                  className={styles.captchaBtn}
                  fill="none"
                  disabled={!isPhone(phone) || isSending}
                  onClick={handleClickGetCaptcha}
                >
                  {isSending ? `${countdown}s后重新获取` : "获取验证码"}
                </Button>
              </>
            }
          >
            <Input placeholder="输入验证码" clearable />
          </Form.Item>
          <Form.Item name="isAgree">
            <Radio block>
              <div className={styles.agreeText}>
                我同意<span>《用户协议》</span>、<span>《隐私政策》</span>、
                <span>《共享经济协议》</span>
              </div>
            </Radio>
          </Form.Item>
          <Form.Item dependencies={["phone", "captcha", "isAgree"]}>
            {({ getFieldsValue }) => {
              const { phone, captcha, isAgree } = getFieldsValue();
              return (
                <div className={styles.btnWrapper}>
                  <Button
                    className={styles.confirmBtn}
                    block
                    disabled={
                      !isPhone(phone) || captcha?.length < 4 || !isAgree
                    }
                    onClick={handleClickConfirm}
                  >
                    确认
                  </Button>
                </div>
              );
            }}
          </Form.Item>
        </Form>
      </Popup>
      <MenuTabBar />
    </div>
  );
};

export default User;
