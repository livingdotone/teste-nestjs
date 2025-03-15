import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 100, // Número de usuários virtuais simultâneos
  duration: '30s', // Duração do teste
};

export default function () {
  const url = 'http://localhost:3000/user/all';

  let res = http.get(url);

  // Verifica se o status é 200
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Aguardar um curto tempo antes da próxima execução
  sleep(1);
}
