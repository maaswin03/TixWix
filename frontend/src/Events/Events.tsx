import { useEffect, useState, MouseEventHandler } from "react";
import axios from "axios";
import "../Events/Events.css";
import Navbar from "@/Component/Navbar";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import Footer from "../Component/Footer";
import { useUser } from '@clerk/clerk-react';

interface ResponseData {
  text: string;
}

interface EventData {
  _id: string;
  name: string;
  date: string;
  locations: string;
  price: string;
  event_type: string;
  description: string;
}

interface RazorpayOptions {
  key: string;
  key_secret: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

function CropAi() {
  const text = "";
  const [cleanedResponse, setCleanedResponse] = useState<string>("");
  const [sensorData, setSensorData] = useState<EventData[]>([]);
  const d1 = useQuery(api.myFunctions.allevents)

  const {user} = useUser();
  const handleSubmit1 = (amount: number) => {
    if (amount === 0) {
      alert('Please enter an amount');
    } else {
      const options: RazorpayOptions = {
        key: 'rzp_test_sz6vXhYYcZATwz',
        key_secret: 'Z4OjloVh5GUOpbya26cCKMt7',
        amount: amount * 100,
        currency: 'INR',
        name: 'AgriSense',
        description: 'for testing purpose',
        prefill: {
          name: user?.fullName || 'Unknown',
          email: user?.primaryEmailAddressId || 'Unknown',
          contact: user?.primaryPhoneNumberId || 'Unknown',
        },
        notes: {
          address: 'Razorpay Corporate office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const pay = new (window as any).Razorpay(options);
      pay.open();
    }
  };

  const handleAmount1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit1(200);
  };


  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post<ResponseData>("http://localhost:5100/recommend", {
        prompt: text,
      });
      const responseText = res.data.text;

      console.log(text)

      const cleanedResponse = responseText.replace(/\*/g, '');

      setCleanedResponse(cleanedResponse);

    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (d1 && Array.isArray(d1)) {
      setSensorData(d1);
      console.log(d1); 
    }
  }, [d1]);

  useEffect(() => {
    console.log(sensorData);
  }, [sensorData]);

  return (
    <div>
      <Navbar />
      <div className="crop6">
        <div className="crop7">
          <h1>Our Ai Recommendation</h1>
          <p>Click on the below button to get the recommendation based .</p>
        </div>
      </div>

      <div className="crop21">
        <div className="crop22" style={{ whiteSpace: 'pre-line' }}>
          {cleanedResponse ? <p>{cleanedResponse}</p> : <p>Please Click the button below to get your event recommendation</p>}
        </div>
        <button onClick={handleSubmit}>Get your Event recommendation</button>
      </div>

      <div className="crop6">
        <div className="crop7">
          <h1>Explore Recent Events</h1>
          <p>Below are the recent events in different Areas</p>
        </div>
      </div>

      <div className="crop8">
        <div className="crop9">
          <div className="crop10">
            <a href="#">All Events</a>
            <a href="#">Social Gatherings</a>
            <a href="#">Local Events</a>
            <a href="#">Music Concerts</a>
          </div>
        </div>
      </div>


      <div className="crop1">
        <div className="crop2">
          {d1 && Array.isArray(d1) ? (
            d1.map((item) => (
              <div className="crop3" key={item._id}>
                <h2>{item.name}</h2>
                <div className="crop4">
                  <span style={{ fontWeight: "600" }}>
                    Date:{" "}
                  </span>
                  <span style={{color: "#4F7D96" }}>{item.date}</span>
                  <br />
                  <span style={{ fontWeight: "600" }}>
                    Location :{" "}
                  </span>
                  <span style={{color: "#4F7D96" }}>{item.locations}</span>
                  <br />
                  <span style={{ fontWeight: "600" }}>
                    Ticket Price:{" "}
                  </span>
                  <span style={{color: "#4F7D96" }}>{item.price} </span>
                  <br />
                  <span style={{ fontWeight: "600" }}>
                    Event Type:{" "}
                  </span>
                  <span style={{color: "#4F7D96" }}>
                    {item.event_type}
                  </span>
                  <br />
                  <p>{item.description}</p>
                  <button onClick={handleAmount1} id="hello">Book Now</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontFamily: 'Poppins', marginTop: '3%' }}>Loading data</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CropAi;
