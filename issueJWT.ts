import data from "./data.js";
import secret from "./secret.js";
import { Buffer } from "node:buffer";
import { createHmac } from "node:crypto";

const header = {
  alg: "HS256",
  typ: "JWT",
};

const headerString = JSON.stringify(header);
const payloadString = JSON.stringify(data);

const headerb64url = Buffer.from(headerString).toString("base64url");
const payloadb64url = Buffer.from(payloadString).toString("base64url");

const hmac = createHmac("sha256", secret);
hmac.update(headerb64url + "." + payloadb64url);
const signatureb64url = hmac.digest("base64url");

const jwt = `${headerb64url}.${payloadb64url}.${signatureb64url}`;
export default jwt;
