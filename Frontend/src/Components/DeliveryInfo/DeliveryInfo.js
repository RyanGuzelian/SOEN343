import React, { useState } from 'react';
import {
    Box,
    Text,
    Input,
    Button,
    VStack,
    ChakraProvider,
    FormControl,
    FormLabel,
    Select,
} from '@chakra-ui/react';

function DeliveryInfo() {
    const [orderID, setOrderID] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmitDeliveryInfo = async () => {
        try {
            // Send delivery information to the backend
            const response = await fetch('http://localhost:3001/delivery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderID,
                    deliveryDate,
                    deliveryTime,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }

            // Reset form and set submitted to true on success
            setOrderID('');
            setDeliveryDate('');
            setDeliveryTime('');
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting delivery information:', error);
        }
    };

    return (
        <ChakraProvider>
            <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="lg" shadow="md">
                <VStack spacing={4} align="stretch">
                    <Text fontSize="2xl" fontWeight="bold" color="#53238E">Delivery Information</Text>
                    <FormControl isRequired>
                        <FormLabel color="black" htmlFor="orderID">Order ID</FormLabel>
                        <Input
                            id="orderID"
                            placeholder="Enter Order ID"
                            value={orderID}
                            color="gray.700"
                            onChange={(e) => setOrderID(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="black" htmlFor="deliveryDate">Delivery Date</FormLabel>
                        <Input
                            id="deliveryDate"
                            type="date"
                            value={deliveryDate}
                            color="gray.700"
                            onChange={(e) => setDeliveryDate(e.target.value)}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color="black" htmlFor="deliveryTime">Delivery Time</FormLabel>
                        <Select
                            id="deliveryTime"
                            placeholder="Select Delivery Time"
                            value={deliveryTime}
                            color="gray.700"
                            onChange={(e) => setDeliveryTime(e.target.value)}
                        >
                            <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                            <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                            <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                        </Select>
                    </FormControl>
                    <Button colorScheme="purple" onClick={handleSubmitDeliveryInfo}>
                        Submit Delivery Info
                    </Button>
                    {submitted && (
                        <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={4}>
                            <Text fontSize="lg" fontWeight="bold" color="green.600">Delivery information submitted successfully</Text>
                        </Box>
                    )}
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default DeliveryInfo;