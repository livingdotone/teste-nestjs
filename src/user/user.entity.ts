import { EntitySchema } from 'typeorm';

export class User {
  id: number;
  email: string;
  password: string;
}

export const UserEntity = new EntitySchema<User>({
  name: 'users',
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
