import { useState } from "react";
import likeEmpty from "../../../assets/icons/likeEmpty.png";
import likeFilled from "../../../assets/icons/likeFilled.png";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";

import "./social.css";

export function Social() {
  const [isLike, setIsLike] = useState(false);
  return (
    <section className="social-main-container">
      <div className="like-and-comment-container">
        <div className="like-and-share">
          <div className="like-container">
            <div className="like">
              <img
                src={isLike ? likeFilled : likeEmpty}
                onClick={() => setIsLike(!isLike)}
              />
              <p>{isLike ? "101 likes" : "100 likes"}</p>
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
            type="text"
            placeholder="leave a comment..."
          />
          <WordButton text="Submit" margin="0 auto" fontSize="1.3rem" />
        </div>
      </div>

      <div className="comment-container">
        <h1 className="outfit-font">Comments:</h1>
        <div className="comments silver-bg">
          <h1 className="commenter-name outfit-font">Reader1:</h1>
          <p className="comment outfit-font">I love this article</p>
        </div>
      </div>
    </section>
  );
}
