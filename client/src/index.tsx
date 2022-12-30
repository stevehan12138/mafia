import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SelectPage from './views/SelectPage';
import CreateLobby from './views/CreateLobby';
import Lobby from './views/Lobby';
import reportWebVitals from './reportWebVitals';
import { SocketContext, socket } from './context/socket';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route,} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SelectPage />} />
          <Route path="/create" element={<CreateLobby />} />
          <Route path="/lobby/:id/:username" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </SocketContext.Provider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
