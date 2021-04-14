import React, { useState } from "react";
import BasicInfo from "./BasicInfo/BasicInfo";
import PopularDevs from "./PopularDevs/PopularDevs";
import Interests from "./Interests/Interests";
import FirstLoginLayout from "../../hoc/FirstLoginLayout/FirstLoginLayout";

import classes from "./FirstLoginForm.module.css";

const FirstLoginForm = (props) => {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState({});
  const [selectedBasicInfo, setSelectedBasicInfo] = useState({});
  const [selectedDevs, setSelectedDevs] = useState({});

  console.log("selected", selectedInterests)

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  switch (step) {
    case 1:
      return (
        <FirstLoginLayout next={next} back={back} currentStep={step} selectCount={Object.keys(selectedInterests).length}>
          <Interests
            currentSelected={selectedInterests}
            setSelected={setSelectedInterests}
          />
        </FirstLoginLayout>
      );
    case 2:
      return (
        <FirstLoginLayout next={next} back={back} currentStep={step}>
          <BasicInfo
            currentSelected={selectedBasicInfo}
            setSelected={setSelectedBasicInfo}
          />
        </FirstLoginLayout>
      );
    case 3:
      return (
        <FirstLoginLayout next={next} back={back} currentStep={step} selectCount={Object.keys(selectedDevs).length}>
          <PopularDevs
            currentSelected={selectedDevs}
            setSelected={setSelectedDevs}
          />
        </FirstLoginLayout>
      );
    default:
      return (
        <FirstLoginLayout next={next} back={back} currentStep={step} selectCount={Object.keys(selectedInterests).length}>
          <Interests
            currentSelected={selectedInterests}
            setSelected={setSelectedInterests}
          />
        </FirstLoginLayout>
      );
  }
};

export default FirstLoginForm;
