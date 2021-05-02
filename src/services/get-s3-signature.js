import { apis, axios } from "../services";
const uuid = require("uuid");

const getS3Signeture = async (name) => {
  const result = await axios.post(apis.S3_GET_PRESIGNED_URL, {
    bucket: "dev-devrook-be-main-bucket",
    directory: "posts",
    fileName: uuid.v4() + name,
  });
  return result.data;
};

export default getS3Signeture;
