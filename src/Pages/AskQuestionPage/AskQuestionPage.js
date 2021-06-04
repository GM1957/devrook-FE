import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { axios, apis, EDITOR_JS_TOOLS } from "../../services";
import Layout from "../../hoc/Layout";
import HomeLayout from "../../hoc/HomeLayout/HomeLayout";
import classes from "./AskQuestionPage.module.css";
import EditorJs from "react-editor-js";
import CreatableSelect from "react-select/creatable";

const AskQuestionPage = (props) => {
  const [editorInstance, setInstance] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [defaultTags, setDefaultTags] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleEditorDataSave = async () => {
    setIsLoading(true);
    try {
      const editorData = await editorInstance.save();

      const selectedTagsArr = selectedTags.map((ele) => ele.value);

      await axios.post(apis.CREATE_POST, {
        postType: "question",
        title,
        content: editorData,
        tags: selectedTagsArr,
      });

      toast.success("wooah 🥳 your Question is posted successfully");
    } catch (err) {
      toast.error("Internal server error, failed to post the question");
      console.log("failed to post the question", err);
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
          <div className={classes.NewQuestionPage}>
            <div className={classes.AskQuestionHeader}>
              <p className={classes.AskQuestionText}>Ask a public question</p>
            </div>
            <div className={classes.QuestionDetailsContainer}>
              <div>
                <div className={classes.TitleAndButtonRow}>
                  <div className={classes.TitleColumn}>
                    <label>
                      <b>Title</b> <br />
                      <small>
                        Be specific and imagine you’re asking a question to
                        another person
                      </small>
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
                      {isLoading ? "Posting..." : "Post question"}
                    </button>
                  </div>
                </div>

                <input
                  className={classes.TitleInput}
                  onChange={(event) => setTitle(event.target.value)}
                  type="text"
                />
              </div>
              <div>
                <label>
                  <b>Body</b> <br />
                  <small>
                    Include all the information someone would need to answer
                    your question or you can keep it empty if it is a short
                    query
                  </small>
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

export default AskQuestionPage;
