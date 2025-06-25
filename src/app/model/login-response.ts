import { User } from 'src/app/model/user';

export interface LoginResponse {
  message?: string;
  erro?: string;
  usuario?: User;
}
