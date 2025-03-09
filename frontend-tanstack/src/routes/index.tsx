import { FileRoute, Link, useRouter } from '@tanstack/react-router';
import { api } from '../lib/axios';
import { User } from '../types/user';

interface IndexLoaderData {
  users: User[];
}

export const Route = new FileRoute('/').createRoute({
  loader: async (): Promise<IndexLoaderData> => {
    const { data } = await api.get<User[]>('/user');
    return { users: data };
  },
  component: () => {
    const { users } = Route.useLoaderData();
    const router = useRouter();

    const deleteUser = async (id: number) => {
      try {
        await api.delete(`/user/${id}`);
        // Invalidate and refetch the route data
        await router.invalidate();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    return (
      <div className="container mt-5">
        <h2>Quản lý người dùng</h2>
        <div className="d-flex justify-content-end mb-3">
          <Link to="/users/add" className="btn btn-primary">
            Thêm người dùng
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, index: number) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="btn-group">
                      <Link
                        to="/users/$id/view"
                        params={{ id: user.id.toString() }}
                        className="btn btn-info btn-sm"
                      >
                        View
                      </Link>
                      <Link
                        to="/users/$id/edit"
                        params={{ id: user.id.toString() }}
                        className="btn btn-warning btn-sm mx-1"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
});
