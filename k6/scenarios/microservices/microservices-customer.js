import http from 'k6/http';
import { Trend, Rate, Counter } from "k6/metrics";
import { sleep } from 'k6';
export let authenticationDuration = new Trend('authentication_duration');
export let authenticationReqs = new Rate('authentication_reqs');
export let authenticationCounter = new Counter('authentication_counter');
import { check, fail } from "k6";

export default function () {
  const url = 'http://54.173.83.209:8000/customer/videos';

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxMDVkZGE3LWQ0YzItNDRiNC1hN2Y5LWZkMzY3MTA2Njc1NSIsImlhdCI6MTY2Nzg2OTExNiwiZXhwIjoxNjY3ODcyNzE2LCJzdWIiOiJmMTA1ZGRhNy1kNGMyLTQ0YjQtYTdmOS1mZDM2NzEwNjY3NTUifQ.nqezCg2AEjrm81KWPr2t2JTzF4gSsOcYCBI2UYXB8o4',
    },
  };

  const res = http.get(url, params);

  authenticationDuration.add(res.timings.duration);
  authenticationReqs.add(1);
  authenticationCounter.add(1);

  sleep(1);
}