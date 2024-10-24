import Navbar from '../Component/Navbar'
import { useEffect, useState } from 'react';
import '../Home/Home.css'
import Footer from '../Component/Footer'
import image1 from '../images/image.png'
import m1 from '../images/jack.png'
import m2 from '../images/gettyimages-858141682.jpg'
import m3 from '../images/gabriel.png'
import p2 from '../images/image.png'
import p1 from '../images/local.png'
import p3 from '../images/musicconcerts.png'
import p4 from '../images/sports.png'
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';


function Home() {
    const mutateSomething = useMutation(api.myFunctions.createTask);
    const { isSignedIn, user, isLoaded } = useUser();
    const [animated, setAnimated] = useState(false);

    const numberWithCommas = (x: Number) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const handleScroll = () => {
        const gotoElement = document.querySelector(".goto");
        const countElements = document.querySelectorAll(".count");

        if (gotoElement && countElements.length) {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const gotoOffsetTop = gotoElement.getBoundingClientRect().top + scrollTop;

            if (scrollTop >= gotoOffsetTop - windowHeight && !animated) {
                countElements.forEach((el) => {
                    const target = parseInt(el.getAttribute("data-target") ?? "0", 10);
                    let counter = 0;

                    const incrementCount = () => {
                        if (counter < target) {
                            counter += Math.ceil(target / 1000);
                            el.textContent = numberWithCommas(counter);
                            requestAnimationFrame(incrementCount);
                        } else {
                            el.textContent = numberWithCommas(target);
                        }
                    };

                    incrementCount();
                });

                setAnimated(true);
            }
        }
    };

    useEffect(() => {
        const addUserToDatabase = async () => {
            if (!isLoaded) {
                return;
            }

            if (isSignedIn && user) {
                try {
                    await mutateSomething({
                        name: user.fullName || 'Unknown',
                        email: user.primaryEmailAddressId || 'Unknown',
                    });
                    console.log('User added to database successfully');
                } catch (error) {
                    console.error('Error adding user to database:', error);
                }
            }
        };

        addUserToDatabase();

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isSignedIn, user, isLoaded, mutateSomething, animated]);


    return (
        <div>
            <Navbar />

            <div className="home1">
                <div className="home2">
                    <div className="home3">
                        <h1>Redefining Entertainment, One Ticket at a Time</h1>
                        <p>
                            Discover our exclusive selection of top-rated movies, live shows, and events. Curated with care, these experiences guarantee unforgettable entertainment. Find the perfect show for your mood and elevate your experience with BookMyShow.

                        </p>
                        <div className="home4">
                            <button id="home4"><Link to="/dashboard">Go to the dashboard</Link></button>
                        </div>
                    </div>
                    <div className="home3 home555">
                        <img
                            src={image1}
                            className="bottom-image"
                            style={{ width: "70%" }}
                        />
                    </div>
                </div>
            </div>

            <div className="home5">
                <h2>Experience Live Events</h2>
                <p>Hurry,explore our range of the fun events</p>
                <div className="home6">
                    <div className="home7">
                        <div className="home9">
                            <img
                                src={p1}
                                width="100%"
                                style={{
                                    borderTopLeftRadius: "10px",
                                    borderTopRightRadius: "10px",
                                }}
                            />
                        </div>
                        <div className="home11">
                            <h3>Local events</h3>
                            <p>
                                Discover exciting local events happening around you. From festivals to community meet-ups, there's always something fun to explore nearby!
                            </p>
                        </div>
                    </div>
                    <div className="home7">
                        <div className="home9">
                            <img
                                src={p2}
                                width="100%"
                                style={{
                                    borderTopLeftRadius: "10px",
                                    borderTopRightRadius: "10px",
                                }}
                            />
                        </div>
                        <div className="home11">
                            <h3>Social gatherings</h3>
                            <p>
                                Connect and celebrate with like-minded people at exciting social gatherings near you.
                            </p>
                        </div>
                    </div>
                    <div className="home7">
                        <div className="home9">
                            <img src={p3} width="100%" />
                        </div>
                        <div className="home11">
                            <h3> Music Concerts</h3>
                            <p>Feel the rhythm live with the biggest music concerts in town. Book your spot for an unforgettable night!
                            </p>
                        </div>
                    </div>
                    <div className="home7">
                        <div className="home9">
                            <img src={p4} width="100%" />
                        </div>
                        <div className="home11">
                            <h3>All Experiences</h3>
                            <p>
                                Explore a world of entertainment! From concerts to theater, find all your favorite experiences in one place.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home15">
                <h2>Our Metrics Tell the Story</h2>
                <p style={{ textAlign: 'left', marginLeft: '2%' }}>
                    Get real-time updates on your bookings and stay informed about the latest events and shows, all in one place.
                </p>
                <div className="goto home16">
                    <div className="home17">
                        <div className="home18">
                            <h1>
                                <span className="count" data-target="30">
                                    0
                                </span>
                                <span>%</span>
                            </h1>
                            <p>Increase in ticket bookings</p>
                        </div>
                    </div>
                    <div className="home17">
                        <div className="home18">
                            <h1>
                                <span className="count" data-target="95">
                                    0
                                </span>
                                <span>%</span>
                            </h1>
                            <p>Customer satisfaction rating</p>
                        </div>
                    </div>
                    <div className="home17">
                        <div className="home18">
                            <h1>
                                <span className="count" data-target="40">
                                    0
                                </span>
                                <span>%</span>
                            </h1>
                            <p>More events available</p>
                        </div>
                    </div>
                    <div className="home17">
                        <div className="home18">
                            <h1>
                                <span className="count" data-target="9">
                                    0
                                </span>
                                <span>k+</span>
                            </h1>
                            <p>Live shows and concerts hosted</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="home20">
                <h2>Real Stories from Satisfied Customers</h2>
                <p>
                Our review section gives you insights into your experiences and helps you stay informed about the best events and shows in style
                </p>
                <div className="home21">
                    <div className="wrapper">
                        <div className="review-card">
                            <div className="header-content">
                                <div className="img-area">
                                    <img alt="customer1" src={m3} />
                                </div>
                                <div className="info">
                                    <h4>Gabriel</h4>
                                    <p>A customer since 2020</p>
                                </div>
                            </div>
                            <div className="single-review">
                                <p>
                                    "BookMyShow makes it so easy to find and book tickets for movies and events! The interface is user-friendly, and I love the variety of options available."
                                </p>
                            </div>
                            <div className="review-footer">
                                <div className="rating">
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                </div>
                                <p>Reviewed on 15/09/2024</p>
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="header-content">
                                <div className="img-area">
                                    <img alt="customer2" src={m1} />
                                </div>
                                <div className="info">
                                    <h4>Jacksparrow</h4>
                                    <p>A customer since 2019</p>
                                </div>
                            </div>
                            <div className="single-review">
                                <p>
                                    "I had a great experience booking tickets for a concert. The process was smooth, and I received all the updates promptly. Highly recommend!"
                                </p>
                            </div>
                            <div className="review-footer">
                                <div className="rating">
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span>★</span>
                                </div>
                                <p>Reviewed on 11/09/2024</p>
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="header-content">
                                <div className="img-area">
                                    <img alt="customer3" src={m2} />
                                </div>
                                <div className="info">
                                    <h4>Jacky chan</h4>
                                    <p>A customer since 2024</p>
                                </div>
                            </div>
                            <div className="single-review">
                                <p>
                                    "Fantastic platform! I love the exclusive offers and discounts. It’s my go-to for planning outings with friends and family also recommend for others!"
                                </p>
                            </div>
                            <div className="review-footer">
                                <div className="rating">
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                    <span className="active">★</span>
                                </div>
                                <p>Reviewed on 13/07/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default Home