# Cloudinary Profile Pictures

Velrocity uploads profile pictures directly to Cloudinary using an unsigned upload preset.

Add these values to `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

Create the preset in Cloudinary Dashboard > Settings > Upload > Upload presets. Keep it unsigned and restrict it to image uploads for the `velrocity/profile-pictures` folder.
