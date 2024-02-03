import { Schema, model } from "mongoose";


const UserSchema = new Schema({
    uuid: {
        type: Schema.Types.UUID,
        required: true,
        unique: true
    },
    role: {
        type: Schema.Types.String,
        default: "user"
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    full_name: {
        type: Schema.Types.String,
        required: true,
    },
    college_name: {
        type: Schema.Types.String,
        // required: true
    },
    mobile_number: {
        type: Schema.Types.String,
        // required: true,
    },
    qr_code_url: {
        type: Schema.Types.String,
        required: true
    },
    used: {
        type: Schema.Types.Boolean,
        default: "false"
    }
})

const DjNiteModel = model("DjNite", UserSchema);
export default DjNiteModel;