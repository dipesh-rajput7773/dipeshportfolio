import mongoose from 'mongoose';

// Separate lightweight model for tool usage tracking (Script Lab, Smart Link, etc.)
const ToolAnalyticsSchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    tool: {
        type: String,
        enum: ['script-lab', 'smart-link'],
        required: true,
    },
    action: { type: String, required: true }, // e.g. 'generate', 'convert'
    meta: { type: Object, default: {} },      // e.g. { scriptType: 'reel' }
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.ToolAnalytics ||
    mongoose.model('ToolAnalytics', ToolAnalyticsSchema);
