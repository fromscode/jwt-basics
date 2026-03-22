# How it works:

## Issuing JWT

- We have a payload data that we want to send. Eg: 
```js
const payload = {
    'sub': '1001',
    'name': 'John Doe',
    'iat': 1774178746066, // issued at
    'exp': 1774265146066 // expires at
}
```

1. First we create a header, which contains two critical information:
```js
const header = {
    'alg': 'HS256',
    'typ': 'JWT'
}
```
This contains info about the type of token (here, JWT), and the algo used for the signature (explained later below)

2. Then the header and payload are converted from json objects to `base64url` encoded strings.
3. Then a signature is created in the following manner:
    - A hashing algorithm is used to create a hash
    - Here we are using the HMAC-SHA256 algorithm, which creates a hash based on a secret key
    - We are creating a hash based on the following string: `header(base64url)`.`payload(base64url)`, and a secret key
    (The hash function is given the secret key and the headerb64url.payloadb64url string to generate a signature)
    - The resultant hash is then encoded into b64url format, this encoded data becomes the signature
4. Once we have header, payload and signatures ready, they are sent as a single string joined with '.'s
5. The final format becomes:
    header(b64url).payload(b64url).signature(b64url)


## Verification
1. Since the token is a string with '.'s to separate header, payload and signature, we split it:
```js
const arr = jwt.split('.');
```

2. The first part is the header, second is the payload, third is the signature
```js
headerENC = arr[0];
payloadENC = arr[1];
signENC = arr[2];
```
3. We first try to generate the signature again based on the b64url encoded header and the b64url encoded payload using the same way we
generated the signature at the time of issuing:
```js
const sign = some_hash_function(headerENC + '.' + payloadENC, secret-key).encode('base64url');
```
4. Then we check if the generated signature is same as the signature in the token, if not that means the token was tampered with and we reject the token, if yes, then we continue.
5. Then we decode the header and payload, and get the exp claim from the payload.
6. We use this exp claim to verify whether the token has expired or not, if it has expired then we again reject the token, if it has not expired then we continue
7. Once the token is confirmed to not have expired, we use other claims from the payload (like name, sub) to finally show data to the users