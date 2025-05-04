import { useState } from "react";
import TiptapEditor from "../../components/TipTap/TiptapEditor";
import menu from "../../assets/icons/formIcons/menu.png";
import description from "../../assets/icons/formIcons/description.png";
import image from "../../assets/icons/formIcons/image.png";
import article from "../../assets/icons/formIcons/content-writing.png";
import redirect from "../../assets/icons/formIcons/shuffle.png";
import "./createblog.css";

export function CreateBlog() {
  const [expandIcons, setExpandIcons] = useState(false);
  const [formArray, setFormArray] = useState([]);
  const [title, setTitle] = useState(null);
  const [subTitle, setSubTitle] = useState(null);
  const [part, setPart] = useState(null);

  const formIconArray = [
    { img: description, type: "Description", label: "Description" },
    { img: redirect, type: "Redirect", label: "Redirect Link" },
    { img: article, type: "Article", label: "Article Content" },
    { img: image, type: "Image", label: "Image Upload" },
  ];

  const handleAddField = (type) => {
    setFormArray((prev) => [...prev, { type, value: "" }]);
    setExpandIcons(false);
  };

  const handleChange = (index, content) => {
    const updated = [...formArray];
    updated[index].value = content;
    setFormArray(updated);
  };

  const renderFormField = (field, index) => {
    switch (field.type) {
      case "Description":
      case "Article":
        return (
          <div key={index} className="display-column">
            <label className="input-label outfit-font">{field.type}</label>
            <TiptapEditor onChange={(val) => handleChange(index, val)} />
          </div>
        );
      case "Redirect":
        return (
          <div key={index} className="display-column">
            <label className="input-label outfit-font">Redirect URL</label>
            <input
              className="input"
              type="url"
              value={field.value}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        );
      case "Image":
        return (
          <div key={index} className="display-column">
            <label className="input-label outfit-font">Upload Image</label>
            <input
              className="input-file"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(index, e.target.files[0])}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="create-blog-main">
      <h1 className="outfit-font">Create a Blog</h1>
      <div className="display-column">
        <form className="form">
          <div className="input-container">
            <label className="input-label outfit-font">Title:</label>
            <input
              className="input playfair-font"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">
              Sub-Title (optional):
            </label>
            <input
              className="input playfair-font"
              type="text"
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">
              Part Number (optional):
            </label>
            <input
              className="input-part"
              type="number"
              onChange={(e) => setPart(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Photo:</label>
            <input className="input-file" type="file" accept="image/*" />
          </div>

          <div className="form-array-container">
            {formArray.map((field, index) => renderFormField(field, index))}

            <div className="add-to-array">
              <img
                className="form-icon menu-icon off-white-bg"
                src={menu}
                onClick={() => setExpandIcons(!expandIcons)}
              />
              <div className={`expanded-icons ${expandIcons ? "show" : ""}`}>
                {formIconArray.map((icon, index) => (
                  <img
                    key={index}
                    src={icon.img}
                    title={icon.label}
                    className="form-icon"
                    onClick={() => handleAddField(icon.type)}
                  />
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
