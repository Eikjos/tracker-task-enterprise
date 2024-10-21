import ky from "ky";
const client = ky.create({
  prefixUrl: process.env.BASE_URL,
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
