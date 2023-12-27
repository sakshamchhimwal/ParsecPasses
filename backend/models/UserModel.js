import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    uuid: {
        type: Schema.Types.UUID,
        required: true
    },
    email: {
        type: Schema.Types.String,
        required: true
    },
    college_name: {
        type: Schema.Types.String,
        required: true
    },
    year: {
        type: Schema.Types.String,
        required: true
    },
    branch: {
        type: Schema.Types.String,
        required: true
    },
    mobile_number: {
        type: Schema.Types.String,
        required: true
    },
    date_of_birth: {
        type: Schema.Types.Date,
        required: true
    }
})

const UserModel = model("User", UserSchema);
export default UserModel;