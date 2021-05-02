const s3UploadImage = async (presignedUploadUrl, file) => {
  const response = await fetch(
    new Request(presignedUploadUrl, {
      method: "PUT",
      body: file,
      headers: new Headers({
        "Content-Type": "image/*",
        ACL: "public-read",
      }),
    })
  );
  if (response.status === 200) {
    const data = {
      url: response.url.split("?")[0],
      status: 200,
    };
    return data;
  } else {
    const failed = {
      url: "",
      status: 500,
    };

    return failed;
  }
};

export default s3UploadImage;
