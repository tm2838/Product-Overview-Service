import http from 'k6/http';
import { check, sleep } from 'k6';


export default function () {
  const rnd = Math.floor(Math.random() * 100000) + 900000;
  const response = http.get(`http://localhost:5000/product/${rnd}`);
  check(response, {
      "is status 200": (r) => r.status === 200,
      "is id the same we asked": (r) => {
          const id = Number(r.json("id"))
          return id === rnd
      }
  })
}

export let options = {
  vus: 1000,
  duration: '1s',
};