import React from "react";
import { useNavigate } from "react-router-dom";
import Slider1 from "../../img/Slider1.jpg";
import Slider2 from "../../img/Slider2.jpg";
import Slider3 from "../../img/Slider3.jpg";

import News from "../../img/News.jpg";
import Currency from "../../img/Currency.jpg";
import ChatIA from "../../img/ChatIA.png";
import "../../styles/Body.css";

export const Body = () => {
    const navigate = useNavigate();

    return (
        <main>
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={Slider1} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Do you have a project in mind?</h5>
                            <p>We will help you with our AI chat</p>
                            <button type="button" className="btn button-slider" onClick={() => navigate('/news')}>NEWS</button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={Slider2} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>AI will give you the best ideas</h5>
                            <p>Choose a budget for your project, we will give you several ideas for your business</p>
                            <button type="button" className="button-slider" onClick={() => navigate('/advisor')}>ADVISOR</button>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={Slider3} className="d-block w-100" alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>The power of AI in your hands</h5>
                            <p>With AI and your answers we will customize the project that best suits you</p>
                            <button type="button" className="button-slider" onClick={() => navigate('/login')}>LOG IN</button>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="container container-home">
                <div className="container-services my-5">
                    <h6 className="text-center pb-3">BUSINESS</h6>
                    <div className="text-center pb-3 pt-0">
                        <h2>We bring your projects and ideas to <br />life with artificial intelligence</h2>
                        <hr />
                    </div>
                    <div className="row services-cont">
                        <div className="col-lg-4 service pt-1">
                            <lord-icon src="https://cdn.lordicon.com/akbjoiow.json" trigger="loop" colors="primary:#121331,secondary:#00A5CF" stroke="65" state="loop" style={{ width: "90px", height: "90px" }}></lord-icon>
                            <h2>About Us</h2>
                            <p className="justified-text pe-1">At our team, we believe that the best business ideas can come at any time, and we are here to help you bring them to life.</p>
                        </div>
                        <div className="col-lg-4 service pt-1">
                            <lord-icon src="https://cdn.lordicon.com/xajhwwxi.json" trigger="loop" delay="500" colors="primary:#3a3347,secondary:#646e78,tertiary:#00A5CF" style={{ width: "100px", height: "100px" }}></lord-icon>
                            <h2>Service</h2>
                            <p className="justified-text pe-1">We offer a variety of services tailored to specific project needs. Through our chat you can have ideas for ventures immediately.</p>
                        </div>
                        <div className="col-lg-4 service pt-1">
                            <lord-icon src="https://cdn.lordicon.com/emnyyrrn.json" trigger="loop" delay="500" colors="primary:#121331,secondary:#646e78,tertiary:#00A5CF,quaternary:#ebe6ef" style={{ width: "120px", height: "120px" }}></lord-icon>
                            <h2>Contact</h2>
                            <p className="justify-content-start pe-1">Ready to elevate your project? Sign up now to start using AI for free, explore creative solutions.</p>
                        </div>
                    </div>
                </div>
                <div className="price-container">
                    <h6 className="pb-3">PRICING</h6>
                    <div className=" pb-3 pt-0">
                        <h2>We bring your projects and ideas to <br />life with artificial intelligence</h2>
                        <hr />
                    </div>
                    <div className="pricing-container pricing-flex">
                        <div className="pricing-card pricing-basic">
                            <h2 className="pricing-title">Básico</h2>
                            <h4 className="pricing-price">Gratis</h4>
                            <span className="pricing-subtitle">Genera ideas ilimitadas</span>
                            <ul className="pricing-features">
                                <li>Genera ideas ilimitadas</li>
                                <li>Crea y administra tu cuenta</li>
                            </ul>
                            <button type="button" className="btn pricing-button" onClick={() => navigate('/advisor')}>Advisor</button>
                        </div>
                        <div className="pricing-card pricing-premium">
                            <h2 className="pricing-title">Premium</h2>
                            <h4 className="pricing-price">12.00 € / mes</h4>
                            <span className="pricing-subtitle">Acceso completo</span>
                            <ul className="pricing-features">
                                <li>Genera ideas ilimitadas</li>
                                <li>Guarda tus ideas favoritas</li>
                                <li>Aprende cómo empezar</li>
                            </ul>
                            <button type="button" className="btn pricing-button" onClick={() => navigate('/login')}>Become Premium</button>
                        </div>
                    </div>
                </div>

                <div className="resume-container">
                    <div className="row resume">
                        <div className="col-md-7 info">
                            <h2 className="">Latest News</h2>
                            <p className="">In this section we bring you the latest news related to the world of artificial intelligence, technological innovation and the impact they have on the creation of business projects. Our team of experts makes sure to provide you with the latest and most valuable information so that you are always aware of the trends that can transform your ideas into successes.</p>
                            <button type="button" className="button-slider" onClick={() => navigate('/news')}>News</button>
                        </div>
                        <div className="col-md-5">
                            <img src={News} />
                        </div>
                    </div>

                    <div className="row resume">
                        <div className="col-md-5">
                            <img src={ChatIA} />
                        </div>
                        <div className="col-md-7 info">
                            <h2 className="">Boost Your Ideas With AI</h2>
                            <p className="">
                                Our AI-powered chat tool is designed to give you personalized support in real-time. With just a few clicks, you can access innovative ideas, fast solutions, and expert advice tailored to your needs. Explore everything our AI has to offer!
                                Talking to our AI is easy! Start a conversation now and find out how we can help you take your project to the next level.
                            </p>
                            <button type="button" className="button-slider" onClick={() => navigate('/advisor')}>Advisor</button>
                        </div>
                    </div>

                    <div className="row resume">
                        <div className="col-md-7 info">
                            <h2 className="">Convert Currencies Quickly</h2>
                            <p className="">
                                Our online currency converter allows you to make instant conversions between the world's major currencies. Whether you're planning a trip, making international transactions or simply need to know the value of a currency, with our converter you can get updated real-time exchange rates in just seconds!
                                Start using our currency converter and get the most accurate and up-to-date exchange rates for all your international financial needs!
                            </p>
                            <button type="button" className="button-slider" onClick={() => navigate('/converter')}>Converter</button>
                        </div>
                        <div className="col-md-5">
                            <img src={Currency} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};