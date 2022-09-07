import Link from "next/link";
import {
  Box,
  Flex,
  Button,
  Text,
  useColorModeValue,
  Stack,
  useColorMode,
  Spacer,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={70} alignItems="center" gap="4">
          <Link href="/">
            <Text
              fontSize="xl"
              fontWeight="extrabold"
            >
              HOME
            </Text>
          </Link>
          <Link href="/museums">
            <Text
              fontSize="xl"
              fontWeight="extrabold"
            >
              MUSEOS
            </Text>
          </Link>
          <Spacer />
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
