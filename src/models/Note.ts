import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dateKey: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    content: {
      type: String,
      default: '',
    },
  },
  { 
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        const r = ret as any;
        r.id = r._id;
        delete r._id;
        delete r.__v;
      }
    }
  }
);

// Compound index to ensure one note per user per day
noteSchema.index({ user: 1, dateKey: 1 }, { unique: true });

export default mongoose.models.Note || mongoose.model('Note', noteSchema);
