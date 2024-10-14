import mongoose from 'mongoose';
import validator from 'validator';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const DEFAULT_NAME = 'Жак-Ив Кусто';
const DEFAULT_ABOUT = 'Исследователь';
const DEFAULT_AVATAR =
  'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

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
      default: DEFAULT_NAME,
    },
    about: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 200,
      default: DEFAULT_ABOUT,
    },
    avatar: {
      type: String,
      required: true,
      default: DEFAULT_AVATAR,
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
