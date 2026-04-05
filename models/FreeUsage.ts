import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IFreeUsage extends Document {
    ip: string;
    tool: 'smart-link' | 'script-lab';
    count: number;
    lastUsed: Date;
}

const FreeUsageSchema = new Schema<IFreeUsage>({
    ip: { type: String, required: true, index: true },
    tool: { type: String, required: true, enum: ['smart-link', 'script-lab'] },
    count: { type: Number, default: 0 },
    lastUsed: { type: Date, default: Date.now },
});

// Compound unique index: one record per IP per tool
FreeUsageSchema.index({ ip: 1, tool: 1 }, { unique: true });

export default models.FreeUsage || model<IFreeUsage>('FreeUsage', FreeUsageSchema);
