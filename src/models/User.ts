import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    avatar: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },
    externalProfiles: {
      github: { type: String, trim: true, default: "" },
      leetcode: { type: String, trim: true, default: "" },
      codeforces: { type: String, trim: true, default: "" },
      codechef: { type: String, trim: true, default: "" },
      gfg: { type: String, trim: true, default: "" },
      codolio: { type: String, trim: true, default: "" },
      twitter: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
      discord: { type: String, trim: true, default: "" },
    },
    profilePublic: {
      type: Boolean,
      default: false,
    },
    credibilityScore: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastPlatformSync: { type: Date, default: null },
    bio: { type: String, maxLength: 160, default: "" },
    tagline: { type: String, maxLength: 50, default: "" },
    location: { type: String, maxLength: 32, default: "" },
    currentFocus: { type: String, maxLength: 50, default: "" },
    accentColor: { type: String, default: "indigo" }, 
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        ret.externalProfiles = ret.externalProfiles || {
          github: "",
          leetcode: "",
          codeforces: "",
          codechef: "",
          gfg: "",
          codolio: "",
          twitter: "",
          linkedin: "",
          discord: "",
        };
      },
    },
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
