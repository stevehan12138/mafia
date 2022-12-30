import { Socket, Server } from 'socket.io';
import { createServer } from 'http';
import express, { Request, Response } from 'express';
import Lobbies from './tools/lobbies';

const app = express();
const http = createServer(app);
const io = new Server(http, { cors: { origin: '*' } });

let lobbies = new Lobbies();

app.get('/', function(req: Request, res: Response) {
	//development only
	res.json(lobbies.getLobbies);
});

io.on('connection', function(socket: Socket) {
	const userID = socket.handshake.query.id as string;
	console.log('A user connected: ' + userID);

	socket.on('disconnect', function () {
		console.log('A user disconnected');
	});

	socket.on('createGame', function( data: { villagers: string[], werewolves: string[], badge: string, werewolvesWinsAt: string}) {
		let lobbyID = lobbies.createLobby(data.villagers, data.werewolves, data.badge, data.werewolvesWinsAt);
		socket.emit('gameCreated', lobbyID);
		console.log('created game ' + lobbyID);
	})

	socket.on('join', function( data: {lobbyID: string, username: string}) {
		let lobbyData = lobbies.addJoinedPlayer(data.lobbyID, data.username, socket.id, userID);
		if (lobbyData) {
			socket.join(data.lobbyID);
			if(lobbyData.role === 'Werewolf') {
				socket.join(data.lobbyID + '-Werewolf');
			}
			if(lobbyData.isNew) {
				socket.to(data.lobbyID).emit('newPlayer', { 
					username: data.username, 
					userID: userID, 
					isAlive: true,
					roleID: lobbyData.roleID,
				});
			}
			socket.emit('joined', lobbies.getLobbyDataForPlayer(data.lobbyID, userID)); 
		} else {
			socket.emit('joinFailed', 'Lobby not found or username already exists');
			console.log('user ' + userID + ' tried to join lobby ' + data.lobbyID + ' but it does not exist');
		}
	});

	socket.on('chat', function(data: {lobbyID: string, username: string, message: string}) {
		console.log('chat message from ' + data.username + ': ' + data.message);
		socket.to(data.lobbyID).emit('receiveChat', { username: data.username, message: data.message });
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});