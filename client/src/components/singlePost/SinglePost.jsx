import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";

export default function SinglePost({id}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + id);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
    // eslint-disable-next-line
  }, []);

  const handleDelete = async () => {
    if(window.confirm("You sure want to delete this post?")) {
      try {
        await axios.delete(`/posts/${post._id}`, {
          data: { username: user.username },
        });
        window.location.replace("/");
      } catch (err) {}
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="single-post">
      {post.photo && (
        <img src={PF + post.photo} alt="" className="single-post-image" />
      )}
      {updateMode ? (<>
        <input
          type="text"
          value={title}
          className="single-post-title-input"
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="single-post-desc-input"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </>) : (<>
        <h1 className="single-post-title">
          {title}
          {post.username === user?.username && (
            <div className="single-post-edit">
              <i
                className="single-post-icon far fa-edit"
                onClick={() => setUpdateMode(true)}
              ></i>
              <i
                className="single-post-icon far fa-trash-alt"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </h1>
        <p className="single-post-desc">{desc}</p>
      </>)}
      <div className="single-post-info">
        <span className="single-post-author">
          Author:
          <Link to={`/profile/${post.username}`} className="link">
            <b> {post.username}</b>
          </Link>
        </span>
        <span className="single-post-date">
          Lst updated: {new Date(post.updatedAt).toDateString()}
        </span>
      </div>
      {updateMode && (<>
        <button className="single-post-button-cancel" onClick={()=>setUpdateMode(false)}>
          cancel
        </button>
        <button className="single-post-button-update" onClick={handleUpdate}>
          Update
        </button>
        </>)}
    </div>
  );
}
