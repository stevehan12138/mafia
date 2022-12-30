import { useState } from "react";
import { Box, Heading, Grid, GridItem, Center, Button, PinInput, PinInputField, Input } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

function SelectPage() {
  const navigate = useNavigate();

  const [pin, setPin] = useState("");
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(false);

  const verifyValidity = (tempUsername: string = username, tempPin: string = pin) => {
    if (tempPin.length === 4 && tempUsername.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <Box
      bg="linear-gradient(20deg, rgba(255,255,255,1) 0%, rgba(105,73,143,1) 81%, rgba(65,38,99,1) 100%);"
      h="100%"
      display='flex' justifyContent='center' alignItems='center'
    >
      <Grid templateColumns="repeat(2, 1fr)" color="white" >
        <GridItem borderRight='1px solid white' pr='80px'>
          <Heading size="xl" textAlign="center" fontWeight="bold" mb='20px' >Join Game</Heading>
          <Center>
          <PinInput type='number' size='lg' value={pin} onChange={(value: string) => { setPin(value); verifyValidity(username, value) }} >
            <PinInputField mx='5px' />
            <PinInputField mx='5px' />
            <PinInputField mx='5px' />
            <PinInputField mx='5px' />
          </PinInput>
          </Center>
          <Input value={username} variant='filled' placeholder='your name' onChange={(event) => { setUsername(event.target.value); verifyValidity(event.target.value, pin) }} mt='20px' />
          <Button colorScheme="teal" mt='20px' w='100%' size='lg' isDisabled={!isValid} onClick={() => { navigate('/lobby/' + pin + '/' + username) }} >Join</Button>
        </GridItem>
        <GridItem pl='80px'>
            <Heading size="xl" textAlign="center" fontWeight="bold" mt='50px' >Create Game</Heading>
            <Button colorScheme="teal" mt='20px' w='100%' size='lg' onClick={() => { navigate('/create') }} >Create</Button>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default SelectPage;
