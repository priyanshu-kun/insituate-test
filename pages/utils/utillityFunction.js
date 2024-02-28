'use client';
import moment from "moment";

const copyTextToClipboard = (textToCopy, setIsCopied, id) => {
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      setIsCopied(id);
      setTimeout(() => {
        setIsCopied(null);
      }, 3000);
    })
    .catch((err) => {
      console.error("Unable to copy text: ", err);
    });
};

export const truncateString = (str, startChars, endChars, maxLength) => {
  if (str?.length <= maxLength) {
    return str;
  }
  const startText = str?.slice(0, startChars);
  const endText = str?.slice(-endChars);
  return `${startText}....${endText}`;
};

export const formatDateTime = (timestamp) => {
  return moment(timestamp).format("DD MMM YYYY | HH:mm");
};

export function bytesToGigabytes(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

export function calculateAndDisplayTimeDifference(publishedDate) {
  const currentDate = new Date();
  const givenDateObj = new Date(publishedDate);

  const millisecondsDiff = currentDate - givenDateObj;
  const seconds = Math.abs(millisecondsDiff / 1000);
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 30; // Approximation
  const years = days / 365; // Approximation

  if (years > 1) {
    return `${years.toFixed(0)} years`;
  } else if (months > 1) {
    return `${months.toFixed(0)} months`;
  } else if (days > 1) {
    return `${days.toFixed(0)} days`;
  } else if (hours > 1) {
    return `${hours.toFixed(0)} hours`;
  } else if (minutes > 1) {
    return `${minutes.toFixed(0)} minutes`;
  } else {
    return `${seconds.toFixed(0)} seconds`;
  }
}


export default copyTextToClipboard;