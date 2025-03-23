import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string, // Keep it as a string
  expiresIn: string // Keep it as a string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as jwt.SignOptions); // Cast options to SignOptions
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
