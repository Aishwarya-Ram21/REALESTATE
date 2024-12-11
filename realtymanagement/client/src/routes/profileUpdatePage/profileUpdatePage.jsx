import { useContext,useState} from "react";
import "./profileUpdatePage.scss";
import { AuthContext} from "../../context/AuthContext";
import noavatar from "../profilePage/noavatar.jpg";
import apiRequest from "../../lib/apiRequest";
import {useNavigate} from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget.jsx";


function ProfileUpdatePage() {
  const [error,setError] = useState("")
  const {currentUser,updateUser} = useContext(AuthContext);
  const [avatar,setAvatar] = useState([])

  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    const formData = new FormData(e.target)

    const {username,email,password,phoneNumber}= Object.fromEntries(formData);

    try{

      const res = await apiRequest.put(`/users/${currentUser.id}`,{
        username,
        email,
        password,
        phoneNumber,
        avatar:avatar[0]
    });

    updateUser(res.data);
    navigate("/profile")
    console.log(res.data);
    }catch(err){
      console.log(err);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <div className="item">
    <label htmlFor="phoneNumber">Phone Number</label>
    <input
      id="phoneNumber"
      name="phoneNumber"
      type="text"
      pattern="\d{10}" // Ensures the phone number is exactly 10 digits
      defaultValue={currentUser.phoneNumber} // Assuming phoneNumber is available in currentUser
    />
  </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img 
        src={avatar[0] || currentUser.avatar|| noavatar} 
        alt="" 
        className="avatar" 
        />
        <UploadWidget
        setState={setAvatar}
        
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;