const { default: axios } = require("axios");
const ip = require("./functions/ip");
const uid = require("harsh-uid");
const randomUseragent = require("random-useragent");

function generateRandomNumber(length = 4) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10); // Generate a random digit between 0 and 9
  }
  return result;
}

const hitURL = async () => {
  try {
    const urls = [
      //   `https://www.filmyfly.durban/?to-page=${
      //Math.floor(Math.random() * 1000) +
      //1 //   `https://www.filmyfly.durban/site-1.html?to-search=${uid(10)}`, //   }`,
      `https://www.filmyfly.durban/page-download/${generateRandomNumber()}/${uid()}.html`,
      //   `https://www.filmyfly.durban/`,
    ];

    // for (let index = 0; index < 1000; index++) {
    urls.forEach(async (url) => {
      const _ip = ip();
      try {
        await axios.get(url, {
          headers: {
            Referer: url,
            "x-forwarded-for": _ip,
            "X-Real-IP": _ip,
            "User-Agent": randomUseragent.getRandom(),
            origin: "https://www.filmyfly.durban",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Cache-Control": "no-cache",
          },
        });
        console.log("success");
      } catch (err) {
        // err.response &&
        //   console.log(
        //     "🚀 ~ file: durban.js:39 ~ urls.forEach ~ err:",
        //     err.response
        //   );
        console.log("fail");
      }
    });
    // }

    // console.log("Success");
  } catch (err) {
    // console.log("🚀 ~ file: durban.js:5 ~ hitURL ~ err:", err);
    // console.log("Fail");
  }
};

for (let i = 0; i < 1000; i++) {
  setInterval(hitURL, 5);
}
