import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import DeliveryRequest from "../DeliveryRequest/DeliveryRequest";
import Home from "../Home/Home";
import Quotation from "../Quotation/Quotation";
import SenderForm from "../SenderForm/SenderForm";
import PackageForm from "../PackageForm/PackageForm";
import ReceiverForm from "../ReceiverForm/ReceiverForm";
import Order from "../Order/Order";
import Tracking from "../Tracking/Tracking";
import React from "react";
import Navbar from "../Navbar";

function App() {
    return (
        <Router>
            <Navbar/>
            <div className="App">
                <Routes> {/* Use Routes instead of Switch */}
                    <Route path="/sender-info" element={
                        <header className="App-header">
                            <SenderForm/>
                        </header>
                    } />

                    <Route path="/recipient-info" element={
                        <header className="App-header">
                            <ReceiverForm/>
                        </header>
                    } />

                    <Route path="/package-info" element={
                        <header className="App-header">
                            <PackageForm/>
                        </header>
                    } />

                    <Route path="/quotation-service" element={
                        <header className="App-header">
                            <Quotation/>
                        </header>
                    } />

                    <Route path="/order" element={
                        <header className="App-header">
                            <Order/>
                        </header>
                    } />

                    <Route path="/track" element={
                        <header className="App-header">
                            <Tracking/>
                        </header>
                    } />

                    {/* The default path should be at the bottom and use "*" for catching all non-defined routes */}
                    <Route path="*" element={
                        <header className="App-header">
                                <Home/>
                        </header>
                    } />
                </Routes>

            </div>
        </Router>
    );
}

export default App;