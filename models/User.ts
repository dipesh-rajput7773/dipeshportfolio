import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // Optional for now (using OTP)
    required: false,
  },
  mobileNumber: {
    type: String, // Store for future SMS OTP
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  credits: {
    type: Number,
    default: 5,
  },
  // --- ANALYTICS & TRACKING ---
  location: {
    type: String, // City/Country code
  },
  browser: {
    type: String, // User-Agent
  },
  ipAddress: {
    type: String,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
