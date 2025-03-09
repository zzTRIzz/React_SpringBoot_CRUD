import { FileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../lib/axios';
import { UserFormData } from '../types/user';

const userSchema = z.object({
  username: z.string().min(3, 'Username phải có ít nhất 3 ký tự'),
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
});

export const Route = new FileRoute('/users/add').createRoute({
  component: () => {
    const navigate = useNavigate();
    const router = useRouter();
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<UserFormData>({
      resolver: zodResolver(userSchema),
    });

    const onSubmit = async (data: UserFormData) => {
      try {
        await api.post('/add', data);
        await router.invalidate();
        navigate({ to: '/' });
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    return (
      <div className="container mt-5">
        <h2>Thêm người dùng mới</h2>
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
              Thêm người dùng
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
