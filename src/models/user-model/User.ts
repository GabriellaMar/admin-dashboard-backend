import { model, Schema } from "mongoose";
import { IUser } from "../../types/users";

export const userSchema: Schema = new Schema({

    userName: {
      type: String
    },
    email: {
      type: String,
      required: true 

    },
    password: {
      type: String,
      required: true 
    },
    // token: {
    //   type: String,
    //    required: true 
    // }
  
  }, { versionKey: false, timestamps: true });

  
  
  export default model<IUser>("user", userSchema);
  