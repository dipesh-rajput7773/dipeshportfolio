import mongoose from 'mongoose';

const SpaceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  avatarUrl: {
    type: String, // Dynamic profile pic
  },
  theme: {
    type: String, // 'dark', 'midnight', 'sunset', 'ocean', 'forest', 'neon', 'glass'
    default: 'dark',
  },
  links: [{
    title: String,
    url: String,
    icon: String, // Lucide icon name
    isMusic: Boolean, // New field for Spotify/YT Music
    appScheme: String, // Deep-link URI to open native app (e.g. instagram://user?username=xxx)
  }],
  musicConfig: {
    platform: String, // 'spotify' | 'ytmusic'
    playlistUrl: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Space || mongoose.model('Space', SpaceSchema);
