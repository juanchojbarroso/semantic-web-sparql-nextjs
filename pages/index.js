import React from "react";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import { getRandomIntInclusive } from "../shared/random";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home({ museums }) {
  const { data } = museums;
  return (
    <>
      <Navbar />
      <Hero />
      <Carousel museums={data} />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `http://localhost:3000/api/museums?offset=${getRandomIntInclusive(
      0,
      15
    )}&limit=3&city=Q2807`
  );
  const data = await res.json();
  return { props: { museums: data } };
}
