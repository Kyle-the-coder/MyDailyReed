import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import { useBlogs } from "../../../utils/useBlogs";
import {
  likeBlog,
  removeLikeBlog,
  addCommentToBlog,
} from "../../../utils/blogApi";

import likeFilled from "../../../assets/icons/likeFilled.png";
import likeEmpty from "../../../assets/icons/likeEmpty.png";
import "./social.css";

export function Social() {
  const { id } = useParams();
  const blogs = useBlogs();
  const originalBlog = blogs.find((b) => b.id === id);

  const [blog, setBlog] = useState(originalBlog || null);
  const [isLike, setIsLike] = useState(false);
  const [commentText, setCommentText] = useState("");

  // Keep local state in sync with context blog
  useEffect(() => {
    if (originalBlog) {
      setBlog(originalBlog);
      const user = getAuth().currentUser;
      setIsLike(user && originalBlog.likes?.includes(user.uid));
    }
  }, [originalBlog]);

  const handleLikeToggle = async () => {
    const user = getAuth().currentUser;
    if (!user || !blog) return;

    try {
      if (isLike) {
        await removeLikeBlog(id);
      } else {
        await likeBlog(id);
      }

      // Update local blog like state optimistically
      setBlog((prev) =>
        prev
          ? {
              ...prev,
              likes: isLike
                ? prev.likes.filter((uid) => uid !== user.uid)
                : [...(prev.likes || []), user.uid],
            }
          : null
      );
      setIsLike(!isLike);
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !blog) return;

    try {
      await addCommentToBlog(id, commentText, "Anonymous");

      // Update local blog comment state optimistically
      setBlog((prev) =>
        prev
          ? {
              ...prev,
              comments: [
                ...(prev.comments || []),
                { comment: commentText, name: "Anonymous" },
              ],
            }
          : null
      );

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
              <WordButton margin="10px 0px 0px 0px" text="X" fontSize=".8rem" />
              <WordButton
                margin="10px 0px 0px 0px"
                text="Facebook"
                fontSize=".8rem"
              />
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
            <div key={idx}>
              <h1 className="commenter-name outfit-font">
                {comment.name || "Reader"}:
              </h1>
              <p className="comment outfit-font">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
