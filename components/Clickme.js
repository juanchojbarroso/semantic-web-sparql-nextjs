import { Button, useColorModeValue } from "@chakra-ui/react";

export default function ClickMe({ text, onClick, ...props }) {
  return (
    <Button
      {...props}
      px={8}
      bg={useColorModeValue("#151f21", "gray.900")}
      color={"white"}
      rounded={"md"}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
