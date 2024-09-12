import ky from "ky";

const client = ky.create({
  prefixUrl: "http://localhost:8080",
});

export default client;
