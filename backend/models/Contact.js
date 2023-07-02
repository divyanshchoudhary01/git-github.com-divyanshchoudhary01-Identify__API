const mongoose=require('mongoose')
const contactSchema=new mongoose.Schema({

id:{
type:Number,
required:true,
unique:true,

},
email:{
type:String,
default:'',
},
phoneNumber:{
type:String,
default:'',
},
linkedId:{
type:Number,
default:null,
},

linkPrecedence:{
type:String,
required:true,
},

deletedAt:{
    type:String,
    default:null,
},

},

{timestamps:true}

)
module.exports=mongoose.model("Contact",contactSchema)