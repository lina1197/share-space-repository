import mongoose from 'mongoose';
const {Schema, model} =mongoose;

const UserSchema= new Schema ({

email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
},
 
},{ 
timestamps:true 
});
UserSchema.index({ email: 1 }, { unique: true });

const User=model('User', UserSchema);
export default User;