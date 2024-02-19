import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";
import HeroSection from "@/components/Hero/HeroSection";
import Discover from "@/components/Discover/Discover";

export default function Home() {
  return (
    <>
      <Head>
        <title>CulinaShare - Discover. Share. Save Recipes</title>
        <meta
          name="description"
          content="CulinaShare - Where Every Recipe Tells a Story!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* google font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
      </Head>
      <main className={styles.main}>
        <NavigationBar />
        <div className={styles.container}>
        <HeroSection/>
        <Discover/>
        </div>
      </main>
    </>
  );
}
