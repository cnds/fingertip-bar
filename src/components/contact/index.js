import ContactIcon from "@/public/contact.svg";

const Contact = () => {
  const handleClickContact = () => {
    window.open(
      "https://yzf.qq.com/xv/web/static/chat/index.html?sign=37ef9b97d27354c7714d9ce849e1b76461665a28638153f3870fab90fcd400b714017e14abd8e4d6b2cd5f432111bb53880c16",
      "_self"
    );
  };

  return <ContactIcon onClick={handleClickContact} />;
};

export default Contact;
