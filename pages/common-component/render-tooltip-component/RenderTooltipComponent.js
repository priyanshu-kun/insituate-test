'use client';
import React from 'react';
import Tooltip from "../Tooltip/Tooltip";

const STARTING_SUBSTRING_LENGTH = 0;
function RenderTooltipComponent({
  content = "",
  maxLength = 0,
  maxWidth = 300,
  styles=""
}) {

  if (content?.length <= maxLength) {
    return <div className={styles}>{content || "--"}</div>;
  }
  return (
    <Tooltip maxWidth={maxWidth} interactive placement="top" content={content}>
      <div className={styles}>{`${content.substring(
        STARTING_SUBSTRING_LENGTH,
        maxLength
      )}...`}</div>
    </Tooltip>
  );
}
export default RenderTooltipComponent;
