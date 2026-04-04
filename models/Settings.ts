import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
  maintenanceMode: {
    type: Boolean,
    default: false,
  },
  maintenanceMessage: {
    type: String,
    default: 'THE ARCHIVE IS CURRENTLY UNDER NEURAL MAINTENANCE. BACK SHORTLY.',
  },
  globalAlert: {
    message: { type: String, default: '' },
    level: { type: String, enum: ['info', 'warning', 'critical'], default: 'info' },
    active: { type: Boolean, default: false }
  },
  dailyPrompt: {
    title: { type: String, default: 'The Silent Frame Engine' },
    body: { type: String, default: 'Today, focus on creating high-contrast frames that define the void.' },
    niche: { type: String, default: 'Any' }
  },
  disabledRoutes: [String],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
