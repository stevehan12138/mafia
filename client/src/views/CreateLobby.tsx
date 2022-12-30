import { useContext, useReducer, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { SocketContext } from "../context/socket";
import {
  Box,
  Center,
  Heading,
  Button,
  Collapse,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tag,
  TagLabel,
  Text,
  TagLeftIcon,
  Stack,
  Radio,
  RadioGroup,
  Grid,
  GridItem,
  TagCloseButton,
  Input,
} from "@chakra-ui/react";
import { GiWerewolf } from "react-icons/gi";
import { GoPerson } from "react-icons/go";

import RoleInfo from "./components/RoleInfo";

function CreateLobby() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const [villagers, setvillagers] = React.useState<String[]>([]);
  const [werewolves, setwerewolves] = React.useState<String[]>([]);
  const { isOpen, onToggle } = useDisclosure();
  const [werewolvesWinsAt, setWerewolvesWinsAt] = React.useState("all");
  const [isGameValid, setIsGameValid] = React.useState(false);
  const [badge, setBadge] = React.useState("noBadge");
  const [username, setUsername] = React.useState("");
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const usernameRef = useRef<string | null>();
  usernameRef.current = username;

  const handleAddRole = (role: string, team: string) => {
    if (team === "v") {
      let newvillagers = villagers;
      newvillagers.push(role);
      setvillagers(newvillagers.sort());
    } else {
      let newwerewolves = werewolves;
      newwerewolves.push(role);
      setwerewolves(newwerewolves.sort());
    }
    checkGameValidity();
    forceUpdate();
  };

  function handleRemoveRole(role: string, team: string) {
    if (team === "v") {
      let newvillagers = villagers;
      newvillagers.splice(newvillagers.findIndex((r) => r === role.toString()), 1);
      setvillagers(newvillagers.sort());
    } else {
      let newwerewolves = werewolves;
      newwerewolves.splice(newwerewolves.findIndex((r) => r === role.toString()), 1);
      setwerewolves(newwerewolves.sort());
    }
    forceUpdate();
  }

  function RoleButton(props: { role: string; team: string }) {
    return (
      <Button
        colorScheme={props.team === "v" ? "purple" : "red"}
        m="10px 5px"
        onClick={() => {
          handleAddRole(props.role, props.team);
        }}
      >
        {props.role}
      </Button>
    );
  }

  useEffect(() => {
    socket.on("gameCreated", (id) => {
      navigate(`/lobby/${id}/${usernameRef.current}`);
    });

    return () => {
      socket.off("gameCreated");
    };
  }, []);
  
  function checkGameValidity(tempUsername: string=username) {
    let villagerCount = villagers.filter((r) => r === "Villager").length;
    let godCount = villagers.length - villagerCount;
    if (villagers.length + werewolves.length >= 6
      && villagers.length + werewolves.length <= 15 
      && werewolves.length >= 1
      && villagers.length >= 4
      && tempUsername !== ""
      && villagerCount >= 1
      && godCount >= 1
    ) {
      setIsGameValid(true);
    } else {
      setIsGameValid(false);
    }
  }

  return (
    <Center
      bg="linear-gradient(20deg, rgba(255,255,255,1) 0%, rgba(105,73,143,1) 81%, rgba(65,38,99,1) 100%);"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        bg="white"
        w="700px"
        borderRadius="10px"
        p="20px"
        shadow="text-shadow: 2px 2px 4px #000000;"
      >
        <Heading size="xl" textAlign="center" fontWeight="bold" mb="20px">
          Create Game
        </Heading>
        <Heading size="lg" fontWeight="bold" mb="20px">
          Add Role
        </Heading>
        <Tabs variant="enclosed" mt="10px">
          <TabList>
            <Tab>Villager Team</Tab>
            <Tab>Werewolf Team</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RoleButton role="Villager" team="v" />
              <RoleButton role="Witch" team="v" />
              <RoleButton role="Hunter" team="v" />
              <RoleButton role="Idiot" team="v" />
              <RoleButton role="Seer" team="v" />
              <RoleButton role="Guard" team="v" />
            </TabPanel>
            <TabPanel>
              <RoleButton role="Werewolf" team="w" />
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem borderRight="1px solid white">
            <Heading size="sm" textAlign="center" mb="20px">
              Villages
            </Heading>
            {villagers.map((role, index) => {
              return (
                <Tag
                  size="lg"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="purple"
                  key={role + index.toString()}
                  m="3px"
                >
                  <TagLeftIcon as={GoPerson} />
                  <TagLabel>{role}</TagLabel>
                  <TagCloseButton
                    onClick={() => {handleRemoveRole(role.toString(), "v"); checkGameValidity()}}
                  />
                </Tag>
              );
            })}
          </GridItem>
          <GridItem>
            <Heading size="sm" textAlign="center" mb="20px">
              Werewolfs
            </Heading>
            {werewolves.map((role, index) => {
              return (
                <Tag
                  size="lg"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="red"
                  key={role + index.toString()}
                  m="3px"
                >
                  <TagLeftIcon as={GiWerewolf} />
                  <TagLabel>{role}</TagLabel>
                  <TagCloseButton
                    onClick={() => {handleRemoveRole(role.toString(), "w"); checkGameValidity()}}
                  />
                </Tag>
              );
            })}
          </GridItem>
        </Grid>
        <Text mt="20px" fontSize="sm">
          Players: {villagers.length + werewolves.length}
        </Text>
        <Text mt="10px" fontSize="l">
          Werewolves win when:
        </Text>
        <RadioGroup onChange={setWerewolvesWinsAt} value={werewolvesWinsAt}>
          <Stack direction="row">
            <Radio value="all">Villagers are no longer the majority</Radio>
            <Radio value="side">
              All ability villagers or all plain villagers die
            </Radio>
          </Stack>
        </RadioGroup>

        <RadioGroup onChange={setBadge} value={badge} mt="10px">
          <Stack direction="row">
            <Radio value="badge">Badge</Radio>
            <Radio value="noBadge">No badge</Radio>
          </Stack>
        </RadioGroup>

        <Input
          placeholder="Your Name"
          size="md"
          mt="10px"
          value={username}
          onChange={(value) => {
            setUsername(value.target.value);
            checkGameValidity(value.target.value);
          }}
        />

        <Button
          mt="20px"
          size="sm"
          onClick={() => {
            onToggle();
          }}
        >
          Show/Hide Role Info
        </Button>
        <Button
          colorScheme="teal"
          mt="20px"
          w="100%"
          size="lg"
          onClick={() => {
            socket.emit("createGame", {
              villagers,
              werewolves,
              werewolvesWinsAt,
              badge,
            });
          }}
          isDisabled={!isGameValid}
        >
          Create
        </Button>
      </Box>
      <Collapse animateOpacity in={isOpen}>
        <RoleInfo />
      </Collapse>
    </Center>
  );
}

export default CreateLobby;
