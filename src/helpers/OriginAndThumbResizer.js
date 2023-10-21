import Resizer from "react-image-file-resizer";

const originAndThumbResizer = async (
  file,
  maxWidth,
  maxHeight,
  quality,
  rotation
) => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      "JPEG",
      quality,
      rotation,
      (uri) => {
        resolve({ original: file, resized: uri });
      },
      "file"
    );
  });
};

export default originAndThumbResizer;
