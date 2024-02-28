'use client';
function SecondaryHeading({
    headingContent,
    position = "left"
}) {
    const posMap = {
        "left": "text-left",
        "right": "text-right",
        "center": "text-center"
    }
  return (
    <div className={`text-xl text-gray-500 ${posMap[position]} mb-2`}>{headingContent}</div>
  )
}

export default SecondaryHeading