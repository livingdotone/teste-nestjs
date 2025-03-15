import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100, // Número de usuários virtuais simultâneos
  duration: '30s', // Duração do teste
};

export default function () {
  const url = 'http://localhost:3000/user';
  const payload = JSON.stringify({
    email: `test${Math.random()}@example.com`,
    password: 'mypassword',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Envia a requisição POST
  let res = http.post(url, payload, params);

  // Verifica se o status é 201
  check(res, {
    'status is 201': (r) => r.status === 201,
  });

  // Aguardar um curto tempo antes da próxima execução
  sleep(1);
}
