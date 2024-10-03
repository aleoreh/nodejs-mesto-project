import userModel from "../models/user";

export function getUsers() {
  return userModel.find({});
}

export function getUser(userId: string) {
  return userModel.find({ _id: userId });
}

type CreateUserParams = {
  name: string;
  about: string;
  avatar: string;
};

export function createUser({ name, about, avatar }: CreateUserParams) {
  return userModel.create({ name, about, avatar });
}
