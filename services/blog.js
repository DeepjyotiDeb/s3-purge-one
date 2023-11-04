// import { connectToDatabase } from '../libs/db';
// import { ERRORS, STRINGS } from '../libs/messages';
// import { failure, success } from '../libs/response-lib';
// import { BlogTable, UserTable } from '../models/Models';

// export const createBlog = async (event, context) => {
//   try {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const data = JSON.parse(event.body);
//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }

//     const dbUserId = await UserTable.find({
//       _id: data.userId,
//     });
//     if (dbUserId > 0) {
//       throw { statusCode: 400, message: ERRORS.INVALID_USER };
//     }

//     const newBlog = await BlogTable.create({
//       userId: data.userId,
//       title: data.title,
//       summary: data.summary,
//       description: data.description,
//       createdAt: data.createdAt,
//     });
//     return success({
//       status: true,
//       message: 'blog posted',
//       newBlog: newBlog,
//     });
//   } catch (error) {
//     return failure({
//       status: false,
//       error: error,
//     });
//   }
// };

// export const getBlogs = async (event, context) => {
//   try {
//     context.callbackWaitsForEmptyEventLoop = false;

//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }

//     const blogs = await BlogTable.find({}, 'title summary createdAt').populate(
//       'userId',
//       'name username'
//     );

//     if (blogs.length === 0) {
//       throw { statusCode: 400, message: ERRORS.NO_BLOG };
//     }
//     return success({
//       status: true,
//       blog: blogs,
//     });
//   } catch (error) {
//     return failure({
//       status: false,
//       error: error,
//     });
//   }
// };

// export const findByUser = async (event, context) => {
//   try {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const data = JSON.parse(event.body);
//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }
//     const userBlogs = await BlogTable.find({ userId: data.userId }).populate(
//       'userId',
//       'name'
//     );
//     return success({
//       status: true,
//       userBlogs: userBlogs,
//     });
//   } catch (error) {
//     return failure({
//       status: false,
//       error: error,
//     });
//   }
// };

// export const getBlog = async (event, context) => {
//   try {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const { id } = event.pathParameters;
//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }
//     let blog;
//     try {
//       blog = await BlogTable.findById(
//         id,
//         'title summary description createdAt'
//       ).populate('userId', 'name');
//     } catch (error) {
//       throw { statusCode: 502, message: ERRORS.NO_BLOG };
//     }
//     return success({
//       blog: blog,
//     });
//   } catch (error) {
//     return failure({ status: false, error: error });
//   }
// };
// export const getSearchResult = async (event, context) => {
//   try {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const { id } = event.pathParameters;
//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }
//     try {
//       const result = await BlogTable.find({ $text: { $search: id } });
//       return success({
//         result: result,
//       });
//     } catch (error) {
//       throw { statusCode: 502, message: ERRORS.NO_BLOG };
//     }
//   } catch (error) {
//     return failure({ status: false, error: error });
//   }
// };

// export const updateBlog = async (event, context) => {
//   context.callbackWaitsForEmptyEventLoop = false;
//   const data = JSON.parse(event.body);

//   try {
//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }
//     let blog = {};
//     for (const key in data) {
//       if (data[key] !== undefined && key !== '_v') blog[key] = data[key];
//     }
//     if (Object.keys(blog).length === 0) {
//       return failure({
//         status: false,
//         error: 'Nothing to update',
//       });
//     }

//     const updatedResult = await BlogTable.findByIdAndUpdate(data.id, blog);
//     // const isPasswordValid = await bcrypt.compare(
//     //   data.password,
//     //   user['password']
//     // );
//     // console.log(isPasswordValid);
//     if (!updatedResult) throw { statusCode: 501, message: ERRORS.INVALID_DATA };
//     return success({
//       status: true,
//       message: STRINGS.BLOG_UPDATED,
//       updatedBlog: updatedResult,
//     });
//     // if (updateResult.isModified) {
//     // } else {
//     //   throw { statusCode: 400, message: ERRORS.BLOGNOTFOUND };
//     // }
//   } catch (error) {
//     return failure({
//       status: false,
//       error: error,
//     });
//   }
// };

// export const deleteBlog = async (event, context) => {
//   try {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const blogId = JSON.parse(event.body);

//     try {
//       await connectToDatabase();
//     } catch (error) {
//       throw { statusCode: 503, message: ERRORS.DB_UNREACHABLE };
//     }
//     if (!blogId.id) throw { statusCode: 502, message: ERRORS.BLOGNOTFOUND };

//     const removedBlog = await BlogTable.findByIdAndDelete(blogId.id);
//     return success({
//       status: true,
//       removedBlog: removedBlog,
//     });
//   } catch (error) {
//     return failure({
//       status: false,
//       error: error,
//     });
//   }
// };
