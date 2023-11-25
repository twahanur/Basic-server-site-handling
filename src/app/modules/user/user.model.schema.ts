import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { TUser, UserModel } from './user.interface';
import config from '../../config';

function validateName(value: string) {
  const name = value.charAt(0).toUpperCase() + value.slice(1);
  return value === name;
}

const addressSchema = new Schema({
  street: {
    type: String,
    required: [true, 'Street is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
});

const orderSchema = new Schema({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'User ID must be unique'],
    unique: true,
    index: true,
  },
  username: {
    type: String,
    required: [true, 'username must be unique'],
    unique: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: {
      firstName: {
        type: String,
        required: [true, 'First name is required'],
        maxlength: [20, 'First name cannot exceed 20 characters'],
        trim: true,
        validate: {
          validator: validateName,
          message: `Invalid First name, {VALUE} does not follow the uppercase format`,
        },
      },
      lastName: {
        type: String,
        required: [true, 'Last name is required'],
        maxlength: [20, 'Last name cannot exceed 20 characters'],
        trim: true,
        validate: {
          validator: validateName,
          message:
            'Invalid Last name, {VALUE} does not follow the uppercase format',
        },
      },
    },
    required: [true, 'Name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required and must be unique'],
    unique: true,
    trim: true,
    index: true,
    validate: [validator.isEmail, 'Invalid email format'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: [],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: {
    type: [orderSchema],
    default: [],
  },
});

userSchema.statics.verifyUserId = async function (id) {
  const confirmation: boolean | null = await User.findOne({ userId: id });
  return confirmation;
};

userSchema.statics.getSingleUserData = async function (id: number) {
  const data = await User.findOne(
    { userId: id },
    {
      _id: 0,
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
    },
  );
  return data;
};

userSchema.statics.updateSingleUserData = async function (id, updatedUserData) {
  const updateData = await User.findOneAndUpdate(
    { userId: id },
    updatedUserData,
    {
      new: true,
      projection: {
        _id: 0,
        userId: 1,
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        isActive: 1,
        hobbies: 1,
        address: 1,
      },
    },
  );
  return updateData;
};

userSchema.statics.getSingleUserOrders = async function (id: number) {
  const data = await User.aggregate([
    { $match: { userId: id } },
    { $project: { orders: 1, _id: 0 } },
  ]);
  return data.length > 0 ? data[0] : null;
};

userSchema.statics.getSingleUserTotalOrdersAmount = async function (
  id: string,
) {
  const userid: number = parseInt(id, 10);
  const data = await User.aggregate([
    { $match: { userId: userid } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalAmount: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0, totalAmount: 1 } },
  ]);

  return data.length > 0 ? data[0] : null;
};

userSchema.statics.deleteSingleUserData = async function (id) {
  const deleteData = await this.findOneAndDelete({ userId: id });
  return deleteData;
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
export const User = model<TUser, UserModel>('User', userSchema);
