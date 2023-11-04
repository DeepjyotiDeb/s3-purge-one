// import * as bcrypt from 'bcryptjs';

// import { connectToDatabase } from '../libs/db';
// import { signInToken } from '../libs/helper';
// import { ERRORS, STRINGS } from '../libs/messages';
// import { failure, success } from '../libs/response-lib';
// import { UserTable } from '../models/Models';

// export const login = async (event, context) => {
//   try {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const data = JSON.parse(event.body);
//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }

//     if (typeof data.username === 'undefined') {
//       throw { statusCode: 400, message: ERRORS.INVALID_USER_ID };
//     } else if (typeof data.password === 'undefined') {
//       throw { statusCode: 400, message: ERRORS.INVALID_PASSWORD };
//     }

//     const user = await UserTable.findOne({ username: data.username });

//     if (!user) {
//       throw { statusCode: 400, message: ERRORS.USER_NOT_FOUND };
//     }

//     const isPasswordValid = await bcrypt.compare(
//       data.password,
//       user['password']
//     );

//     // const org = await OrgTable.findById(user['organizationId'], { name: 1 });
//     // if (!org) {
//     //   throw { statusCode: 400, message: ERRORS.ORG_NOT_FOUND };
//     // }
//     if (!isPasswordValid) {
//       throw { statusCode: 400, message: ERRORS.PASSWORD_MISMATCH };
//     }

//     // const setLoginTime = await UserTable.findOneAndUpdate(
//     //   {
//     //     username: data.username,
//     //   },
//     //   { $set: { lastLoginAt: new Date() } },
//     //   { new: true, upsert: true }
//     // );
//     // if (!setLoginTime) {
//     //   throw { statusCode: 400, message: ERRORS.USER_NOT_FOUND };
//     // }

//     const token = await signInToken(user._id, 40);
//     return success({
//       status: true,
//       user: {
//         id: user['_id'],
//         name: user['name'],
//         username: user['username'],
//         token: token,
//       },
//     });
//   } catch (error) {
//     return failure({
//       status: false,
//       error: error,
//     });
//   }
// };

// export const signup = async (event, context) => {
//   try {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const data = JSON.parse(event.body);

//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }
//     // if (typeof data.email === 'undefined') {
//     //   throw { statusCode: 400, message: ERRORS.INVALID_EMAIL };
//     // } else if (typeof data.username === 'undefined') {
//     //   throw { statusCode: 400, message: ERRORS.INVALID_USER_ID };
//     // } else if (typeof data.password === 'undefined') {
//     //   throw { statusCode: 400, message: ERRORS.INVALID_PASSWORD };
//     // } else if (typeof data.userType === 'undefined') {
//     //   throw { statusCode: 400, message: ERRORS.INVALID_USER_TYPE };
//     // } else if (typeof data.name === 'undefined') {
//     //   throw { statusCode: 400, message: ERRORS.NO_NAME };
//     // }

//     const user = await UserTable.find({
//       username: data.username,
//     });

//     if (user.length > 0) {
//       throw { statusCode: 400, message: ERRORS.ACC_ALREADY_EXIST };
//     }

//     const hashPassword = bcrypt.hashSync(data.password, 10);

//     const newUser = await UserTable.create({
//       name: data.name,
//       email: data.email,
//       username: data.username,
//       password: hashPassword,
//       type: data.type,
//     });

//     if (!newUser) {
//       throw { statusCode: 400, message: ERRORS.ACC_REGISTRATION_ERROR };
//     }

//     return success({
//       status: true,
//       message: STRINGS.ACC_CREATED,
//       type: 'SIGNUP',
//     });
//   } catch (error) {
//     return failure({
//       status: false,
//       error: error,
//     });
//   }
// };

// export const getUsers = async (event, context) => {
//   try {
//     context.callbackWaitsForEmptyEventLoop = false;
//     // const data = JSON.parse(event.body);

//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }
//     const users = await UserTable.find();

//     return success({
//       status: true,
//       users: users,
//     });
//   } catch (error) {
//     return failure({
//       status: false,
//       error: error,
//     });
//   }
// };
