/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
**/
// import { readFile  } from "fs";
import fs from "fs";
// var qr = require("qr-image");
import qr from "qr-image";
import inquirer from "inquirer";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "input",
      name: "URL",
      message: "Type in your URL: ",
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;

    // var qr_svg = qr.image("I love QR!", { type: "svg" });
    var qr_svg = qr.image(url, { type: "png" });
    // qr_svg.pipe(require("fs").createWriteStream("i_love_qr.svg"));
    qr_svg.pipe(fs.createWriteStream("qr_img.png"));
    // var svg_string = qr.imageSync("I love QR!", { type: "svg" });

    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
    // fs.writeFile("message.txt", "Hello from Nodejs!", (err) => {
    //   if (err) throw err;
    //   console.log("The file has been saved!");
    // });
    // fs.readFile("./message.txt", "utf8", (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    // });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
