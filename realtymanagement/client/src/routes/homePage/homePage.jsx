import './homePage.scss';
import bg from "./bg.png";
import SearchBar from '../../components/searchBar/searchBar';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

const HomePage = () => {

  const {currentUser} = useContext(AuthContext)

return(
   
   <div className="homePage">
    <div className="textContainer">
        <div className="wrapper">
      <h1 className="title">Your dream home is just a click away!</h1>
      <p>
      Explore our extensive listings of properties, tailored to fit every lifestyle and budget. Whether you're searching for a cozy city apartment, a spacious suburban house, or a luxurious estate, our real estate experts are here to help every step of the way.
      </p>
      <SearchBar/>
      <div className="boxes">
        <div className="box">
          <h1>16+</h1>
          <h2>Years of Experience</h2>
        </div>
        <div className="box">
          <h1>200</h1>
          <h2>Award Gained</h2>
        </div>
        <div className="box">
          <h1>1200+</h1>
          <h2>Propert Ready</h2>
        </div>
      </div>
        </div>
        </div>
    <div className="imgContainer">
        <img src={bg} alt=""/>
    </div>
   </div>
)

}
export default HomePage;