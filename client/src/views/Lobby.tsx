import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState, createRef } from "react";
import { SocketContext } from "../context/socket";
import { 
    Box,
    Center,
    Heading,
    CircularProgress,
    Grid,
    GridItem,
    SimpleGrid,
    Avatar, 
    AvatarBadge,
    Textarea,
    Text,
    Input,
} from "@chakra-ui/react";
import RuleBook from "./components/RuleBook";

interface GameData {
    lobbyID: string;
    werewolvesWinsAt: string;
    badge: string;
    playerCount: number;
    totalPlayers: number;
    players: {
        username: string;
        userID: string;
        isAlive: boolean;
        role? : string;
        roleID: number;
    }[];
    username: string;
    role: string;
    time: string;
    dayNum: number,
}

interface ChatMessage {
    username: string;
    message: string;
}

function Lobby() {
    const navigate = useNavigate();
    const socket = useContext(SocketContext);
    const [gameData, setGameData] = useState({} as GameData);
    const [allChat, setAllChat] = useState([] as ChatMessage[]);
    let { id, username } = useParams();
    const messagesEndRef = createRef<HTMLDivElement>();
    
    useEffect(() => {
        socket.emit('join', { 
            lobbyID: id, 
            username: username,
        });

        socket.on('joinFailed', () => {
            navigate('/');
        });

        socket.on('joined', (data) => {
            setGameData(data);
        });

        socket.on('newPlayer', (data: { username: string, userID: string, isAlive: boolean, roleID: number } ) => {
            setGameData(prev => {
                let newGameData = { ...prev };
                newGameData.players.push(data);
                newGameData.playerCount++;
                return newGameData;
            });
        })

        socket.on('receiveChat', (data: { username: string, message: string }) => {
            setAllChat(prev => {
                return [...prev, data];
            });
        })


        return () => {
            socket.off('joinFailed');
            socket.off('joined');
            socket.off('newPlayer');
            socket.off('receiveChat');
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom()
    }, [allChat]);

    return (
        <Box
            bg="linear-gradient(20deg, rgba(255,255,255,1) 0%, rgba(105,73,143,1) 81%, rgba(65,38,99,1) 100%);"
            h="100%"
            display='flex' flexFlow='column'
            overflow='hidden'
        >
            <Box flex='1 1 auto'>
                <Grid templateColumns="repeat(24, 1fr)" w='80%' m='0 auto' h='100%' alignItems='center'>
                    <GridItem colSpan={7} bg='white' w='100%' m='0 auto' h='90%' borderRadius='7px' display='flex' flexFlow='column'>
                        <SimpleGrid columns={3} spacing={2} w='90%' m='15px auto' flex='0 1 auto'>
                            {gameData.players ? gameData.players.map((player, index) => {
                                return (
                                    <Box key={index} h='110px' bg='#E6EFE9' w='90%' borderRadius='7px'>
                                        <Text textAlign='center' color={player.role === 'Werewolf' ? 'red' : player.role ? 'green' : 'gray'} >{player.role ? player.role : 'Unknown'}</Text>
                                        <Center mt='5px'>
                                            <Avatar name={player.roleID.toString()} bg={player.username === username ? '#805E73' : '#3C6997 '} size='md'>
                                                <AvatarBadge borderColor='white' bg={ player.isAlive ? 'green.500' : 'tomato'} boxSize='1em'/>
                                            </Avatar>
                                        </Center>
                                        <Text fontSize='md' textAlign='center' color={ player.isAlive ? 'black' : 'gray'}>{player.username}</Text>
                                    </Box>
                                )
                            }) : <CircularProgress isIndeterminate color='red' />}
                        </SimpleGrid>
                        <Box border='1px solid #C8C6D7' borderRadius='7px' w='90%' m='15px auto' h='100px' bg='white' flex='1 1 auto' display='flex' flexFlow='column'>
                            <Box w='100%' flex='1 1 auto' sx={{overflowY: 'scroll'}} css={{
                                '&::-webkit-scrollbar': {
                                width: '4px',
                                },
                                '&::-webkit-scrollbar-track': {
                                width: '6px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                background: '#70587C',
                                borderRadius: '24px',
                                },
                            }}>
                                <Box w='90%' m='10px auto' h='100%'>
                                    {allChat.map((chat, index) => {
                                        return (
                                            <Box key={index} color='#243B4A'>
                                                <Text fontSize='12px' mb='-7px' color='#87BCDE'>{chat.username}</Text>
                                                <Text fontSize='20px'>{chat.message}</Text>
                                            </Box>
                                        )
                                    })}
                                    <Box float="left" ref={messagesEndRef} />
                                </Box>
                            </Box>
                            <Input placeholder='All Chat' borderBottom='none' borderLeft='none' borderRight='none' w='100%' minHeight='40px' flex='0 1 auto' onKeyDown={e => {
                                let target = e.target as HTMLInputElement;
                                let value = target.value;
                                if(e.key === 'Enter' && value.length > 0) {

                                    socket.emit('chat', {
                                        lobbyID: id,
                                        username: username,
                                        message: value,
                                    });
                                    setAllChat(prev => {
                                        let newChat = [...prev];
                                        newChat.push({
                                            username: username as string,
                                            message: value,
                                        });
                                        return newChat;
                                    });
                                    target.value = '';
                                } 
                            }}/>
                        </Box>
                    </GridItem>
                    <GridItem colSpan={17} bg='white' width='90%' m='0 auto' h='90%' borderRadius='7px'>
                        <Box float='right' m='10px'>
                            <RuleBook />
                        </Box>
                        <Box bg='#38285c' w='90%' m='0 auto' h='300px' borderRadius='9px' mt='50px'></Box>
                    </GridItem>
                </Grid>
            </Box>
            <Center flex='0 1 auto' bg='white' h='60px'>
                <Heading size="md" mr='5px'>Waiting for the game to start({ gameData.playerCount }/{ gameData.totalPlayers })</Heading>
                <CircularProgress isIndeterminate size='30px' color='green.300' />
            </Center>
        </Box>
    )
}

export default Lobby;