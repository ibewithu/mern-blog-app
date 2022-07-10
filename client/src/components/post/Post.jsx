import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      <div className="author-tab">Author: <Link to={`/profile/${post.username}`} className="author-name">{post.username}</Link></div>
      {post.photo && <img className="post-image" src={PF + post.photo} alt="" />}
      <div className="post-info">
        <Link to={`/post/${post._id}`} className="link">
          <span className="post-title">{post.title}</span>
        </Link>
        <span className="post-date">
          Last updated on: {new Date(post.updatedAt).toDateString()}
        </span>
      </div>
      <p className="post-desc">{post.desc}</p>
        { post.categories.length>0 && <div className="post-cats">
          categories: {post.categories.map((c, i) => (
            <Link to={`/posts/${c}`} className="post-cat" key={i}>{c}</Link>
          ))}
      </div> }
    </div>
  );
}
