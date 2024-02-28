'use client';
function PrimaryHeading({
    headingContent,
    position = "left"
}) {
   const posMap = {
        "left": "text-left",
        "right": "text-right",
        "center": "text-center"
    }

  return (
    <div className={`text-3xl text-gray-600 font-semibold ${posMap[position]} my-2`}>{headingContent}</div>
  )
}

export default PrimaryHeading