import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import { useParams } from 'react-router-dom';

export default function Single() {
  const {id} = useParams()
  return (
    <div className="single">
      <SinglePost id={id}/>
      <Sidebar />
    </div>
  );
}
