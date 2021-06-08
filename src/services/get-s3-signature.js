import { apis, axios } from "../services";
const uuid = require("uuid");

const getS3Signeture = async (name) => {
  const result = await axios.post(apis.S3_GET_PRESIGNED_URL, {
    bucket:
      process.env.NODE_ENV === "production"
        ? "prod-devrook-be-main-bucket"
        : "dev-devrook-be-main-bucket",
    directory: "posts",
    fileName: uuid.v4() + name,
  });
  return result.data;
};

export default getS3Signeture;
