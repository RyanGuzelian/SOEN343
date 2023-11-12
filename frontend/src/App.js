import logo from './logo.svg';
import './App.css';
import './Components/Navbar'
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login.js";
import DeliveryRequest from "./Components/DeliveryRequest/DeliveryRequest";
import Home from "./Components/Home/Home";
import SenderForm from "./Components/SenderForm/SenderForm";
import ReceiverForm from "./Components/ReceiverForm/ReceiverForm";
import PackageForm from "./Components/PackageForm/PackageForm";
import Quotation from "./Components/Quotation/Quotation";

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



                    {/* The default path should be at the bottom and use "*" for catching all non-defined routes */}
                    <Route path="*" element={
                        <header className="App-header">
                                <Home/>
                        </header>
                    } />
                </Routes>

            </div>
        </Router>
    </div>
  );
}

export default App;
