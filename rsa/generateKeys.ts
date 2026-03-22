import { generateKeyPair } from "node:crypto";
import { writeFile } from "node:fs/promises";

console.log(import.meta.dirname);

generateKeyPair(
  "rsa",
  {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "top secret",
    },
  },
  async (err, publicKey, privateKey) => {
    if (err) console.error(err);
    await writeFile(import.meta.dirname + "/publicKey.pem", publicKey, {
      flag: "w",
    });

    await writeFile(import.meta.dirname + "/privateKey.pem", privateKey, {
      flag: "w",
    });
  },
);
