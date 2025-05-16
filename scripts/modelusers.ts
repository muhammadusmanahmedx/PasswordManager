import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectToDatabase } from '@/lib/db';

dotenv.config();

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function migrateUsers() {
  try {
    await connectToDatabase(); // Use your reusable connection

    const users = await User.find({ username: { $exists: false } });
    console.log(`Found ${users.length} users without usernames`);

    for (const user of users) {
      // Generate a temporary unique username
      let username = `User${Math.floor(100 + Math.random() * 900)}`;
      let counter = 1;
      while (await User.findOne({ username })) {
        username = `User${Math.floor(100 + Math.random() * 900)}${counter}`;
        counter++;
      }

      user.username = username;
      await user.save();
      console.log(`Assigned username "${username}" to user: ${user.email}`);
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrateUsers();
