import Resizer from "react-image-file-resizer";

const imageFileResizer = async (
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
        resolve(uri);
      },
      "file"
    );
  });
};

export default imageFileResizer;
