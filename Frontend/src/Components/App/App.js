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
import { ChakraProvider } from "@chakra-ui/react";
import Payment from "../Payment/Payment";
import ReviewOfService from "../ReviewOfOrder/ReviewOfService";
import DeliveryInfo from "../DeliveryInfo/DeliveryInfo";
import Multistep from "../Ship/Ship";

function App() {
    return (
        <div className="App" style={{backgroundColor: "#E7DAF7"}}>
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
                            path="/multi"
                            element={
                                <header className="App-header"><ChakraProvider>
                                    <Multistep/>
                                </ChakraProvider></header>
                                
                            }
                        />
                        

                        <Route
                            path="/payment"
                            element={
                                <header className="App-header">
                                    <ChakraProvider><Payment/></ChakraProvider>
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
                                    <ChakraProvider><Contact/></ChakraProvider>
                                </header>
                            }
                        />

                        <Route
                            path="/review"
                            element={
                                <header className="App-header">
                                    <ChakraProvider><ReviewOfService/></ChakraProvider>
                                </header>
                            }
                        />

                        <Route
                            path="/delivery"
                            element={
                                <header className="App-header">
                                    <ChakraProvider><DeliveryInfo/></ChakraProvider>
                                </header>
                            }
                        />

                        {/* The default path should be at the bottom and use "*" for catching all non-defined routes */}
                        <Route
                            path="*"
                            element={
                                <header className="App-header">
                                    <ChakraProvider><Home/></ChakraProvider>
                                    
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
