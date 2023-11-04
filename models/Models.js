import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'blog',
    },
  ],
});

const BlogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    title: String,
    summary: String,
    description: String,
    createdAt: Date,
  },
  { collection: 'blog' }
);
BlogSchema.index({ title: 'text', summary: 'text' });
export const UserTable = model('users', UserSchema);
export const BlogTable = model('blog', BlogSchema);

// const schema = new mongoose.Schema({ name: 'string', size: 'string' });
// const Tank = mongoose.model('Tank', schema);
