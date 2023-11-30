import React, { useState } from "react";
import {
    Container,
    Stack,
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Radio,
    RadioGroup,
    HStack,
    Button,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

function Payment() {
    const [payment, setPayment] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phoneNumber: "",
        paymentMethod: "",
        nameOnCard: "",
        expiration: "",
        cvv: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPayment({ ...payment, [name]: value });
    };

    const navigate = useNavigate();
    const location = useLocation();
    const { orderId, price } = location.state || {};

    // Frontend
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await sendPaymentInfo(payment, orderId);
            console.log("Payment Info Submission Result:", result);

            console.log("Navigating to /order with state:", {
                orderId,
                price: price,
            });
            navigate("/order", { state: { orderId, price: price } });
        } catch (error) {
            console.error("Failed to submit payment info", error);
        }
    };

    return (
        <Container maxW={"xl"} py={{ base: 5, md: 20 }} bg={"white"}>
            <Stack
                align={"center"}
                spacing={{ base: 8, md: 10 }}
                direction={{ base: "column", md: "row" }}
            >
                <Box flex={1} p={6} bg={"white"} borderWidth={1} borderColor="black">
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
                        color="black"
                    >
                        Payment Checkout
                    </Heading>
                    <Text color="black" mt={3}>
                        Please fill in your payment details.
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4} mt={6}>
                            <FormControl id="firstName" isRequired>
                                <FormLabel color="black">First name</FormLabel>
                                <Input
                                    type="text"
                                    color="black"
                                    name="firstName"
                                    value={payment.firstName}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="lastName" isRequired>
                                <FormLabel color="black">Last name</FormLabel>
                                <Input
                                    type="text"
                                    color="black"
                                    name="lastName"
                                    value={payment.lastName}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="address" isRequired>
                                <FormLabel color="black">Address</FormLabel>
                                <Input
                                    type="text"
                                    color="black"
                                    name="address"
                                    value={payment.address}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel color="black">Email</FormLabel>
                                <Input
                                    type="email"
                                    color="black"
                                    name="email"
                                    value={payment.email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl id="phone" isRequired>
                                <FormLabel color="black">Phone</FormLabel>
                                <Input
                                    type="tel"
                                    color="black"
                                    name="phoneNumber"
                                    value={payment.phoneNumber}
                                    onChange={handleChange}
                                />
                            </FormControl>

                            <Checkbox
                                id="shippingAddress"
                                defaultChecked
                                colorScheme="red"
                                size="lg"
                                color="black" // Change checkbox text color to black
                            >
                                Shipping address is the same as my billing address
                            </Checkbox>
                            <Checkbox
                                id="saveInformation"
                                defaultChecked
                                colorScheme="red"
                                size="lg"
                                color="black" // Change checkbox text color to black
                            >
                                Save this information for next time
                            </Checkbox>

                            <Heading size="lg" mt={8} color="black">
                                Payment Method
                            </Heading>
                            <RadioGroup defaultValue="creditCard">
                                <HStack spacing={4}>
                                    <Radio value="creditCard" colorScheme="red">
                                        <Text color="black">Credit card</Text>
                                    </Radio>
                                    <Radio value="debitCard" colorScheme="red">
                                        <Text color="black">Debit card</Text>
                                    </Radio>
                                    <Radio value="paypal" colorScheme="red">
                                        <Text color="black">Paypal</Text>
                                    </Radio>
                                </HStack>
                            </RadioGroup>

                            <FormControl id="nameOnCard" isRequired mt={4}>
                                <FormLabel color="black">Name on card</FormLabel>
                                <Input
                                    type="text"
                                    color="black"
                                    name="nameOnCard"
                                    value={payment.nameOnCard}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <HStack spacing={4} mt={4}>
                                <FormControl id="expiration" isRequired>
                                    <FormLabel color="black">Expiration</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="MM/YY"
                                        color="black"
                                        name="expiration"
                                        value={payment.expiration}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="cvv" isRequired>
                                    <FormLabel color="black">CVV</FormLabel>
                                    <Input
                                        type="text"
                                        color="black"
                                        name="cvv"
                                        value={payment.cvv}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </HStack>

                            <Button
                                rounded={"full"}
                                size={"lg"}
                                fontWeight={"normal"}
                                px={6}
                                colorScheme={"red"}
                                bg={"#854BCB"}
                                _hover={{ bg: "red.500" }}
                                mt={8}
                                type="submit"
                            >
                                Continue to checkout
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container>
    );
}

// Frontend
const sendPaymentInfo = async (paymentInfo, orderId) => {
    try {
        const response = await fetch("http://localhost:3001/payment-service", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ paymentInfo, orderId }),
        });

        if (!response.ok) {
            throw new Error(
                `HTTP error! Status: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Error in sending payment info:", error);
        throw error;
    }
};

export default Payment;