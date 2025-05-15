import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { uploadImageToFirebase } from "../../utils/uploadImage";
import { PostLoader } from "../../components/Loader/PostLoader/PostLoader";
import TiptapEditor from "../../components/TipTap/TiptapEditor";
import menu from "../../assets/icons/formIcons/menu.png";
import submit from "../../assets/icons/formIcons/check.png";
import description from "../../assets/icons/formIcons/description.png";
import image from "../../assets/icons/formIcons/image.png";
import article from "../../assets/icons/formIcons/content-writing.png";
import redirect from "../../assets/icons/formIcons/shuffle.png";

export function EditBlog() {
  const { blogId } = useParams();

  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [expandIcons, setExpandIcons] = useState(false);

  const [formArray, setFormArray] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [readTime, setReadTime] = useState("");
  const [categories, setCategories] = useState([]);
  const [subTitle, setSubTitle] = useState("");
  const [part, setPart] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  const formIconArray = [
    { img: description, type: "Description", label: "Description" },
    { img: redirect, type: "Redirect", label: "Redirect Link" },
    { img: article, type: "Article", label: "Article Content" },
    { img: image, type: "Image", label: "Image Upload" },
  ];

  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      console.log("loading");
      try {
        const blogRef = doc(db, "blogs", blogId);
        const docSnap = await getDoc(blogRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || "");
          setSubTitle(data.subTitle || "");
          setAuthor(data.author || "");
          setReadTime(data.readTime || "");
          setPart(data.part || "");
          setCategories(data.categories || []);
          setImgUrl(data.imgUrl || null);
          setFormArray(data.content || []);
          setMainImagePreview(data.imgUrl || null);
        } else {
          console.error("Blog not found.");
        }
      } catch (error) {
        console.error("Error loading blog:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleAddField = (type) => {
    if (type === "Redirect") {
      setFormArray((prev) => [
        ...prev,
        { type, value: { partName: "", partUrl: "" } },
      ]);
    } else {
      setFormArray((prev) => [...prev, { type, value: "" }]);
    }
    setExpandIcons(false);
  };

  const handleChange = (index, content, key = null) => {
    const updated = [...formArray];
    if (key && typeof updated[index].value === "object") {
      updated[index].value = {
        ...updated[index].value,
        [key]: content,
      };
    } else {
      updated[index].value = content;
    }

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
            key={index}
            style={{ marginBottom: "100px" }}
            className="display-column"
          >
            <label
              className="input-label outfit-font"
              style={{ fontSize: "1.5rem" }}
            >
              {field.type}
            </label>
            <TiptapEditor
              content={field.value}
              onChange={(val) => handleChange(index, val)}
            />
          </div>
        );
      case "Redirect":
        return (
          <div
            key={index}
            className="display-column"
            style={{ marginBottom: "100px", padding: "30px 3%" }}
          >
            <label className="input-label outfit-font">Redirect Name</label>
            <input
              className="input"
              type="text"
              value={field.value?.partName || ""}
              onChange={(e) => handleChange(index, e.target.value, "partName")}
              placeholder="Part 3, or Part 1"
              style={{ marginBottom: "30px", padding: "10px 20px" }}
            />
            <label className="input-label outfit-font">Redirect Url</label>
            <input
              className="input"
              type="url"
              value={field.value?.partUrl || ""}
              onChange={(e) => handleChange(index, e.target.value, "partUrl")}
              style={{ padding: "10px 20px" }}
            />
          </div>
        );
      case "Image":
        const preview =
          imagePreviews[index] ||
          (typeof field.value === "string" ? field.value : null);
        return (
          <div
            key={index}
            className="display-column"
            style={{ marginBottom: "100px" }}
          >
            <label className="input-label outfit-font">Upload Image</label>
            <input
              className="input-file"
              type="file"
              accept="image/*"
              onChange={(e) => handleChange(index, e.target.files[0])}
            />
            {preview && (
              <img
                src={preview}
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
    try {
      const photoInput = document.querySelector('input[type="file"]');
      let newMainImageUrl = imgUrl;

      if (photoInput?.files[0]) {
        newMainImageUrl = await uploadImageToFirebase(photoInput.files[0]);
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

      const redirectField = formArray.find(
        (field) => field.type === "Redirect"
      );
      const partName = redirectField?.value?.partName || null;
      const partUrl = redirectField?.value?.partUrl || null;

      const blogPayload = {
        title,
        subTitle,
        author,
        readTime,
        part,
        imgUrl: newMainImageUrl,
        content: processedContent,
        categories,
        partName,
        partUrl,
      };

      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, blogPayload);

      alert("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="create-blog-main">
      <h1 className="outfit-font">Edit Blog</h1>
      <div className="display-column">
        <form className="form">
          <div className="input-container">
            <label className="input-label outfit-font">Title:</label>
            <input
              className="input playfair-font"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">
              Category Title (optional):
            </label>
            <input
              className="input playfair-font"
              type="text"
              value={subTitle}
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
              value={part}
              onChange={(e) => setPart(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Author:</label>
            <input
              className="input playfair-font"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Read Time:</label>
            <input
              className="input playfair-font"
              type="text"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label className="input-label outfit-font">Categories:</label>
            <input
              className="input playfair-font"
              type="text"
              value={categories.join(", ")}
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
                if (file) setMainImagePreview(URL.createObjectURL(file));
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
