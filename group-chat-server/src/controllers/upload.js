export const uploadFile = async (req, res) => {
	if (req.file) {
		res.status(201).send({ status: "success", data: req.file });
		// res.status(201).send("success");
	} else {
		res.status(404).send("Unable to upload file.");
	}
};
