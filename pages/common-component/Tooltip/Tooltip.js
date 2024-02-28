'use client';
import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/shift-away.css";
// import styles from "../Tooltip/styles.module.css";

const Tooltip = ({
  content,
  children,
  placement = "top",
  trigger = "mouseenter",
  caret = true,
  maxWidth = 240,
  interactive = true,
  visible,
}) => {
  return (
    <Tippy
      // className={styles.container}
      content={content}
      placement={placement}
      theme="light"
      animation="shift-away"
      trigger={trigger}
      offset={caret ? [0, 10] : [0, 4]}
      arrow={caret}
      maxWidth={maxWidth}
      interactive={interactive}
      visible={visible}
      arrowType="round"
      arrowSize="regular"
    >
      <div
        role="tooltip"
        aria-label="tooltip"
        aria-controls="tooltip"
        aria-owns="tooltip"
      >
        {children}
      </div>
    </Tippy>
  );
};

export default Tooltip;
