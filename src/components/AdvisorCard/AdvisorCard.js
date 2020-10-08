import React from "react";
import {
  Stack,
  Image,
  Text,
  Link,
  Icon,
  Flex,
  Stat,
  StatLabel,
  StatHelpText,
} from "@chakra-ui/core";

const OFFLINE = "Offline";
const ONLINE = "Online";
const ONLINE_COLOR = "#3b0";
const OFFLINE_COLOR = "#a00";
const ONLINE_STATUS = "online";

const AdvisorCard = ({ advisor }) => {
  const isOnline = advisor.status === ONLINE_STATUS;
  return (
    <Stack
      spacing="2"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="gray.200"
      m={8}
      shadow="lg"
      roundedTop="lg"
      transition="all 100ms ease-in-out"
      _hover={{
        shadow: "xl",
      }}
    >
      <Stack pt="2" pb="8" px="4">
        <Image
          rounded="full"
          size="100px"
          src={advisor.avatar}
          alt={advisor.name}
          className="test-image"
        />
        <Text p="0" m="0" fontWeight="bold" fontSize="4xl">
          {advisor.name}
        </Text>
        <Text
          m="0"
          p="0"
          fontSize="md"
          fontWeight="light"
          className="test-title"
        >
          {advisor.name} {advisor.title}
        </Text>
        <Stat>
          <StatHelpText className="test-status">
            <Icon
              name="phone"
              color={isOnline ? ONLINE_COLOR : OFFLINE_COLOR}
            />{" "}
            {isOnline ? ONLINE : OFFLINE}
          </StatHelpText>
          <StatLabel fontFamily="serif">
            Reviews: <Icon name="star" color="teal.500" />{" "}
            {advisor.reviewsCount}
          </StatLabel>
          <StatLabel fontFamily="serif">
            Languages: {advisor.languages.join(", ")}
          </StatLabel>
        </Stat>
        <Text color="gray.600">{advisor.title}</Text>
        <Flex justifyContent="flex-end">
          <Link pt="4">
            Contact {advisor.name}
            <Icon name="chevron-right" />
          </Link>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default AdvisorCard;
