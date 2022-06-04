import { useState } from "react";
import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import { NavBar, Radio, Button, Popup, Form, Input } from "antd-mobile";
import NoticeIcon from "@/public/notice_icon.svg";
import AlipayIcon from "@/public/alipay_icon.svg";
import WechatIcon from "@/public/wechat_icon.svg";
import styles from "./index.module.scss";

const { useForm } = Form;

const Exchange = () => {
  const router = useRouter();
  const [form] = useForm();
  const [selectedAmount, setSelectedAmount] = useState(0.5);
  const [selectedWay, setSelectedWay] = useState("alipay");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const onBack = () => {
    router.push("/user");
  };

  const handleSelectAmount = (amount) => {
    setSelectedAmount(amount);
  };

  const handleChangeWay = (way) => {
    setSelectedWay(way);
  };

  const handleClickCancel = () => {
    setIsPopupVisible(false);
  };

  const handleClickExchange = () => {
    setIsPopupVisible(true);
  };

  const handleClickConfirm = () => {
    router.push('/exchange/success');
  };

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>申请兑换</title>
        <meta name="description" content="申请兑换" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar onBack={onBack}>申请兑换</NavBar>

      <div className={styles.container}>
        <div className={styles.notice}>
          <NoticeIcon className={styles.noticeIcon} />
          <div>
            今日汇率1:1，每日一次兑换微信/支付宝；
            工作日审核约24小时，节假日约72小时，请耐心等待。
          </div>
        </div>

        <div className={styles.convertible}>
          <div className={styles.amount}>10.0</div>
          <div className={styles.label}>可兑换金额</div>
        </div>

        <div className={styles.ways}>
          <div className={styles.title}>选择兑换方式</div>
          <Radio.Group onChange={handleChangeWay} defaultValue={selectedWay}>
            <div className={styles.way}>
              <AlipayIcon />
              <div className={styles.info}>
                <span className={styles.type}>支付宝</span>
                <span className={styles.account}>
                  账号：<span>188****8888</span>（隐码）
                </span>
              </div>
              <Radio value="alipay" />
            </div>

            <div className={styles.way}>
              <WechatIcon />
              <div className={styles.info}>
                <span className={styles.type}>微信</span>
                <span className={styles.account}>
                  账号：<span>188****8888</span>（隐码）
                </span>
              </div>
              <Radio value="wechat" />
            </div>
          </Radio.Group>
        </div>

        <div className={styles.optionalAmount}>
          <div className={styles.title}>选择兑换金额</div>
          <div className={styles.amountWrapper}>
            <For
              of={[0.5, 10, 100, 500, 800, 1000]}
              each="amount"
              index="index"
            >
              <span
                key={index}
                className={classNames(styles.amount, {
                  [styles.selected]: selectedAmount === amount,
                })}
                onClick={() => handleSelectAmount(amount)}
              >
                <If condition={selectedAmount === amount}>
                  <span className={styles.speedTag}>极速</span>
                </If>
                {amount}
              </span>
            </For>
          </div>
        </div>
      </div>

      <div className={styles.bottomWrapper}>
        <Button
          className={styles.confirmBtn}
          block
          onClick={handleClickExchange}
        >
          确认兑换
        </Button>
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
        bodyClassName={styles.receivePopup}
      >
        <div className={styles.title}>
          <span className={styles.cancelBtn} onClick={handleClickCancel}>
            取消
          </span>
          确认收款账号
        </div>
        <div className={styles.content}>
          根据国家有关政策规定，为了您能准确收到款项，请确保三项实名信息一致。
        </div>
        <Form form={form}>
          <Form.Item name="name">
            <Input placeholder="请输入姓名" clearable />
          </Form.Item>
          <Form.Item name="idCard">
            <Input placeholder="请输入身份证号" clearable />
          </Form.Item>
          <Form.Item name="alipay">
            <Input placeholder="请输入支付宝账号" clearable />
          </Form.Item>
          <Form.Item dependencies={["name", "idCard", "alipay"]}>
            {({ getFieldsValue }) => {
              const { name, idCard, alipay } = getFieldsValue();
              return (
                <div className={styles.btnWrapper}>
                  <Button
                    className={styles.confirmBtn}
                    block
                    disabled={!name || !idCard || !alipay}
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
    </div>
  );
};

export default Exchange;
