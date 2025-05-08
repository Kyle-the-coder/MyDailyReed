import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";
import { getBlogById, updateBlog } from "../../../utils/blogApi";
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
        if (user) {
          console.log(response);
          const hasLiked = response.likes.includes(user.uid);
          setIsLike(hasLiked);
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
    if (!user) return; // maybe prompt login

    const uid = user.uid;
    const hasLiked = blog.likes.includes(uid);

    const updatedLikes = hasLiked
      ? blog.likes.filter((id) => id !== uid)
      : [...blog.likes, uid];

    const updatedBlog = { ...blog, likes: updatedLikes };

    try {
      await updateBlog(id, updatedBlog);
      setBlog(updatedBlog);
      setIsLike(!hasLiked);
    } catch (err) {
      console.error("Failed to update likes:", err);
    }
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || !blog) return;

    const updatedComments = [
      ...blog.comments,
      { name: "Anonymous", text: commentText },
    ];
    const updatedBlog = { ...blog, comments: updatedComments };

    try {
      await updateBlog(id, updatedBlog);
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
              <p>{blog.likes.length || 0} likes</p>
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
        {blog.comments?.map((comment, idx) => (
          <div key={idx} className="comments silver-bg">
            <h1 className="commenter-name outfit-font">
              {comment.name || "Reader"}:
            </h1>
            <p className="comment outfit-font">{comment.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
