import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
import { URL } from "url";
import os from "os";
import path from "path"

inquirer.prompt([
    {
        type: "input",
        name: "url",
        message: "Enter URL:> "
    }
]).then((answer) => {

    const url = answer.url.trim();

    // Extract website name
    let safeName;

    try {

        const parsedUrl = new URL(url);

        const rawHostname = parsedUrl.hostname; // e.g., 'www.example.com'

        // Remove 'www.' and '.com', '.org', etc
        const domainName = rawHostname.replace(/^www\./, "").replace(/\.\w+$/, "");

        const fullPath = `${domainName}${parsedUrl.pathname}`; // e.g., 'example/page1'
        const timestamp = Date.now(); // For uniqueness

        // Sanitise filename: letters, numbers, dashes, underscores only
        safeName = `${fullPath}_${timestamp}`.replace(/[^a-z0-9]/gi, "_");
    }
    catch (e) {

        console.error("Invalid URL");
        return;
    }

    // Make sure QR code and txt folders exists
    if (!fs.existsSync("QRs"))  fs.mkdirSync("QRs");
    if (!fs.existsSync("txts")) fs.mkdirSync("txts");

    const desktopDir = path.join(os.homedir(), "Downloads");

    const qrFile = `QRs/${safeName}.png`;
    const txtFile = `txts/${safeName}.txt`;

    const qrDest = path.join(desktopDir, `${safeName}.png`);

    const qrStream = fs.createWriteStream(qrFile);

    // Generate QR code and save it
    var qr_svg = qr.image(url, { type: "png" });
    qr_svg.pipe(qrStream);

    qrStream.on("finish", () => {

        console.log("QR code saved as " + safeName + ".png");

        fs.copyFile(qrFile, qrDest, (err) => {

            if (err) {

                console.error("Failed to copy QR code to Downloads:" + err);
            }
            else {

                console.log("QR code also saved to Downloads");
            }
        });
    });

    console.log("QR code saved as " + safeName + ".png");

    // Save the URL to a text file
    fs.writeFile(txtFile, url, (err) => {
        
        if (err) throw err;
        console.log("The file has been saved!");
    });

}).catch((error) => {

    if (error.isTtyError) {

        console.error("Prompt couldn't be rendered in the current environment.");
    }
    else {

        console.error("An error occurred:" + error);
    }
});