# How it works

The overall workflow is similar to the hmac algorithm where a single shared secret was used.
The major difference is the fact that here we will use two keys instead of one:
1. public key: Known to everyone
2. private key: Known only to the server which is issuing the JWT tokens (auth server)

## Usage
### 1. Public Key
The public key is used to verify a signature. Even if hackers know this key, it is not a problem, as they will not be able to do much with this key as it can only be used to verify whether a given signature is valid

### 2. Private Key
This key is used for creating the signature. It is necessary that this key is kept secret and not shared with anyone, because this can be used to tamper jwt tokens.

## Why 2 keys?

### The problem with a shared secret key
The main reason why this approach is preffered is Microservices architecture. In the hmac approach, if there are multiple servers, then all of them need to know the shared secret. If one of the servers is compromised and the secret is leaked, then all the servers are at risk, since the secret is shared and can be used to tamper with jwt.

### The solution
In this approach, only the server responsible for issuing JWT (usually the auth server) knows the private key. All other servers which contain protected resources know the public key. Since the public key can also be used to verify JWT, the servers will have no problem in verifying incoming requests. Also if any of the servers are compromised, the hacker will only have access to the public key, which can not be used to tamper with JWT, this makes the two key approach much more robust.

