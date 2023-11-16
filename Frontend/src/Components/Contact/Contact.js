import React, { useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Contact() {
  const [inquiryInfo, setInquiryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    inquiryText: "",
  });
  const title = "Contact Us";

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInquiryInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await sendInquiryInfo(inquiryInfo);
      console.log(result.message);
      // If you get an inquiryId or similar identifier, store it as needed
      navigate("/success-page", { state: { inquiryId: result.inquiryId } });
    } catch (error) {
      console.error("Failed to submit inquiry info", error);
    }
  };

  return (
    <div className="inquiry-info-container">
      <Card
        className="inquiry-info-form"
        style={{
          backgroundColor: "#b5d9f5",
          border: "none",
          boxShadow: "none",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              type="text"
              name="firstName"
              value={inquiryInfo.firstName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              type="text"
              name="lastName"
              value={inquiryInfo.lastName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <TextField
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={inquiryInfo.phoneNumber}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              value={inquiryInfo.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              id="inquiryText"
              label="Tell us about your experience"
              name="inquiryText"
              value={inquiryInfo.inquiryText}
              onChange={handleChange}
              multiline
              rows={10}
              fullWidth
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: 2 }}
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

const sendInquiryInfo = async (inquiryInfo) => {
  const response = await fetch("http://localhost:3001/submit-inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inquiryInfo }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export default Contact;
