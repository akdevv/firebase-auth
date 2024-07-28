import { model, Schema } from "mongoose";

const UserSchema = new Schema(
	{
		userId: { type: String, required: true, unique: true },
		email: { type: String, unique: true },
		phoneNumber: { type: String, unique: true },
		name: String,
		photoURL: String,
	},
	{ timestamps: true }
);

const User = model("User", UserSchema);
export default User;
