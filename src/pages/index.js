import Head from "next/head";
import styles from "@/styles/Home.module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";
import HeroSection from "@/components/Hero/HeroSection";
import Discover from "@/components/Discover/Discover";
import Footer from "@/components/Footer/Footer";
import CategorySection from "@/components/CategorySection/CategorySection";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchFavourites } from "@/features/favourites/favouritesSlice";

export default function Home() {
  const { user, isLoading, error } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchFavourites(user.email));
    }
  }, [user]);
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
          <CategorySection />
          <Discover />
        </div>
        <Footer />
      </main>
    </>
  );
}
