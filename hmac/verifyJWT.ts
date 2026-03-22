import { createHmac } from "node:crypto";
import jwt from "./issueJWT.js";
import secret from "../secret.js";

const jwtArr = jwt.split(".");
const header = jwtArr[0] as string;
const payload = jwtArr[1] as string;
const signature = jwtArr[2] as string;

const headerStringDecoded = Buffer.from(header, "base64url").toString("utf-8");
const payloadStringDecoded = Buffer.from(payload, "base64url").toString(
  "utf-8",
);

const headerObj = JSON.parse(headerStringDecoded);
const payloadObj = JSON.parse(payloadStringDecoded);

console.log("header: ", headerObj); // the actual header
console.log("data:", payloadObj); // the actual payload

const hmac = createHmac("sha256", secret);
hmac.update(header + "." + payload);
const generatedSignature = hmac.digest("base64url");

if (signature === generatedSignature) console.log("Signature is verified");
else console.log("Signature is not verified");

if (payloadObj.exp < Math.floor(Date.now() / 1000)) {
  console.log("Token is expired");
}
