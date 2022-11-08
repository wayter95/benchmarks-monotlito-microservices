import http from 'k6/http';
import { Trend, Rate, Counter } from "k6/metrics";
import { sleep } from 'k6';
export let authenticationDuration = new Trend('authentication_duration');
export let authenticationReqs = new Rate('authentication_reqs');
export let authenticationCounter = new Counter('authentication_counter');
import { check, fail } from "k6";

export default function () {
  const url = 'http://54.204.244.142:5050/api/video';
  const payload = JSON.stringify({
    title: "test 2",
    description: "description test",
    url: "test.com/test.mp4"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYTFkMTA4LWY1MWEtNGFkMS04ZmJkLWI4ZmFjMWUwZjE1YyIsImlhdCI6MTY2Nzg2NzQxNywiZXhwIjoxNjY3ODcxMDE3LCJzdWIiOiJkMWExZDEwOC1mNTFhLTRhZDEtOGZiZC1iOGZhYzFlMGYxNWMifQ.GC4Xj43n0O80qMsfJ7nysGMjECqxODeoE2J3m5J2GEA',
    },
  };

  const res = http.post(url, payload, params);

  authenticationDuration.add(res.timings.duration);
  authenticationReqs.add(1);
  authenticationCounter.add(1);

  sleep(1);
}