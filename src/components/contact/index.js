import ContactIcon from "@/public/contact.svg";
import { useRouter } from "next/router";

const Contact = (props) => {
  const router = useRouter();

  const handleClickContact = () => {
    router.push("/customer_service");
  };

  return <ContactIcon onClick={handleClickContact} {...props} />;
};

export default Contact;
