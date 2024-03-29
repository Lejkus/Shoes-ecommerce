import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    products: [],
    status: { type: String, required: true },
    total:{type:Number,required: true }
  },
  {
    timestamps: true,
  }
);

const addressSchema = mongoose.Schema({
  country: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zipcode: {
    type: Number,
    required: false,
  },
  street:{
    type:String,
    required:false,
  },
  nr:{
    type:Number,
    required:false,
  },
  zipcode:{
    type:String,
    required:false,
  }
})

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders:[orderSchema],
  address: addressSchema
},{
  toJSON: {
    transform(doc, ret) {
      delete ret.password;
    },
  },
},);
const User = mongoose.model('User',userSchema)

export default User