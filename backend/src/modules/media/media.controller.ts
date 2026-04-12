import { asyncHandler } from "../../utils/asyncHandler.js";
import { AppError } from "../../utils/AppError.js";
import { sendResponse } from "../../utils/response.js";
import { MediaService } from "../../utils/MediaService.js";

// Uploads an image, returns URL
export const uploadMedia = asyncHandler(async (req: any, res: any) => {
  if (!req.file) {
    throw new AppError("No file provided", 400);
  }

  // Upload file via our MediaService (which handles Cloudinary)
  const result = await MediaService.uploadFile(req.file, "articles");

  return sendResponse(res, {
    status: 200,
    success: true,
    message: "Media uploaded successfully",
    data: {
      url: result.url,
      mediaType: result.mediaType
    },
  });
});
