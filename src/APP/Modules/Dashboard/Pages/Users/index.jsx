
import { Outlet } from 'react-router-dom';

function Users() {
  return (
    <div>
      <h1>Users Screen</h1>
      <Outlet />
    </div>
  );
}

export default Users;
