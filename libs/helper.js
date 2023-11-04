import * as jwt from 'jsonwebtoken';
export const signInToken = async (
  id
  //  expirationTime
) => {
  return jwt.sign(
    {
      id: id,
      //   expiresIn: `${expirationTime}d`,
    },
    process.env.JWT_SECRET
  );
};
