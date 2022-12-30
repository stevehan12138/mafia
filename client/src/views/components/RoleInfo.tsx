import { Box, Heading, Text } from "@chakra-ui/react";

function RoleInfo() {
  
  function RoleText(props: { role: string, description: string }) {
    return (
      <>
        <Heading size="md" fontWeight="bold" mb="20px">
          {props.role}
        </Heading>
        <Text mb="20px">
          {props.description}
        </Text>
      </>
    );
  }

  return (
    <Box
      m='auto 40px'
      bg="white"
      w="500px"
      h="700px"
      overflowY='scroll'
      borderRadius="10px"
      p="20px"
      shadow="text-shadow: 2px 2px 4px #000000;"
      css={{
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#8D86C9',
          borderRadius: '24px',
        },
      }}
    >
      <Box>
        <Heading size="lg" textAlign="center" fontWeight="bold" mb="20px">
          Villager Team
        </Heading>
        <RoleText role="Villager" description="Villagers don't have special abilities. They sleep through the whole night and they can vote during the day."/>
        <RoleText role='Witch' description="The witch has one cure and one poison. 
          The witch will know who got killed by the werewolfs if she still have the cure, and she can choose to save that person with the cure. 
          She can also use the poison to kill one person during the night. She can only use one potion at one night.
          She can only save herself in the first night." />
        <RoleText role='Hunter' description="The hunter has the ability to shoot and kill someone when he dies. 
          If the hunter is poisoned by the witch, he cannot use his ability." />
        <RoleText role="Idiot" description="The idiot does not wake up during the night. 
          When the idiot gets voted out, he can reveal his identity and avoid being exilled. 
          However, after he reveals his role, he is seen as dead and counts as one less player in the villager team." />
        <RoleText role="Seer" description="The seer can see which team is one player on during each night." />
        <RoleText role="Guard" description="The guard can choose to guard one person during the night. If the person is the target of the werewolfs, he will not die.
          If both the witch and the guard saved the same person, the person will still die." />
      </Box>
      <Heading size="lg" textAlign="center" fontWeight="bold" mb="20px">
        Werewolf Team
      </Heading>
      <RoleText role="Werewolf" description="The werewolfs can kill one person as a group during the night. They can also choose to kill no one or one of their own." />
    </Box>
  );
}

export default RoleInfo;
