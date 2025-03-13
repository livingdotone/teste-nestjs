import { EntitySchema } from 'typeorm';

export interface Teste {
  id: number;
  email: string;
  password: string;
}

export const TesteEntity = new EntitySchema<Teste>({
  name: 'teste',
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
