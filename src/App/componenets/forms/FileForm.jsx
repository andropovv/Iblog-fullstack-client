import React from "react";
import instance from "../../axios";

const FileForm = ({ name, onChange, label }) => {
  const handleChange = async ({ target }) => {
    try {
      const formData = new FormData();
      formData.append("image", target.files[0]);
      const { data } = await instance.post("/upload", formData);
      onChange({
        name: target.name,
        value: `${process.env.REACT_APP_API_URL}${data.url}`,
      });
    } catch (error) {
      console.log(`Ошибка при загрузке изображения. \n ${error.message}`);
    }
  };

  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="file_input"
      >
        {label}
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
        id={name}
        name={name}
        type="file"
        placeholder={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileForm;
