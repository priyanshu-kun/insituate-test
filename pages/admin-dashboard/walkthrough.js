import React, { useState, useEffect } from "react";
import ReactJoyride, { STATUS } from "react-joyride";

function Walkthrough() {
  const [runWalkthrough, setRunWalkthrough] = useState(false);
  const [steps] = useState([
    {
      target: ".personal_workspace",
      content: "These are your workspaces.",
    },
    {
      target: ".public_workspace",
      content: "These are the public workspaces.",
    },
  ]);

  const [isDOMLoad, setIsDOMLoad] = useState(false);

  useEffect(() => {
    // This function will be executed only on the client side after mounting
    const checkWalkthroughCompleted = () =>
      localStorage.getItem("walkthroughCompleted") === "true";

    // Directly run the walkthrough check to reduce flicker and improve UX
    if (!checkWalkthroughCompleted()) {
      setRunWalkthrough(true);
    }
    setIsDOMLoad(true);
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRunWalkthrough(false);

      // Use a function to ensure localStorage access is client-side only
      const setWalkthroughCompleted = () =>
        localStorage.setItem("walkthroughCompleted", "true");
      setWalkthroughCompleted();
    }
  };

  return isDOMLoad ? (
    <ReactJoyride
      steps={steps}
      run={runWalkthrough}
      scrollOffset={150}
      continuous={true}
      callback={handleJoyrideCallback}
      showProgress={true}
      showSkipButton
      styles={{
        options: {
          arrowColor: "#fff",
          backgroundColor: "#fff",
          beaconSize: 36,
          overlayColor: "rgba(0, 0, 0, 0.3)",
          primaryColor: "#3363AE",
          spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
          textColor: "#333",
          width: undefined,
        },
        spotlight: {
          backgroundColor: "rgba(255, 255, 255, 1)", // Adjust as needed
        },
      }}
    />
  ) : (
    <></>
  );
}

export default Walkthrough;
