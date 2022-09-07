import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Flex,
  Text,
  Stack,
  Image,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import SimpleMap from "../components/Map";

export default function Card({ pic, name, link, lat, lng }) {
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        minH={"480px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${pic})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={pic}
          />
        </Box>
        <Stack pt={10} mb={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            <Link href={link} isExternal>
              Sitio web
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Text>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            <Tooltip
              label={name}
              aria-label="A tooltip"
              bg="gray.300"
              color="black"
            >
              <Text fontSize={"2xl"} as="b">
                {name}
              </Text>
            </Tooltip>
          </Box>
        </Stack>
        <Flex width="100%" bg="gray.100" justify="end" align="end">
          <SimpleMap
            locations={[]}
            center={{
              lat: lat,
              lng: lng,
            }}
            zoom={14}
          />
        </Flex>
      </Box>
    </Center>
  );
}
