import io from 'socket.io-client';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

if (!sessionStorage.getItem('id')) {
    sessionStorage.setItem('id', uuidv4());
}

export const socket = io('http://localhost:3000', {
    query: {
        id: sessionStorage.getItem('id')
    }
});

export const SocketContext = React.createContext(socket);