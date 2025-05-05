import { Schema,model } from "mongoose";

const inventorySchema=Schema({
    type:{
        type:String,
        enum:['Entry','Exit'],
        required:[true,'Type is required']
    },
    quantity:{
        type:Number,
        required:[true,'Quantity is required']
    },
    date:{
        type:Date,
        required:[true,'Date is required']
    },
    reason:{
        type:String,
        required:[true,'Reason is required']
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:[true,'Product is required']
    },
    employee:{
        type:Schema.Types.ObjectId,
        ref:'Staff',
        required:[true,'Employee is required']
    }
})

export default model('Inventory', inventorySchema)