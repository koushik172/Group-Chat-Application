import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_SECRET_ID,
		secretAccessKey: process.env.AWS_SECRET_KEY,
	},
	region: process.env.AWS_REGION,
});

export default s3;
