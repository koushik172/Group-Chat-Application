import multer from "multer";
import multerS3 from "multer-s3";

import s3 from "../utils/s3Storage.js";

const acceptedFileTypes = {
	"text/plain": 1024 * 1024 * 2, // 2MB
	"text/xml": 1024 * 1024 * 2, // 2MB
	"image/png": 1024 * 1024 * 5, // 5MB
	"image/gif": 1024 * 1024 * 5, // 5MB
	"video/mp4": 1024 * 1024 * 50, // 50MB
	"audio/mp3": 1024 * 1024 * 10, // 10MB
	"audio/mpeg": 1024 * 1024 * 10, // 10MB
};

const sanitizeFile = (file, cb) => {
	const isAllowedMimeType = acceptedFileTypes[file.mimetype];
	if (isAllowedMimeType) {
		// if (file.size <= acceptedFileTypes[file.mimetype]) {
		// 	return cb(null, true);
		// } else {
		// 	cb("Error: File size exceeds limit!");
		// }
		return cb(null, true);
	} else {
		cb("Error: File type not allowed!");
	}
};

// Set up storage for uploaded files
const storage = multerS3({
	s3: s3,
	bucket: process.env.BUCKET_NAME,
	acl: "public-read",
	metadata: (req, file, cb) => {
		cb(null, { fieldname: file.fieldname });
	},
	key: (req, file, cb) => {
		let folder = "";
		switch (file.mimetype) {
			case "text/plain":
				folder = "text/";
				break;
			case "text/xml":
				folder = "text/";
				break;
			case "image/png":
				folder = "images/";
				break;
			case "image/gif":
				folder = "images/";
				break;
			case "image/jpg":
				folder = "images/";
				break;
			case "video/mp4":
				folder = "videos/";
				break;
			case "audio/mp3":
				folder = "audios/";
				break;
			case "audio/mpeg":
				folder = "audios/";
				break;
			default:
				folder = "others/";
		}
		const fileName = folder + Date.now() + "_" + file.fieldname + "_" + file.originalname;
		cb(null, fileName);
	},
	limits: { fileSize: 20 * 1024 * 1024 },
});

// Create the multer instance
const upload = multer({
	storage: storage,
	fileFilter: (req, file, callback) => {
		sanitizeFile(file, callback);
	},
});

export default upload;
