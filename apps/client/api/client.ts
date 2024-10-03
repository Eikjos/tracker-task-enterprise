import ky from "ky";

const client = ky.create({
  prefixUrl: "http://localhost:8080",
  hooks: {
    beforeRequest: [
      (options) => {
        if (useCookie("token")) {
          options.headers.set(
            "Authorization",
            "Bearer " + useCookie("token").value
          );
        }
      },
    ],
  },
});

export default client;
