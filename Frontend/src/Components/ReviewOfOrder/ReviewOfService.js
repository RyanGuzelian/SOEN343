import React, { useState } from 'react';
import {
    Box,
    Text,
    Input,
    Button,
    VStack,
    ChakraProvider,
    Textarea,
    FormControl,
    FormLabel,
    FormErrorMessage,
} from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';

function ReviewComponent() {
    const [orderID, setOrderID] = useState('');
    const [review, setReview] = useState({ text: '', rating: 5 });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmitReview = async () => {
        try {
            const response = await fetch('http://localhost:3001/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: review.text,
                    rating: review.rating,
                    orderId: orderID,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }

            await response.json();

            if (response.status === 201) {
                console.log('Review submitted successfully');
                setSubmitted(true); // Set submitted to true
                // After submitting the review, fetch the updated review
                await fetchReview();
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            setError('Failed to submit the review. Please try again later.');
        }
    };

    const fetchReview = async () => {
        try {
            const response = await fetch(`http://localhost:3001/reviews/${orderID}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }

            const { text, rating } = await response.json();
            setReview({ text, rating });
        } catch (error) {
            console.error('Error fetching review:', error);
            setError('Failed to fetch the review. Please try again later.');
        }
    };

    return (
        <ChakraProvider>
            <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="lg" shadow="md">
                <VStack spacing={4} align="stretch">
                    <Text fontSize="2xl" fontWeight="bold" color="blue.600">Submit a Review</Text>
                    <FormControl isRequired isInvalid={!!error}>
                        <FormLabel htmlFor="orderID">Order ID</FormLabel>
                        <Input
                            id="orderID"
                            placeholder="Enter Order ID"
                            value={orderID}
                            color="gray.700"
                            onChange={(e) => setOrderID(e.target.value)}
                        />
                        <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                    <StarRatings
                        rating={review.rating}
                        starRatedColor="black"
                        changeRating={(rating) => setReview({ ...review, rating })}
                        numberOfStars={5}
                        name="rating"
                    />
                    <FormControl isRequired>
                        <FormLabel htmlFor="reviewText">Review</FormLabel>
                        <Textarea
                            id="reviewText"
                            placeholder="Write your review here"
                            value={review.text}
                            color="gray.700"
                            onChange={(e) => setReview({ ...review, text: e.target.value })}
                        />
                    </FormControl>
                    <Button colorScheme="blue" onClick={handleSubmitReview}>
                        Submit Review
                    </Button>
                    {submitted && (
                        <Box borderWidth="1px" borderColor="gray.200" borderRadius="lg" p={4}>
                            <Text fontSize="lg" fontWeight="bold" color="green.600">Review submitted successfully</Text>
                        </Box>
                    )}
                </VStack>
            </Box>
        </ChakraProvider>
    );
}

export default ReviewComponent;