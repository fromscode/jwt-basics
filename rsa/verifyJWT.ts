import { readFile } from "node:fs/promises";
import { createVerify } from "node:crypto";
import jwt from "./issueJWT.js";

async function main() {
  const publicKey = await readFile(import.meta.dirname + "/publicKey.pem", {
    encoding: "utf-8",
  });

  const arr = jwt.split(".");
  const headerENC = arr[0];
  const payloadENC = arr[1];
  const sigENC = arr[2] as string;

  const verify = createVerify("SHA256");
  verify.write(`${headerENC}.${payloadENC}`);
  const isVerified = verify.verify(publicKey, sigENC, "base64url");

  if (isVerified) console.log("Signature is verified");
  else {
    console.log("Signature is not verified");
    return;
  }

  const payload = JSON.parse(
    Buffer.from(payloadENC as string, "base64url").toString(),
  );
  if (Math.floor(Date.now() / 1000) > payload.exp) {
    console.log("Token has expired");
    return;
  } else {
    console.log("Token has not expired");
  }

  console.log(payload);
}

main();
