import { supportedMimes } from "../config/fileSystem.js";
import { v4 as uuidv4 } from 'uuid';

export const imageValidator = (size, mime) => {
  if (bytesToMb(size) > 2) {
    return "Image size must be less than 2 MB";
  } else if (!supportedMimes.includes(mime)) {
    return "Image must be a jpeg, png, gif, svg, jpg, or webp.";
  } else {
    return true;
  }
};

export const bytesToMb = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

export const generateRandomNum = () => {
  return uuidv4();
};
