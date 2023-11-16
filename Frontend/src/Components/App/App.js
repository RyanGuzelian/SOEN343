import logo from "../../logo.svg";
import "./App.css";
import "../Navbar/Navbar";
import Navbar from "../Navbar/Navbar";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "../Home/Home";
import SenderForm from "../SenderForm/SenderForm";
import ReceiverForm from "../ReceiverForm/ReceiverForm";
import PackageForm from "../PackageForm/PackageForm";
import Quotation from "../Quotation/Quotation";
import Footer from "../Footer/Footer";
import React from "react";
import Order from "../Order/Order";
import Tracking from "../Tracking/Tracking";
import Contact from "../Contact/Contact";

function App() {
    return (
        <div className="App" style={{backgroundColor: "#87C4FF"}}>
            <Router>
                <Navbar/>
                <div className="App">
                    <Routes>
                        {" "}
                        {/* Use Routes instead of Switch */}
                        {/* <Route path="/track" element={
                        <header className="App-header">
                            <Login/>
                        </header>
                    } /> */}
                        <Route
                            path="/ship"
                            element={
                                <header className="App-header">
                                    <SenderForm/>
                                </header>
                            }
                        />
                        <Route
                            path="/sender-info"
                            element={
                                <header className="App-header">
                                    <SenderForm/>
                                </header>
                            }
                        />
                        <Route
                            path="/recipient-info"
                            element={
                                <header className="App-header">
                                    <ReceiverForm/>
                                </header>
                            }
                        />
                        <Route
                            path="/package-info"
                            element={
                                <header className="App-header">
                                    <PackageForm/>
                                </header>
                            }
                        />
                        <Route
                            path="/quotation-service"
                            element={
                                <header className="App-header">
                                    <Quotation/>
                                </header>
                            }
                        />
                        <Route
                            path="/order"
                            element={
                                <header className="App-header">
                                    <Order/>
                                </header>
                            }
                        />
                        <Route
                            path="/track"
                            element={
                                <header className="App-header">
                                    <Tracking/>
                                </header>
                            }
                        />
                        <Route
                            path="/contact"
                            element={
                                <header className="App-header">
                                    <Contact/>
                                </header>
                            }
                        />
                        {/* The default path should be at the bottom and use "*" for catching all non-defined routes */}
                        <Route
                            path="*"
                            element={
                                <header className="App-header">
                                    <Home/>
                                </header>
                            }
                        />
                    </Routes>
                </div>
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
