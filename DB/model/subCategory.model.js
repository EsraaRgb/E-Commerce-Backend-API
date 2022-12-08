import { Schema, model, Types } from "mongoose";


const subCategorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    image: {
        type: String,
        required: [true, 'image is required'],
    },
    publicId: {
        type: String,
    },
    createdBy: {
        type: Types.ObjectId,
        ref: 'User',
        required:[
            true,
            'can not add category without owner'
        ]
    },
    categoryId: {
        type: Types.ObjectId,
        ref: 'Category',
        required:[
            true,
            'can not add  sub category without Category'
        ]
    }
}, {
    timestamps: true
})

const SubCategoryModel = model('SubCategory', subCategorySchema)
export default SubCategoryModel