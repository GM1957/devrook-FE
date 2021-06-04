import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BasicInfo from "./BasicInfo/BasicInfo";
import PopularDevs from "./PopularDevs/PopularDevs";
import Interests from "./Interests/Interests";
import FirstLoginLayout from "../../hoc/FirstLoginLayout/FirstLoginLayout";
import { apis, axios } from "../../services";
import { connect } from "react-redux";
import { login } from "../../redux/actions";

const FirstLoginForm = (props) => {
  const [step, setStep] = useState(1);
  const [finishLoading, setFinishLoading] = useState(false);

  const defaultUserName =
    props.Auth?.cognitoUserInfo?.attributes?.email.substring(0, 4) +
    props.Auth?.cognitoUserInfo?.attributes?.sub.substring(0, 8);

  // this is to check username status after changing the user name its available or not
  const [userNameStatus, setUserNameStatus] = useState("passed");

  // this will use to set data locally
  const [selectedInterests, setSelectedInterests] = useState({});
  const [selectedDevs, setSelectedDevs] = useState({});
  const [selectedBasicInfo, setSelectedBasicInfo] = useState({
    userName: defaultUserName,
  });

  // this will use to collect data from api
  const [popularTags, setPopularTags] = useState([]);
  const [popularDevs, setPopularDevs] = useState([]);

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const fetchPopularTags = async () => {
    try {
      let responses = await axios.get(apis.GET_POPULAR_TAGS + "/50/false");
      setPopularTags(responses.data.data.Items);
    } catch (err) {
      toast.error("Internal server error, failed to fetch popular tags");
      console.log("failed to fetch popular tags", err);
    }
  };

  const fetchTopReputedUsers = async () => {
    try {
      let responses = await axios.get(apis.GET_TOP_REPUTED_USERS + "/20/false");
      setPopularDevs(responses.data.data.Items);
    } catch (err) {
      toast.error("Internal server error, failed to fetch to reputated users");
      console.log("failed to fetch to reputated users", err);
    }
  };

  const onFinishHandler = async () => {
    setFinishLoading(true);

    try {
      // 1: creating the user
      const requestJson = {
        ...selectedBasicInfo,
        email: props.Auth.cognitoUserInfo.attributes.email,
        name: props.Auth.cognitoUserInfo.attributes.name
          ? props.Auth.cognitoUserInfo.attributes.name
          : "devrook",
        tags: selectedInterests,
      };

      if (props?.Auth?.cognitoUserInfo?.attributes?.identities) {
        const body = JSON.parse(
          props?.Auth?.cognitoUserInfo?.attributes?.identities
        );

        requestJson.identities = {
          providerName: body[0].providerName,
          userId: body[0].userId,
        };
      }

      await axios.post(apis.CREATE_USER, requestJson);

      // 2: following the tags it meight update user info also so its coming on no.2
      // await axios.post(apis.FOLLOW_TAG_IN_BULK, {
      //   tagNames: Object.keys(selectedInterests),
      // });

      // 3: it meight update user info
      await axios.post(apis.FOLLOW_USER_IN_BULK, {
        userNames: Object.keys(selectedDevs),
      });

      window.location.href = "/";
    } catch (err) {
      toast.error("Internal server error, failed to submit first login form");
      console.log("failed to submit first login form", err);
    }
  };

  useEffect(() => {
    fetchPopularTags();
    fetchTopReputedUsers();
  }, []);

  switch (step) {
    case 1:
      return (
        <FirstLoginLayout
          next={next}
          back={back}
          currentStep={step}
          selectedTagsCount={Object.keys(selectedInterests).length}
        >
          <Interests
            currentSelected={selectedInterests}
            setSelected={setSelectedInterests}
            popularTags={popularTags}
          />
        </FirstLoginLayout>
      );
    case 2:
      return (
        <FirstLoginLayout
          userNameStatus={userNameStatus}
          next={next}
          back={back}
          currentStep={step}
        >
          <BasicInfo
            defaultUserName={defaultUserName}
            userNameStatus={userNameStatus}
            setUserNameStatus={setUserNameStatus}
            currentSelected={selectedBasicInfo}
            setSelected={setSelectedBasicInfo}
          />
        </FirstLoginLayout>
      );
    case 3:
      return (
        <FirstLoginLayout
          next={next}
          back={back}
          currentStep={step}
          selectCount={Object.keys(selectedDevs).length}
          selectedDevsCount={Object.keys(selectedDevs).length}
          onFinishHandler={onFinishHandler}
          finishLoading={finishLoading}
        >
          <PopularDevs
            currentSelected={selectedDevs}
            setSelected={setSelectedDevs}
            popularDevs={popularDevs}
            finishLoading={finishLoading}
          />
        </FirstLoginLayout>
      );
    default:
      return (
        <FirstLoginLayout
          next={next}
          back={back}
          currentStep={step}
          selectedTagsCount={Object.keys(selectedInterests).length}
        >
          <Interests
            currentSelected={selectedInterests}
            setSelected={setSelectedInterests}
            popularTags={popularTags}
          />
        </FirstLoginLayout>
      );
  }
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};
export default connect(mapStateToProps, {
  login,
})(FirstLoginForm);
