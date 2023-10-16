import React from "react";
import { useState } from "react";
import axios from "axios";
// import UploadImage from "../components/UploadImage";
import GetImageTest from "../components/GetImageTest";
// import ImageForm from "../components/ImageForm";

function TestPicture() {
  const [files, setFiles] = useState([]);

  //   const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData(); // FormData is needed to send multipart/formData
    files.forEach((file, index) => {
      formData.append("images", file);
    });

    await axios.post("http://localhost:3005/api/pictures", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
