import mongoose from "mongoose";
import IUser from "types/user";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    validate: [
      validator.isEmail,
      "Введён не корректный адрес электронной почты",
    ],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("user", UserSchema);
