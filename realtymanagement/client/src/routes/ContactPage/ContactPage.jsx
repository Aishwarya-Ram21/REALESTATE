import React from 'react';
import './ContactPage.scss';
import { Google, Twitter, Instagram, Facebook } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import image from './4542107.jpg';

function ContactPage() {
  return (
    <div className="contact">
      <div className="formContainer">
        <div className="textContainer">
          <h3>Contact Us</h3>
          <p>
            We would love to hear from you!
          </p>
          <form className="contactForm">
            <div className="formGroup">
              <label htmlFor="firstName">Name</label>
              <input type="text" id="firstName" name="firstName" required />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="formGroup">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" required />
            </div>
            <div className="formGroup">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Please enter your message..." required></textarea>
            </div>
            <div className="btn-wrapper">
              <button type="submit" className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
        <div className="imgContainer">
          <img src={image} alt="Contact Background" />
        </div>
      </div>
      <div className="socialIcons">
        <IconButton color="primary" href="https://google.com" target="_blank" rel="noopener noreferrer">
          <Google />
        </IconButton>
        <IconButton color="primary" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter />
        </IconButton>
        <IconButton color="primary" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram />
        </IconButton>
        <IconButton color="primary" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook />
        </IconButton>
      </div>
    </div>
  );
}

export default ContactPage;
