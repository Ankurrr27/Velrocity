import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'done'],
      default: 'pending',
    },
    date: {
      type: Date,
      default: () => {
        const d = new Date();
        d.setUTCHours(0,0,0,0);
        return d;
      },
    },
    deadline: {
      type: Date,
      default: null,
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

export default mongoose.models.Task || mongoose.model('Task', taskSchema);
