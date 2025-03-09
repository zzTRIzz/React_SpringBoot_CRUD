export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

export interface UserFormData {
  username: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface RouteParams {
  id: string;
}

export interface LoaderData {
  user?: User;
  users?: User[];
  error?: string;
}
