import { Schema, model, Types } from "mongoose";


const brandSchema = new Schema({
    name: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char'],
        trim:[true]

    },
    slug:String,
    image: {
        type: String,
        required: [true, 'image is required'],
    },
    publicId: {
        type: String,
        required: [true, 'image is required'],
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required:[
            true,
            'can not add brand without owner'
        ]
    }
}, {
    timestamps: true
})

const BrandModel = model('Brand', brandSchema)
export default BrandModel