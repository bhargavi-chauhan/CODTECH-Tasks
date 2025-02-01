import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import io from 'socket.io-client';
import ChatRoom from './components/ChatRoom';
import UserList from './components/UserList';
import JoinForm from './components/JoinForm';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  padding: 20px;
  background-color: transparent;
  gap: 20px;
`;

function App() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on('userList', (userList) => {
        setUsers(userList);
      });

      return () => {
        socket.off('message');
        socket.off('userList');
        socket.disconnect();
      };
    }
  }, [socket]);

  const handleJoin = (name) => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    setUsername(name);
    
    newSocket.emit('join', name);
  };

  const handleSendMessage = (message) => {
    if (socket) {
      socket.emit('message', message);
    }
  };

  if (!username) {
    return <JoinForm onJoin={handleJoin} />;
  }

  return (
    <AppContainer>
      <ChatRoom 
        messages={messages} 
        onSendMessage={handleSendMessage} 
        currentUser={username}
      />
      <UserList users={users} />
    </AppContainer>
  );
}

export default App; 