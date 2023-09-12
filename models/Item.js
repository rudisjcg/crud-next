import {model, models, Schema} from "mongoose";

const ItemSchema = new Schema({
    name: {type:String, required:true},
    description: String,
    images: {type:[String]},
}, {
    timestamps: true
})

export const Item = models.Item || model('Item', ItemSchema)