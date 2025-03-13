import { EntitySchema } from 'typeorm';

export interface User {
  id: number;
  email: string;
  password: string;
}

export const UserEntity = new EntitySchema<User>({
  name: 'user',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
});
