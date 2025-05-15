import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: { type: String }, // Optional, unique when provided
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model('User', userSchema);