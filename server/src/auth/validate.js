const jwksClient = require("jwks-rsa");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;

const client = jwksClient({
  jwksUri: `https://${domain}/.well-known/jwks.json`,
});

const getKey = (header, cb) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key ? key.publicKey || key.rsaPublicKey : undefined;
    cb(null, signingKey);
  });
};

const isTokenValid = async (token) => {
  if (token) {
    const bearerToken = token.split(" ");

    const result = new Promise((resolve, reject) => {
      jwt.verify(
        bearerToken[1],
        getKey,
        {
          issuer: `https://${domain}/`,
          algorithms: ["RS256"],
        },
        (error, decoded) => {
          if (error) {
            resolve({ error });
          }
          if (decoded) {
            resolve({ user: decoded });
          }
        }
      );
    });

    return result;
  }

  return { error: "No Token provided" };
};

module.exports = isTokenValid;
