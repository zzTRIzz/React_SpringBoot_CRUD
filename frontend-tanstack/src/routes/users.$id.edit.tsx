import { FileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../lib/axios';
import { User, UserFormData } from '../types/user';

interface EditUserLoaderData {
  user?: User;
  error?: string;
}

const userSchema = z.object({
  username: z.string().min(3, 'Username phải có ít nhất 3 ký tự'),
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
});

export const Route = new FileRoute('/users/$id/edit').createRoute({
  loader: async ({ params: { id } }): Promise<EditUserLoaderData> => {
    try {
      const { data } = await api.get<User>(`/user/${id}`);
      return { user: data };
    } catch (error) {
      console.error('Error loading user:', error);
      return { error: 'Failed to load user details' };
    }
  },
  component: () => {
    const navigate = useNavigate();
    const router = useRouter();
    const { user, error } = Route.useLoaderData();

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UserFormData>({
      resolver: zodResolver(userSchema),
      defaultValues: user ? {
        username: user.username,
        name: user.name,
        email: user.email,
      } : undefined,
    });

    const onSubmit = async (data: UserFormData) => {
      if (!user) return;
      
      try {
        await api.put(`/user/${user.id}`, data);
        await router.invalidate();
        navigate({ to: '/' });
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };

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
        <h2>Chỉnh sửa người dùng</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-3">
            <input
              {...register('username')}
              type="text"
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
              placeholder="Username"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              {...register('name')}
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Tên"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-3">
            <input
              {...register('email')}
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Cập nhật
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate({ to: '/' })}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    );
  },
});
