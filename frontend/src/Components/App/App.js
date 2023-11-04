import logo from '../../logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import DeliveryRequest from "../DeliveryRequest/DeliveryRequest";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes> {/* Use Routes instead of Switch */}
                    <Route path="/login" element={
                        <header className="App-header">
                            <Login/>
                        </header>
                    } />

                    <Route path="/delivery-request" element={
                        <header className="App-header">
                            <DeliveryRequest/>
                        </header>
                    } />

                    {/* The default path should be at the bottom and use "*" for catching all non-defined routes */}
                    <Route path="*" element={
                        <header className="App-header">
                            Delivery App
                        </header>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;