import styled from '@emotion/styled';

const UserListContainer = styled.div`
  width: 200px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const UserItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

function UserList({ users }) {
  return (
    <UserListContainer>
      <h3>Online Users</h3>
      {users.map((user) => (
        <UserItem key={user.id}>
          {user.username}
        </UserItem>
      ))}
    </UserListContainer>
  );
}

export default UserList; 