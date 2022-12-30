import { shuffle } from './utils';

interface Lobby {
	id: string;
	roles: string[];
	players: Player[];
	werewolvesWinsAt: string;
	badge: string;
	isStarted: boolean;
	dayNum: number;
	time: string;
	playerCount: number;
	totalPlayers: number;
}

interface Player {
	username: string;
	userID: string;
	connectionID: string;
	role: string;
	isAlive: boolean;
	roleID: string;
}

interface SimplePlayer {
    username: string;
    userID: string;
    isAlive: boolean;
    roleID: string;
}

export default class Lobbies {
    lobbies: Map<string, Lobby>;

    constructor() {
        this.lobbies = new Map<string, Lobby>();
    }

    createLobby(villagers: string[], werewolves: string[], badge: string, werewolvesWinsAt: string): string {
        let lobby = { 
			id: this.generateID(),
			players: [],
			roles: shuffle(villagers.concat(werewolves)),
			werewolvesWinsAt: werewolvesWinsAt, 
			badge: badge,
			isStarted: false,
			dayNum: 0,
			time: 'day',
			playerCount: 0,
			totalPlayers: villagers.length + werewolves.length
		};
        this.lobbies.set(lobby.id, lobby);
        return lobby.id;
    }

    //maybe change this o uuid in the future
    generateID(): string {
        let id: string;
        do {
            id = Math.floor(1000 + Math.random() * 9000).toString();
        } while (this.lobbies.has(id));
        return id;
    }

    getLobby(id: string): Lobby | false {
        return this.lobbies.get(id) || false;
    }

    getLobbyDataForPlayer(lobbyID: string, userID: string) {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            return {
                ...lobby,
                players: lobby.players.map(player => <SimplePlayer> {
                    username: player.username,
                    userID: player.userID,
                    isAlive: player.isAlive,
                    roleID: player.roleID,
                    role: player.userID === userID ? player.role : undefined
                })
            }
        } else {
            return false;
        }
    }

    getLobbies(): Lobby[] {
        return Array.from(this.lobbies.values());
    }

    addJoinedPlayer(lobbyID: string, username: string, connectionID: string, userID: string) {
        let lobby = this.lobbies.get(lobbyID);
        if (lobby) {
            //if username already exists
            if (lobby.players.find(player => player.username === username && player.userID !== userID)) {
                return false;
            }
            //if the player is already in the lobby
            let isNew = !lobby.players.some(player => player.userID === userID);
            if(isNew) {
                lobby.playerCount++;
                lobby.players.push( <Player> {
                    username: username,
					userID: userID,
					connectionID: connectionID,
					role: lobby.roles.pop() as string,
					isAlive: true,
					roleID: lobby.playerCount.toString(),
                });
                console.log('added player' + userID + 'to lobby');
            } else {
                //reset connectionID
				for(let i=0;i<lobby.players.length;i++) {
					if(lobby.players[i].userID === userID) {
						lobby.players[i].connectionID = connectionID;
						break;
					}
				}
                console.log('player ' + userID + ' already in lobby');
            }
            this.lobbies.set(lobbyID, lobby);
            let currentPlayer = lobby.players.find(player => player.userID === userID) as Player;
            return {role: currentPlayer.role, isNew: isNew, roleID: currentPlayer.roleID};
        } else {
            return false;
        }
    }
}
