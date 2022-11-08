import http from 'k6/http';
import { Trend, Rate, Counter } from "k6/metrics";
import { sleep } from 'k6';
export let authenticationDuration = new Trend('authentication_duration');
export let authenticationReqs = new Rate('authentication_reqs');
export let authenticationCounter = new Counter('authentication_counter');
import { check, fail } from "k6";

export default function () {
  const url = 'http://54.204.244.142:5050/api/account/authentication';
  const payload = JSON.stringify({
    email: 'test@email.com',
    password: '123456',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  authenticationDuration.add(res.timings.duration);
  authenticationReqs.add(1);
  authenticationCounter.add(1);

  sleep(1);
}