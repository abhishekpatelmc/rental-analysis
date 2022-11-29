import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Rent Analyser</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <Link className="text-blue-700" href="/form/forms">
            Forms
          </Link>
        </p>
        <p className={styles.description}>
          Get started by editing{" "}
          <Link className="text-blue-700" href="/RentPredict/rentPredict">
            Rent Predict
          </Link>
        </p>
      </main>
    </div>
  );
}
