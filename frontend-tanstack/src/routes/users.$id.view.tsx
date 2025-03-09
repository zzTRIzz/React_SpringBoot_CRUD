import { FileRoute, Link, useNavigate } from '@tanstack/react-router';
import { api } from '../lib/axios';
import { User } from '../types/user';

interface ViewUserLoaderData {
  user?: User;
  error?: string;
}

export const Route = new FileRoute('/users/$id/view').createRoute({
  loader: async ({ params: { id } }): Promise<ViewUserLoaderData> => {
    try {
      const { data } = await api.get<User>(`/user/${id}`);
      return { user: data };
    } catch (error) {
      console.error('Error loading user:', error);
      return { error: 'Failed to load user details' };
    }
  },
  component: () => {
    const { user, error } = Route.useLoaderData();
    const navigate = useNavigate();

    if (error) {
      return (
        <div className="container mt-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate({ to: '/' })}
          >
            Quay lại
          </button>
        </div>
      );
    }

    if (!user) {
      return (
        <div className="container mt-5">
          <div className="alert alert-warning" role="alert">
            Không tìm thấy người dùng
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate({ to: '/' })}
          >
            Quay lại
          </button>
        </div>
      );
    }

    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Chi tiết người dùng</h2>
          <Link 
            to="/users/$id/edit"
            params={{ id: user.id.toString() }}
            className="btn btn-warning"
          >
            Chỉnh sửa
          </Link>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label fw-bold">Username:</label>
              <p className="form-control">{user.username}</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Tên:</label>
              <p className="form-control">{user.name}</p>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email:</label>
              <p className="form-control">{user.email}</p>
            </div>

            <div className="d-flex gap-2">
              <button 
                className="btn btn-primary" 
                onClick={() => navigate({ to: '/' })}
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
