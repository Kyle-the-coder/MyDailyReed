import { uploadImageToFirebase } from "../../utils/uploadImage";
import { useState } from "react";
import { PostLoader } from "../../components/Loader/PostLoader/PostLoader";
import TiptapEditor from "../../components/TipTap/TiptapEditor";
import { postBlogToFirestore } from "../../utils/blogApi";
import menu from "../../assets/icons/formIcons/menu.png";
import submit from "../../assets/icons/formIcons/check.png";
import description from "../../assets/icons/formIcons/description.png";
import image from "../../assets/icons/formIcons/image.png";
import article from "../../assets/icons/formIcons/content-writing.png";
import redirect from "../../assets/icons/formIcons/shuffle.png";
import "./createblog.css";

export function CreateBlog() {
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [expandIcons, setExpandIcons] = useState(false);
  const [formArray, setFormArray] = useState([]);
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [readTime, setReadTime] = useState(null);
  const [categories, setCategories] = useState([]);
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

    if (updated[index].type === "Image" && content instanceof File) {
      const previewURL = URL.createObjectURL(content);
      setImagePreviews((prev) => ({ ...prev, [index]: previewURL }));
    }
  };

  const renderFormField = (field, index) => {
    switch (field.type) {
      case "Description":
      case "Article":
        return (
          <div
            style={{ marginBottom: "100px" }}
            key={index}
            className="display-column"
          >
            <label
              style={{ fontSize: "1.5rem" }}
              className="input-label outfit-font"
            >
              {field.type}
            </label>
            <TiptapEditor onChange={(val) => handleChange(index, val)} />
          </div>
        );
      case "Redirect":
        return (
          <div
            style={{ marginBottom: "100px" }}
            key={index}
            className="display-column"
          >
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
          <div
            style={{ marginBottom: "100px" }}
            key={index}
            className="display-column"
          >
            <label className="input-label outfit-font">Upload Image</label>
            <input
              className="input-file"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(index, e.target.files[0])}
            />
            {imagePreviews[index] && (
              <img
                src={imagePreviews[index]}
                alt="Preview"
                style={{
                  maxWidth: "200px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let photoUrl = null;

    try {
      const photoInput = document.querySelector('input[type="file"]');
      if (photoInput?.files[0]) {
        photoUrl = await uploadImageToFirebase(photoInput.files[0]);
      }

      const processedContent = await Promise.all(
        formArray.map(async (field) => {
          if (field.type === "Image" && field.value instanceof File) {
            const uploadedUrl = await uploadImageToFirebase(field.value);
            return { ...field, value: uploadedUrl };
          }
          return field;
        })
      );

      const blogPayload = {
        title,
        subTitle,
        partName: part,
        partUrl: part ? `part-${part}` : null,
        author,
        readTime,
        imgUrl: photoUrl,
        content: processedContent,
        categories,
      };

      const blogId = await postBlogToFirestore(blogPayload);
      alert(`Blog created successfully! ID: ${blogId}`);
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("Failed to submit blog");
    } finally {
      setIsLoading(false);
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
            <label className="input-label outfit-font">Author:</label>
            <input
              className="input playfair-font"
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Read Time:</label>
            <input
              className="input playfair-font"
              type="text"
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Categories:</label>
            <input
              className="input playfair-font"
              type="text"
              placeholder="e.g. Monday Devotion, Tuesday Article"
              onChange={(e) =>
                setCategories(
                  e.target.value
                    .split(",")
                    .map((cat) => cat.trim())
                    .filter((cat) => cat !== "")
                )
              }
            />
            {categories.length > 0 && (
              <div className="category-container outfit-font">
                Categories:
                {categories.map((cat) => (
                  <div key={cat} className="cat silver-bg">
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Photo:</label>
            <input
              className="input-file"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setMainImagePreview(URL.createObjectURL(file));
                }
              }}
            />
            {mainImagePreview && (
              <img
                src={mainImagePreview}
                alt="Main preview"
                style={{
                  maxWidth: "200px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>

          <div className="form-array-container">
            {formArray.map((field, index) => renderFormField(field, index))}
            <div className="add-to-array">
              <img
                className="form-icon menu-icon off-white-bg"
                src={menu}
                onClick={() => setExpandIcons(!expandIcons)}
              />
              {isLoading ? (
                <div className="post-loader-container">
                  <PostLoader />
                </div>
              ) : (
                <img
                  className="form-icon submit-icon off-white-bg"
                  src={submit}
                  onClick={handleSubmit}
                />
              )}
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
