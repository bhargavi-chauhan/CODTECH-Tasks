import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  margin-right: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

const MessageInput = styled.div`
  display: flex;
  padding: 20px;
  border-top: 1px solid #eee;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  background: ${props => props.isSystem ? '#f8f9fa' : '#e9ecef'};
  color: ${props => props.isSystem ? '#6c757d' : '#212529'};
`;

function ChatRoom({ messages, onSendMessage, currentUser }) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <ChatContainer>
      <MessageList>
        {messages.map((message, index) => (
          <Message 
            key={index}
            isSystem={message.type === 'system'}
          >
            {message.type === 'system' ? (
              <em>{message.content}</em>
            ) : (
              <>
                <strong>{message.user}: </strong>
                {message.content}
              </>
            )}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessageList>
      <MessageInput>
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%' }}>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button type="submit">Send</Button>
        </form>
      </MessageInput>
    </ChatContainer>
  );
}

export default ChatRoom; 