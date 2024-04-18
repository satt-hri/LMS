const axios = require("axios").default;

const options = {
  method: "POST",
  url: "https://uploadthing.com/api/deleteFile",
  headers: {
    "Content-Type": "application/json",
    "X-Uploadthing-Api-Key": "YOUR_TOKEN",
    "X-Uploadthing-Version": "6.4.0",
  },
  data: { files: [""], fileKeys: [""], customIds: [""] },
};

async function run() {
  try {
    const { data } = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
run()