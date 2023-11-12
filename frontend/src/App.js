import logo from './logo.svg';
import './App.css';
import './Components/Navbar'
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import SenderForm from "./Components/SenderForm/SenderForm";
import ReceiverForm from "./Components/ReceiverForm/ReceiverForm";
import PackageForm from "./Components/PackageForm/PackageForm";
import Quotation from "./Components/Quotation/Quotation";
import Footer from "./Components/Footer/Footer";
import React from "react";
import Order from "./Components/Order/Order";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
            <div className="App">
                <Routes> {/* Use Routes instead of Switch */}
                    {/* <Route path="/track" element={
                        <header className="App-header">
                            <Login/>
                        </header>
                    } /> */}

                    <Route path="/ship" element={
                        <header className="App-header">
                            <SenderForm/>
                        </header>
                    } />

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





                    {/* The default path should be at the bottom and use "*" for catching all non-defined routes */}
                    <Route path="*" element={
                        <header className="App-header">
                                <Home/>
                        </header>
                    } />
                </Routes>

            </div>
        </Router>
        <Footer/>
    </div>
  );
}

export default App;
