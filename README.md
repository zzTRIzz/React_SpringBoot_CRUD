# React_SpringBoot_CRUD
 CRUD với người dùng đơn giản

<br>

Link code:
```cardlink
url: https://github.com/zzTRIzz/React_SpringBoot_CRUD
title: "GitHub - zzTRIzz/React_SpringBoot_CRUD: CRUD với người dùng đơn giản dùng React kết hợp Restful API của Spring Boot dùng React Route và Tanstack Route"
description: "CRUD với người dùng đơn giản dùng React kết hợp Restful API của Spring Boot dùng React Route và Tanstack Route - zzTRIzz/React_SpringBoot_CRUD"
host: github.com
favicon: https://github.githubassets.com/favicons/favicon.svg
image: https://opengraph.githubassets.com/7ca1152d3e36771678e923da7050c05621bae31e3606b3fd8ac1e91611d0226c/zzTRIzz/React_SpringBoot_CRUD
```

<br>

## Cách chạy
1. Chạy code backend dự án Spring Boot trước để khởi chạy API:  `locallhost8080`.
2. Mở frontend hoặc frontend-tanstack trong Vscode hoặc Webstorm
```shell
	React_SpringBoot_CRUD/
  ├── frontend/ : Dùng React Route 
  ├── frontend-tanstack/ : Dùng thư viện Tanstack Route
  ├── ...
```
3. Mở CMD/Bash và chạy câu lệnh
```bash
pnpm install
pnpm run dev
```
4. Truy cập vào `localhost:5173`

# Hướng dẫn sử dụng TanStack Router trong React
## Tóm tắt:
Hướng dẫn chi tiết về TanStack Router, bao gồm:

1. Cài đặt và cấu hình cơ bản
2. Cấu trúc thư mục và tổ chức code
3. Chi tiết triển khai CRUD với ví dụ code thực tế
4. Xử lý loading states và error boundaries
5. Tối ưu hiệu suất và SEO
6. So sánh với React Router để hiểu rõ sự khác biệt
7. Best practices và tips

Hướng dẫn này sẽ giúp các developer chuyển từ React Router sang TanStack Router dễ dàng hơn, với đầy đủ ví dụ code và giải thích chi tiết bằng tiếng Việt.

Các điểm chính khác biệt với React Router đã được nhấn mạnh:

- File-based routing
- Type safety với TypeScript
- Data loading tích hợp
- Cache management
- Loading và error handling tốt hơn


## 1. Giới thiệu

TanStack Router là một thư viện định tuyến (routing) hiện đại cho React, cung cấp:
- Type-safe routing với TypeScript
- File-based routing (định tuyến dựa trên cấu trúc file)
- Data loading tích hợp
- Quản lý cache thông minh

## 2. Cài đặt

```bash
# Tạo dự án Vite với TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app

# Cài đặt các dependencies cần thiết
npm install @tanstack/react-router @tanstack/router-vite-plugin @tanstack/router-devtools
````

## 3. Cấu hình Vite

File `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
  ],
});
```

## 4. Cấu trúc thư mục

```javascript
src/
  ├── routes/
  │   ├── __root.tsx      # Route gốc
  │   ├── index.tsx       # Trang chủ (/)
  │   └── users/
  │       ├── $id.tsx     # Dynamic route (/users/123)
  │       └── index.tsx   # /users
  ├── App.tsx
  └── main.tsx
```

## 5. Root Route

File `src/routes/__root.tsx`:

```typescript
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div>
      <Outlet /> {/* Hiển thị các route con */}
    </div>
  ),
});
```

## 6. Trang chủ

File `src/routes/index.tsx`:

```typescript
import { createFileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/').createRoute({
  component: () => <h1>Trang chủ</h1>,
});
```

## 7. Dynamic Routes

File `src/routes/users/$id.tsx`:

```typescript
import { createFileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/users/$id').createRoute({
  loader: async ({ params: { id } }) => {
    // Fetch data dựa trên ID
    return { id };
  },
  component: () => {
    const { id } = Route.useLoaderData();
    return <h1>User ID: {id}</h1>;
  },
});
```

## 8. App Configuration

File `src/App.tsx`:

```typescript
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

## 9. Điểm khác biệt với React Router

1. **File-based Routing**:

    - TanStack Router tự động tạo route dựa trên cấu trúc thư mục
    - Không cần định nghĩa routes một cách thủ công
2. **Type Safety**:

    - Kiểm tra type cho params và loader data
    - Tự động sinh types cho routes
3. **Data Loading**:

    - Tích hợp sẵn data loading thông qua loader
    - Cache management tự động
4. **Navigation**:

    ```typescript
    // React Router
    navigate('/users/123');
    
    // TanStack Router
    navigate({ to: '/users/$id', params: { id: '123' } });
    ```


## 10. Tính năng nâng cao

### Data Invalidation

```typescript
const router = useRouter();

// Làm mới dữ liệu mà không reload trang
await router.invalidate();
```

### Loader với TypeScript

```typescript
interface UserData {
  id: number;
  name: string;
}

export const Route = new FileRoute('/users/$id').createRoute({
  loader: async ({ params }): Promise<UserData> => {
    const { data } = await api.get(`/users/${params.id}`);
    return data;
  },
});
```

### Search Params

```typescript
const { search } = Route.useSearch();
```

## 11. Best Practices

1. **Tổ chức file**:

    - Đặt routes trong thư mục `src/routes`
    - Sử dụng `$` cho dynamic segments
    - Tạo shared layouts trong `__root.tsx`
2. **Data Loading**:

    - Sử dụng loader cho data fetching
    - Handle errors trong loader
    - Tận dụng cache của router
3. **Type Safety**:

    - Định nghĩa interface cho data
    - Sử dụng generic types cho loader
    - Validate params với zod hoặc TypeScript

## 12. Debugging

1. **Dev Tools**:

```typescript
import { RouterDevtools } from '@tanstack/router-devtools';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <RouterDevtools router={router} />
    </>
  );
}
```

2. **Route Generation**:

- Chạy `npm run dev` để tự động sinh route tree
- Kiểm tra file `routeTree.gen.ts`

## 13. Production Build

```bash
npm run build
```

TanStack Router tự động tối ưu hóa routes cho production build.

## 14. Resources

- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [GitHub Repository](https://github.com/TanStack/router)
- [Examples](https://github.com/TanStack/router/tree/main/examples)

## 15. Ví dụ thực tế: CRUD với TanStack Router



### 15.1. Cấu trúc thư mục cho CRUD

```

src/

  ├── routes/

  │   ├── __root.tsx

  │   ├── index.tsx              # Danh sách users

  │   └── users/

  │       ├── add.tsx            # Thêm user mới

  │       ├── $id.edit.tsx       # Sửa user

  │       └── $id.view.tsx       # Xem chi tiết user

```



### 15.2. Cài đặt dependencies

```bash

npm install @tanstack/react-router @hookform/resolvers react-hook-form zod axios bootstrap

```



### 15.3. Triển khai các components



#### Danh sách Users (index.tsx)

```typescript

import { FileRoute, Link } from '@tanstack/react-router';

import { useRouter } from '@tanstack/react-router';

import { api } from '../lib/axios';

  

interface User {

  id: number;

  username: string;

  name: string;

  email: string;

}

  

export const Route = new FileRoute('/').createRoute({

  loader: async () => {

    const { data } = await api.get<User[]>('/user');

    return { users: data };

  },

  component: () => {

    const { users } = Route.useLoaderData();

    const router = useRouter();

  

    const deleteUser = async (id: number) => {

      try {

        await api.delete(`/user/${id}`);

        // Làm mới dữ liệu mà không reload trang

        await router.invalidate();

      } catch (error) {

        console.error('Error:', error);

      }

    };

  

    return (

      <div className="container mt-5">

        <Link to="/users/add" className="btn btn-primary mb-3">

          Thêm User

        </Link>

        <table className="table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Username</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map(user => (

              <tr key={user.id}>

                <td>{user.id}</td>

                <td>{user.username}</td>

                <td>

                  <Link

                    to="/users/$id/view"

                    params={{ id: user.id.toString() }}

                    className="btn btn-info btn-sm"

                  >

                    View

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    );

  },

});

```



#### Thêm User Mới (users/add.tsx)

```typescript

import { FileRoute, useNavigate } from '@tanstack/react-router';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

  

const userSchema = z.object({

  username: z.string().min(3),

  name: z.string().min(2),

  email: z.string().email(),

});

  

type UserForm = z.infer<typeof userSchema>;

  

export const Route = new FileRoute('/users/add').createRoute({

  component: () => {

    const navigate = useNavigate();

    const router = useRouter();

    const { register, handleSubmit } = useForm<UserForm>({

      resolver: zodResolver(userSchema),

    });

  

    const onSubmit = async (data: UserForm) => {

      try {

        await api.post('/add', data);

        await router.invalidate();

        navigate({ to: '/' });

      } catch (error) {

        console.error('Error:', error);

      }

    };

  

    return (

      <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register('username')} />

        <input {...register('name')} />

        <input {...register('email')} />

        <button type="submit">Thêm</button>

      </form>

    );

  },

});

```



#### Chi tiết User (users/$id.view.tsx)

```typescript

import { FileRoute, useParams } from '@tanstack/react-router';

  

export const Route = new FileRoute('/users/$id/view').createRoute({

  loader: async ({ params: { id } }) => {

    const { data } = await api.get(`/user/${id}`);

    return { user: data };

  },

  component: () => {

    const { user } = Route.useLoaderData();

    return (

      <div>

        <h2>Chi tiết người dùng</h2>

        <p>Username: {user.username}</p>

        <p>Name: {user.name}</p>

        <p>Email: {user.email}</p>

      </div>

    );

  },

});

```



### 15.4. Những điểm cần lưu ý



1. **Data Fetching**:

- Sử dụng loader để fetch data

- Loader chạy trước khi component được render

- Data được cache tự động



2. **Type Safety**:

- Định nghĩa interface cho data

- Sử dụng zod để validate form

- TypeScript tự động check các params



3. **Navigation**:

- Sử dụng Link component cho internal links

- navigate() cho programmatic navigation

- Params phải được truyền rõ ràng


## 18. Tối ưu hiệu suất và SEO



### 18.1. Code Splitting



TanStack Router hỗ trợ code splitting tự động với lazy loading:



```typescript

// src/routes/users/index.tsx

export const Route = new FileRoute('/users').createRoute({

  component: lazy(() => import('./UsersPage')),

});

```



### 18.2. Prefetching Data



```typescript

// Prefetch data khi hover vào link

<Link

  to="/users/$id/view"

  params={{ id: user.id.toString() }}

  preload="intent" // Tự động prefetch khi hover

>

  View

</Link>

  

// Prefetch thủ công

const router = useRouter();

useEffect(() => {

  router.preloadRoute({

    to: '/users/$id/view',

    params: { id: '123' }

  });

}, []);

```



### 18.3. Cache Management



```typescript

// Cấu hình cache trong route

export const Route = new FileRoute('/users').createRoute({

  loader: async () => {

    const { data } = await api.get('/users');

    return { users: data };

  },

  // Giữ cache trong 5 phút

  cacheTime: 1000 * 60 * 5,

});

  

// Invalidate cache thủ công

const router = useRouter();

await router.invalidate();

  

// Invalidate route cụ thể

await router.invalidate({

  to: '/users/$id/view',

  params: { id: '123' }

});

```



### 18.4. SEO Optimization



```typescript

// src/routes/users/$id/view.tsx

export const Route = new FileRoute('/users/$id/view').createRoute({

  loader: async ({ params: { id } }) => {

    const { data } = await api.get(`/user/${id}`);

    return { user: data };

  },

  meta: ({ loaderData }) => {

    const { user } = loaderData;

    return {

      title: `Chi tiết người dùng - ${user.name}`,

      description: `Thông tin chi tiết về ${user.name}`,

      'og:title': `Chi tiết người dùng - ${user.name}`,

      'og:description': `Thông tin chi tiết về ${user.name}`,

    };

  },

  component: () => {

    const { user } = Route.useLoaderData();

    return <UserDetails user={user} />;

  },

});

```



### 18.5. Performance Best Practices



1. **Lazy Loading**:

- Sử dụng code splitting cho các routes lớn

- Lazy load các components không cần thiết ngay

- Sử dụng Suspense để hiển thị loading state



2. **Data Management**:

- Cấu hình cache time phù hợp cho từng route

- Sử dụng prefetching cho UX tốt hơn

- Chỉ invalidate cache khi cần thiết



3. **Bundle Size**:

- Tách các dependencies lớn thành chunks riêng

- Sử dụng dynamic imports cho các features ít dùng

- Monitoring bundle size với tools như `source-map-explorer`



4. **SEO**:

- Cung cấp meta tags đầy đủ cho mỗi route

- Sử dụng SSR khi cần thiết

- Đảm bảo accessibility với semantic HTML



### 18.6. Monitoring và Analytics



```typescript

// src/routes/__root.tsx

export const Route = createRootRoute({

  beforeLoad: ({ location }) => {

    // Track page views

    analytics.pageView(location.pathname);

  },

  component: () => {

    return (

      <div>

        <Outlet />

      </div>

    );

  },

});

```



### 18.7. Development Tools



1. **Router DevTools**:

```typescript

import { RouterDevtools } from '@tanstack/router-devtools';

  

function App() {

  return (

    <>

      <RouterProvider router={router} />

      {process.env.NODE_ENV === 'development' && (

        <RouterDevtools router={router} />

      )}

    </>

  );

}

```



2. **Performance Monitoring**:

```typescript

export const Route = new FileRoute('/users').createRoute({

  loader: async () => {

    const start = performance.now();

    const { data } = await api.get('/users');

    const end = performance.now();

    console.log(`Users data loaded in ${end - start}ms`);

    return { users: data };

  },

});

```

  