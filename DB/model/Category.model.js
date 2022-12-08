import { Schema, model, Types } from "mongoose";


const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
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
            'can not add category without owner'
        ]
    }
}, {
    timestamps: true
})

const CategoryModel = model('Category', categorySchema)
export default CategoryModel