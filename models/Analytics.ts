import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  spaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: true,
  },
  userId: {
    type: String, // The owner of the space
    required: true,
  },
  linkTitle: {
    type: String, // Which link was clicked (or 'biopage' for profile view)
    required: true,
  },
  ipAddress: String,
  location: String,
  browser: String,
  device: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
