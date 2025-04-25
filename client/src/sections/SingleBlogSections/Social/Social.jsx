import likeEmpty from "../../../assets/icons/likeEmpty.png";
import { WordButton } from "../../../components/Buttons/WordButton/WordButton";

import "./social.css";

export function Social() {
  return (
    <section className="social-main-container">
      <div className="flex-between">
        <div className="like-and-share">
          <div className="like-container">
            <div className="like">
              <img src={likeEmpty} />
              <p>100 likes</p>
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

      <div className="comment-container"></div>
    </section>
  );
}
