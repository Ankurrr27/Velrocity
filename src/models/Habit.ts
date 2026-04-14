import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
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
    type: {
      type: String,
      enum: ['habit', 'hobby'],
      default: 'habit',
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'interval'],
      required: true,
    },
    days: [
      {
        type: String,
        enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
      },
    ],
    intervalDays: {
      type: Number,
      min: 1,
      validate: {
        validator: function (v: number) {
          return (this as any).frequency !== 'interval' || v >= 1;
        },
        message: 'Interval habits require intervalDays >= 1',
      },
    },
    startDate: {
      type: Date,
      default: () => new Date(),
    },
    endDate: {
      type: Date,
      default: null,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    verificationRule: {
      type: String,
      enum: ['manual', 'github', 'link', 'platform'],
      default: 'manual',
    },
    platformSource: {
      type: String,
      enum: ['github', 'leetcode', 'codeforces', 'codechef', 'gfg', null],
      default: null,
    },
    githubRepo: {
      type: String,
    },
  },
  { 
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

export default mongoose.models.Habit || mongoose.model('Habit', habitSchema);
