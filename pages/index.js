import Head from "next/head";
import { Button } from "antd-mobile";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>指尖网咖</title>
        <meta name="description" content="指尖网咖" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Button block className={styles.btn}>指尖网咖</Button>
      </main>
    </div>
  );
}
