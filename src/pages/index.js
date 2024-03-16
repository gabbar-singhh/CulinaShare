import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";
import HeroSection from "@/components/Hero/HeroSection";
import Discover from "@/components/Discover/Discover";
import About from "@/components/About/About";
import CategorySection from "@/components/CategorySection/CategorySection";

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
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className={styles.main}>
        <NavigationBar />
        <div className={styles.container}>
          <HeroSection />
          <CategorySection/>
          <Discover />
        </div>
        <About />
      </main>
    </>
  );
}