import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { axios, apis, EDITOR_JS_TOOLS } from "../../services";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import EditorJs from "react-editor-js";
import CreatableSelect from "react-select/creatable";
import { getS3Signeture, s3UploadImage } from "../../services";
import classes from "./CreateBlogPage.module.css";

const CreateBlogPage = (props) => {
  const [editorInstance, setInstance] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [defaultTags, setDefaultTags] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = useCallback(async (pendingImage) => {
    setLoadingImage(true);
    setCoverImage(URL.createObjectURL(pendingImage[0]));
    setSelectedImage(pendingImage[0]);
    setLoadingImage(false);
  }, []);

  const fetchDefaultTags = async () => {
    const fetchedTags = await axios.get(apis.GET_POPULAR_TAGS + "/100/false");

    setDefaultTags(
      fetchedTags?.data?.data?.Items.map((ele) => {
        return {
          value: ele.tagName,
          label: ele.tagName,
        };
      })
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    disabled: false,
    onDrop,
  });

  const handleEditorDataSave = async () => {
    setIsLoading(true);
    try {
      const editorData = await editorInstance.save();

      const selectedTagsArr = selectedTags.map((ele) => ele.value);

      let coverImg = "";

      if (selectedImage) {
        const s3Sign = await getS3Signeture(selectedImage.name);
        const response = await s3UploadImage(s3Sign, selectedImage);
        coverImg = response.url;
      }

      await axios.post(apis.CREATE_POST, {
        postType: "blog",
        title,
        coverImage: coverImg,
        content: editorData,
        tags: selectedTagsArr,
      });
      toast.success("wooah 😻 your Blog is posted successfully");
    } catch (err) {
      toast.error("Internal server error, failed to post the blog");
      console.log("failed to post the blog", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDefaultTags();
  }, []);

  return (
    <div>
      <Layout>
        <HomeLayout isRightBar={false}>
          <div className={classes.NewBlogPage}>
            <div className={classes.CreateBlogHeader}>
              <p className={classes.WriteBlogText}>Write a new blog</p>
            </div>
            <div className={classes.BlogDetailsContainer}>
              <div>
                <div className={classes.TitleAndButtonRow}>
                  <div className={classes.TitleColumn}>
                    <label>
                      <b>Title</b> <br />
                      <small>Give a title of your new blog</small>
                    </label>
                  </div>
                  <div className={classes.ButtonColumn}>
                    <button
                      className={
                        (title.length && selectedTags.length) > 0 &&
                        selectedTags.length < 6 &&
                        !isLoading
                          ? classes.PostButton
                          : classes.PostButtonDisabled
                      }
                      onClick={handleEditorDataSave}
                    >
                      {isLoading ? "Posting..." : "Post blog"}
                    </button>
                  </div>
                </div>

                <input
                  className={classes.TitleInput}
                  onChange={(event) => setTitle(event.target.value)}
                  type="text"
                />
              </div>

              {coverImage.length ? (
                <div className={classes.CoverImageArea}>
                  <img src={coverImage} alt="coverImage" />
                  <div
                    className={classes.RemoveImageButton}
                    onClick={() => setCoverImage("")}
                  >
                    <p>Delete the cover picture</p>
                  </div>
                </div>
              ) : (
                <div className={classes.AddCoverPhotoSection}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {loadingImage ? (
                      <div className="ui active centered inline loader"></div>
                    ) : isDragActive ? (
                      <p>Drop the image here ...</p>
                    ) : (
                      <p>
                        Drag a perfect cover picture here or click to add one
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label>
                  <b>Body</b> <br />
                  <small>Write your blog content here</small>
                </label>
              </div>
              <div className={classes.EditorBody}>
                <EditorJs
                  autofocus={true}
                  instanceRef={(instance) => setInstance(instance)}
                  tools={EDITOR_JS_TOOLS}
                />
              </div>

              <div>
                <label>
                  <b>Add tags</b> <br />
                  <small>Select upto 5 tags</small>
                </label>
                <div className={classes.SelectTagsSection}>
                  <CreatableSelect
                    options={defaultTags}
                    isMulti
                    onChange={setSelectedTags}
                    menuPlacement="auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </HomeLayout>
      </Layout>
    </div>
  );
};

export default CreateBlogPage;
