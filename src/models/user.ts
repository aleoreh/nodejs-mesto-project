import mongoose from 'mongoose';
import validator from 'validator';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

type IUser = {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 200,
    },
    avatar: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: 'Некорректный email',
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>('user', userSchema);

export default User;
