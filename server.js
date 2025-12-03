import express from "express"
import qr from "qr-image";
import fs from "fs";
import { URL } from "url";
import { fileURLToPath } from "url";
import os from "os";
import path from "path"
import cors from "cors";

const app = express();
const port = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/generate", (req, res) => {
    const url = req.body.url?.trim();

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }
    
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
        return res.status(400).json({ error: "Invalid URL" });
    }
    
    // Make sure QR code and txt folders exists
    if (!fs.existsSync("QRs"))  fs.mkdirSync("QRs");
    if (!fs.existsSync("txts")) fs.mkdirSync("txts");
    
    const desktopDir = path.join(os.homedir(), "Downloads");
    
    const qrFile = `QRs/${safeName}.png`;
    const txtFile = `txts/${safeName}.txt`;
    
    const qrDest = path.join(desktopDir, `${safeName}.png`);
    
    // Generate QR code and save it
    const qrStream = fs.createWriteStream(qrFile);
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

        fs.writeFileSync(txtFile, url);

        return res.json({
            message: "QR generated",
            filename: `${safeName}.png`
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});