import mongoose, { Schema } from 'mongoose';

const credentialSchema = new Schema({
  websiteUrl: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.models.Credential || mongoose.model('Credential', credentialSchema);