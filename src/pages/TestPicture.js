import React from "react";
import { useState } from "react";
import axios from "axios";
import GetImageTest from "../components/GetImageTest";
// import originAndThumbResizer from "../helpers/OriginAndThumbResizer";
import imageFileResizer from "../helpers/ImageFileResizer";

function TestPicture() {
  const [files, setFiles] = useState([]);

  //   const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    const propertyId = 14; //hardcoded for testing
    const formData = new FormData(); // FormData is needed to send multipart/formDatA

    // Resize and append both original and resized files to FormData
    // for (const file of files) {
    //   const resizedImage = await originAndThumbResizer(file, 350, 300, 100, 0);
    //   formData.append("originalImages", resizedImage.original);
    //   formData.append("resizedImages", resizedImage.resized);
    //   console.log("=====resizedImage=====", resizedImage);
    // }
    for (const file of files) {
      const resizedImage = await imageFileResizer(file, 350, 300, 100, 0);
      formData.append("images", resizedImage);
      console.log("=====resizedImage=====", resizedImage);
    }

    formData.append("propertyId", propertyId);
    console.log("=====formData=====", formData);

    await axios.post(
      `${process.env.REACT_APP_HOST_URL}/api/pictures/addThumbnail`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setFiles([]);

    // navigate("/");
  };

  const fileSelected = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className="flex flex-col space-y-5 px-5 py-14"
      >
        <input
          onChange={fileSelected}
          type="file"
          accept="image/*"
          multiple
        ></input>

        <button type="submit">Submit</button>
      </form>
      {/* <UploadImage />
      <GetImageTest /> */}
      {/* <ImageForm /> */}
      <GetImageTest />
    </div>
  );
}

export default TestPicture;
