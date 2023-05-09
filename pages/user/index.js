import Contact from "@/components/contact";
import MenuTabBar from "@/components/menuTabBar";
import BalancedDetailIcon from "@/public/balanced_detail_icon.svg";
import ContactUsIcon from "@/public/contact_us_icon.svg";
import RecordIcon from "@/public/record_icon.svg";
import RightArrow from "@/public/right_arrow.svg";
import SettingIcon from "@/public/setting_icon.svg";
import userAvatar from "@/public/user_avatar.png";
import { bindMobile, getAccount, getDashboard, sendSms } from "@/request/index";
import { isPhone } from "@/utils/index.js";
import { Button, Form, Input, NavBar, Popup, Radio, Toast } from "antd-mobile";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "./index.module.scss";

const { useForm } = Form;
const COUNTDOWN_SECOND = 60;

const User = ({ account, dashboard }) => {
  const router = useRouter();
  const [form] = useForm();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [phone, setPhone] = useState(0);
  const [verifyCode, setVerifyCode] = useState("");
  const intervalIdRef = useRef(0);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECOND);
  const [isSending, setIsSending] = useState(false);
  const [isAgree, setIsAgree] = useState(true);

  const handleClickExchange = () => {
    // 已绑定手机
    if (account?.mobile) {
      router.push(`/exchange?${queryString.stringify(router?.query)}`);
    } else {
      setIsPopupVisible(true);
    }
  };

  const handleClickCancel = () => {
    setIsPopupVisible(false);
  };

  const handleChangePhone = (value) => {
    setPhone(value);
  };

  const handleChangeVerifyCode = (value) => {
    setVerifyCode(value);
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

  // 发送短信
  const handleClickGetCaptcha = () => {
    const params = {
      operation_type: 1, // 操作类型 1 - 绑定手机
      mobile: phone,
    };

    const queryStr = queryString.stringify(router?.query);

    sendSms(queryStr, params)
      .then((res) => {
        if (res?.data?.err_code === 0) {
          setIsSending(true);
          startCountdown();
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

  // 绑定手机
  const handleClickConfirm = () => {
    const params = {
      verify_code: Number(verifyCode),
      mobile: phone,
    };

    const queryStr = queryString.stringify(router?.query);

    bindMobile(queryStr, params)
      .then((res) => {
        if (res?.data?.err_code === 0) {
          router.push(`/exchange?${queryString.stringify(router?.query)}`);
        } else {
          Toast.show({
            content: res?.data?.err_msg,
          });
        }
      })
      .catch((err) => {
        Toast.show({
          content: err?.response?.data?.err_msg,
        });
      });
  };

  const handleClickBalance = () => {
    router.push(`/balance_detail?${queryString.stringify(router?.query)}`);
  };

  const handleClickSettings = () => {
    router.push(`/settings?${queryString.stringify(router?.query)}`);
  };

  const gotoAgreement = (path) => {
    router.push(path);
  };

  const handleClickContactUs = () => {
    router.push("/customer_service");
  };

  const handleChangeIsAgree = (value) => {
    setIsAgree(value);
  };

  const handleClickRecord = () => {
    router.push(`/my_games?${queryString.stringify(router?.query)}`);
  };

  const onCopy = (text, result) => {
    console.log(text, result);

    if (result) {
      Toast.show({
        content: "已复制",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>个人中心</title>
        <meta name="description" content="个人中心" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar
        right={<Contact className={styles.contactIcon} />}
        backArrow={false}
      >
        个人中心
      </NavBar>
      <div className={styles.container}>
        <div className={styles.info}>
          <Image src={account?.avatar || userAvatar} />
          <div className={styles.detail}>
            <div className={styles.name}>{account?.nickname}</div>
            <div className={styles.userId}>
              <span>ID</span>
              <span>{account?.uid}</span>
              <CopyToClipboard text={account?.uid} onCopy={onCopy}>
                <Button className={styles.copy}>复制</Button>
              </CopyToClipboard>
            </div>
          </div>
        </div>

        <div className={styles.money}>
          <div className={styles.balance}>
            <div>
              <div className={styles.label}>当前余额</div>
              <div className={styles.amount}>{account?.balance || 0}</div>
            </div>
            <Button className={styles.exchange} onClick={handleClickExchange}>
              去兑换
            </Button>
          </div>

          <div className={styles.income}>
            <span className={styles.type}>
              <span className={styles.label}>今日收益</span>
              <span className={styles.amount}>
                {account?.today_reward || 0}
              </span>
            </span>

            <span className={styles.type}>
              <span className={styles.label}>累计收益</span>
              <span className={styles.amount}>
                {account?.total_reward || 0}
              </span>
            </span>
          </div>
        </div>

        <div className={styles.list}>
          <div className={styles.action} onClick={handleClickRecord}>
            <RecordIcon />
            <span className={styles.text}>参与记录</span>
            <RightArrow className={styles.rightArrow} />
          </div>

          <div className={styles.action} onClick={handleClickBalance}>
            <BalancedDetailIcon />
            <span className={styles.text}>余额明细</span>
            <RightArrow className={styles.rightArrow} />
          </div>

          <div className={styles.action} onClick={handleClickContactUs}>
            <ContactUsIcon />
            <span className={styles.text}>联系客服</span>
            <RightArrow className={styles.rightArrow} />
          </div>

          <div className={styles.action}>
            <SettingIcon />
            <span className={styles.text} onClick={handleClickSettings}>
              关于设置
            </span>
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
            <Input
              placeholder="输入验证码"
              onChange={handleChangeVerifyCode}
              clearable
            />
          </Form.Item>
          <Form.Item name="isAgree">
            <Radio block checked={isAgree} onChange={handleChangeIsAgree}>
              <div className={styles.agreeText}>
                我同意
                <span
                  onClick={() => {
                    gotoAgreement("/agreement/user");
                  }}
                >
                  《用户协议》
                </span>
                、
                <span
                  onClick={() => {
                    gotoAgreement("/agreement/privacyPolicy");
                  }}
                >
                  《隐私政策》
                </span>
                、
                <span
                  onClick={() => {
                    gotoAgreement("/agreement/gigEconomy");
                  }}
                >
                  《零工经济合作伙伴协议》
                </span>
              </div>
            </Radio>
          </Form.Item>
          <Form.Item dependencies={["phone", "captcha", "isAgree"]}>
            {({ getFieldsValue }) => {
              const { phone, captcha } = getFieldsValue();
              return (
                <div className={styles.btnWrapper}>
                  <Button
                    className={styles.confirmBtn}
                    block
                    disabled={
                      !(isPhone(phone) && captcha?.length >= 4 && isAgree)
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
      <MenuTabBar pageType={dashboard?.page_type} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await getAccount(queryString.stringify(context?.query));
  const dashboardRes = await getDashboard(
    queryString.stringify(context?.query)
  );

  return {
    props: {
      account: res?.data?.payload,
      dashboard: dashboardRes?.data?.payload,
    },
  };
}

export default User;
