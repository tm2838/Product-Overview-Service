import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
  // stages: [
  //   { duration: '1m', target: 10 }, // below normal load
  //   { duration: '2m', target: 10 },
  //   { duration: '1m', target: 100 }, // normal load
  //   { duration: '2m', target: 100 },
  //   { duration: '1m', target: 1000 }, // around the breaking point
  //   { duration: '2m', target: 1000 },
  //   { duration: '1m', target: 2000 }, // beyond the breaking point
  //   { duration: '2m', target: 2000 },
  //   { duration: '1m', target: 0 }, // scale down. Recovery stage.
  // ],
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      duration: '2m',
      preAllocatedVUs: 50,
      maxVUs: 1000,
    },
  },
};

export default function () {
  const rnd = Math.floor(Math.random() * 100000) + 900000;
  const response = http.get(`http://localhost:5000/product/${rnd}`);
  check(response, {
      "is status 200": (r) => r.status === 200,
  })
}
