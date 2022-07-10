import "./profile.css";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import { useParams } from "react-router-dom";
import axios from "axios";
import Posts from "../../components/posts/Posts";
import Sidebar from './../../components/sidebar/Sidebar';

export default function Profile() {
  const { user } = useContext(Context);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    profilePic: '',
    createdAt: ''
  })
  const [username, setUsername] = useState(useParams().username)
  const [email, setEmail] = useState('')
  const [posts, setPosts] = useState([])
  const [editMode, setEditMode] = useState(false)
  const PF = "http://localhost:5000/images/"

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/users/" + username);
        setProfile(res.data);
        setEmail(res.data.email)
      } catch (err) { }
      try {
        const res = await axios.get("/posts/?user=" + username);
        setPosts(res.data);
      } catch (err) { }
    }
    fetchProfile()
    //eslint-disable-next-line
  }, [username])
  
  return (<>
    { profile && <div>
      { user?.username===profile.username && editMode ? <>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          className="profile-img"
          // onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          value={username}
          className=""
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          className=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </> :
      <>
        { profile.profilePic !== "" ? (
          <img className="profile-img" src={PF+profile.profilePic} alt="" />
        ) : (
          <img className="profile-img" src={PF+'default-profile.png'} alt="" />
        )}
        <div className="details">
          <div className="profile-name">{profile.username}</div>
          <div className="profile-email">{profile.email}</div>
          <div className="profile-created-at">Created on : {new Date(profile.createdAt).toDateString()}</div>
        </div>
      </> }

      { user?.username===profile.username && <span className="edit-option" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'cancel' : 'edit profile'}
        </span>}

      { posts.length>0 && <div className="post-section">
        { posts.length>0 && <span className="all-posts-title">All posts by me:</span> }
        <div className="home-tab-profile">
          <Posts posts={posts} />
          <Sidebar />
        </div>
      </div> }

    </div> }
  </>);
}
