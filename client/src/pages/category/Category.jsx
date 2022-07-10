import "./category.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Posts from "../../components/posts/Posts";
import Sidebar from './../../components/sidebar/Sidebar';

export default function Category() {
  const {category} = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/posts/?cat=" + category);
        setPosts(res.data);
      } catch (err) { }
    }
    fetchProfile()
    //eslint-disable-next-line
  }, [])
  
  return (
    <div>
      { posts.length>0 && <div className="post-section2">
        { posts.length>0 && <span className="all-posts-title2">All posts with tag {category}: </span> }
        <div className="home-tab">
          <Posts posts={posts} />
          <Sidebar />
        </div>
      </div> }
    </div>
  );
}
