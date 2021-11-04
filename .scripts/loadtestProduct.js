import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
  stages: [
    { duration: '5s', target: 100 }, // below normal load
    { duration: '10s', target: 100 },
    { duration: '5s', target: 500 }, // normal load
    { duration: '10s', target: 500 },
    { duration: '5s', target: 1000 }, // around the breaking point
    { duration: '10s', target: 1000 },
    { duration: '5s', target: 2000 }, // beyond the breaking point
    { duration: '10s', target: 2000 },
    { duration: '5s', target: 0 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const rnd = Math.floor(Math.random() * 100000) + 900000;
  const response = http.get(`http://localhost:5000/product/${rnd}`);
  check(response, {
      "is status 200": (r) => r.status === 200,
  })
}
