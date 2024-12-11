import "./AboutPage.scss";
import bg from "../homePage/bg.png";

function AboutPage() {
  return (
    <div className="about">
      <div className="textContainer">
        <br></br>
        <br></br>
        <h1>About Us</h1>
        
        <br></br>
        <p>
        At NobleNest, we are dedicated to transforming your real estate dreams into reality with our extensive experience and unwavering commitment to excellence. With over 27 years in the industry, our seasoned professionals leverage deep local insights and a personalized approach to guide you through every step of buying, selling, or renting a property. We pride ourselves on providing a seamless and enjoyable experience, whether you’re searching for your first home, a luxurious estate, or a strategic investment. Our diverse portfolio of properties caters to every lifestyle and budget, ensuring you find the perfect match. At NobleNest, our mission is to deliver exceptional service with integrity and transparency, empowering you to make informed decisions and achieve your real estate goals with confidence. Discover how our expertise and dedication can make your real estate journey both rewarding and stress-free.ark on your real estate journey with confidence. <a href="/contact">Contact</a> us today to discover how our expertise and dedication can help you find the perfect property to call home.
        </p>
      </div>
      <div className="imgContainer">
        <img src={bg} alt="Background" />
      </div>
    </div>
  );
}

export default AboutPage;
