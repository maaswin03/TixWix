import React, { useState } from "react";
import Navbar from "@/Component/Navbar"; 
import Footer from "@/Component/Footer"; 
import axios from "axios";
import "./Hostevents.css"; 

interface EventData {
  name: string;
  date: string;
  location: string;
  price: string;
  eventType: string;
  description: string;
}

const HostEvent = () => {
  const [formData, setFormData] = useState<EventData>({
    name: "",
    date: "",
    location: "",
    price: "",
    eventType: "",
    description: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/events", formData);
      console.log(response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting the event", error);
    }
  };



  return (
    <div>
      <Navbar />
      <div className="host-event-container">
        <h1>Host a New Event</h1>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-group">
              <label htmlFor="name">Event Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventType">Event Type:</label>
              <input
                type="text"
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Submit Event</button>
          </form>
        ) : (
          <div className="success-message">
            <h2>Your event has been submitted successfully!</h2>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HostEvent;
