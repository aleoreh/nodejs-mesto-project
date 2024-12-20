import mongoose from 'mongoose';
import validator from 'validator';

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

const DEFAULT_NAME = 'Жак-Ив Кусто';
const DEFAULT_ABOUT = 'Исследователь';
const DEFAULT_AVATAR =
  'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';

const urlValidator = (value: string) =>
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/.test(
    value,
  );

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
      minlength: 2,
      maxlength: 30,
      default: DEFAULT_NAME,
    },
    about: {
      type: String,
      minLength: 2,
      maxLength: 200,
      default: DEFAULT_ABOUT,
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR,
      validate: {
        validator: urlValidator,
        message: 'Некорректный avatar',
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: validator.isEmail,
        message: 'Некорректный email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model<IUser>('user', userSchema);

export default User;
