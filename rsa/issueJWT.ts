import data from "../data.js";
import { readFile } from "node:fs/promises";
import { createSign } from "node:crypto";

let jwt = "";

async function main() {
  const privateKey = await readFile(import.meta.dirname + "/privateKey.pem", {
    encoding: "utf-8",
  });

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const headerENC = Buffer.from(JSON.stringify(header)).toString("base64url");
  const payloadENC = Buffer.from(JSON.stringify(data)).toString("base64url");

  const sign = createSign("SHA256");
  sign.write(`${headerENC}.${payloadENC}`);
  sign.end();

  const signatureENC = sign.sign(
    { key: privateKey, passphrase: "swan" },
    "base64url",
  );

  jwt = `${headerENC}.${payloadENC}.${signatureENC}`;
}

await main();

export default jwt;
