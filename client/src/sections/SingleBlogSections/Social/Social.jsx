import react from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import {
  getBlogById,
  likeBlog,
  removeLikeBlog,
  addCommentToBlog,
} from "../../../utils/blogApi";
import likeFilled from "../../../assets/icons/likeFilled.png";
import likeEmpty from "../../../assets/icons/likeEmpty.png";
import "./social.css";

export function Social() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        setBlog(response);

        const user = getAuth().currentUser;
        if (user && response.likes?.includes(user.uid)) {
          setIsLike(true);
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleLikeToggle = async () => {
    if (!blog) return;
    const user = getAuth().currentUser;
    if (!user) return;

    try {
      if (isLike) {
        await removeLikeBlog(id);
      } else {
        await likeBlog(id);
      }

      // Refresh the blog data to reflect the latest like state
      const updatedBlog = await getBlogById(id);
      setBlog(updatedBlog);
      setIsLike(!isLike);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !blog) return;

    try {
      await addCommentToBlog(id, commentText, "Anonymous");

      const updatedBlog = await getBlogById(id);
      setBlog(updatedBlog);
      setCommentText("");
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <section className="social-main-container">
      <div className="like-and-comment-container">
        <div className="like-and-share">
          <div className="like-container">
            <div className="like">
              <img
                src={isLike ? likeFilled : likeEmpty}
                onClick={handleLikeToggle}
                alt="like button"
              />
              <p>{blog.likes?.length || 0} likes</p>
            </div>
            <h1 className="outfit-font">Leave a like</h1>
          </div>

          <div className="share-container">
            <h1 className="outfit-font">Share This:</h1>
            <div>
              <WordButton text="X" fontSize=".8rem" />
              <WordButton text="Facebook" fontSize=".8rem" />
            </div>
          </div>
        </div>

        <div className="leave-comment">
          <h1 className="outfit-font">Leave a Comment:</h1>
          <textarea
            className="outfit-font silver-bg"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="leave a comment..."
          />
          <WordButton
            text="Submit"
            margin="0 auto"
            fontSize="1.3rem"
            onClick={handleCommentSubmit}
          />
        </div>
      </div>

      <div className="comment-container">
        <h1 className="outfit-font">Comments:</h1>
        <div className="comments silver-bg">
          {blog.comments?.map((comment, idx) => (
            <react.Fragment key={idx}>
              <h1 className="commenter-name outfit-font">
                {comment.name || "Reader"}:
              </h1>
              <p className="comment outfit-font">{comment.comment}</p>
            </react.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
