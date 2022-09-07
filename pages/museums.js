import React, { useState, useEffect } from "react";
import useSWR from "swr";
import {
  Select,
  Wrap,
  WrapItem,
  Container,
  Center,
  Divider,
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import Card from "../components/Card";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const cities = [
  { code: "Q2807", name: "Madrid" },
  { code: "Q1492", name: "Barcelona" },
  { code: "Q8717", name: "Sevilla" },
  { code: "Q40846", name: "Tenerife" },
  { code: "Q8818", name: "Valencia" },
];

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Museums() {
  const [cityCode, setCityCode] = useState("Q2807");
  const { data: museums, error } = useSWR(
    `http://localhost:3000/api/museums?offset=3&limit=40&city=${cityCode}`,
    fetcher
  );

  useEffect(() => {
    // The counter changed!
  }, [cityCode]);

  if (error) return <div>failed to load</div>;

  return (
    <>
      <Navbar />
      <Center height="50px">
        <Divider orientation="vertical" />
      </Center>
      <Container maxW="xl" centerContent>
        <Select
          placeholder="Select option"
          size="lg"
          onChange={(city) => setCityCode(city.target.value)}
          value={cityCode}
        >
          {cities.map((city, index) => (
            <option key={index} value={city.code}>
              {city.name}
            </option>
          ))}
        </Select>
      </Container>
      <Center height="50px">
        <Divider orientation="vertical" />
      </Center>
      {museums ? (
        <Container maxW="7xl" centerContent>
          <Wrap spacing="30px" justify="center">
            {museums?.data.map((item, index) => {
              return (
                <WrapItem key={index}>
                  <Card
                    name={item?.name?.value}
                    pic={item?.pic?.value}
                    link={item?.link?.value}
                    lat={Number(item?.lat?.value)}
                    lng={Number(item?.lon?.value)}
                  />
                </WrapItem>
              );
            })}
          </Wrap>
        </Container>
      ) : (
        <Container maxW="4xl">
          <Stack>
            <Skeleton height="200px" />
            <Skeleton height="200px" />
            <Skeleton height="200px" />
          </Stack>
        </Container>
      )}
      <Center height="50px">
        <Divider orientation="vertical" />
      </Center>
      <Footer />
    </>
  );
}
