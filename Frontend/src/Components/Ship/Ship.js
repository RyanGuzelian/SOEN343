'use client'

import { useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import Quote from '../Quote/Quote'
import { useLocation } from 'react-router-dom'

const sendSenderInfo = async (senderInfo) => {
    const response = await fetch('http://localhost:3001/sender-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderInfo })
    });
    console.log(response)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

const sendPackageInfo = async (packageInfo, orderId) => {
  try {
      const response = await fetch('http://localhost:3001/package-info', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ packageInfo, orderId })
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
  } catch (error) {
      console.error("Error in sending package info:", error);
      throw error; // Rethrow the error for further handling
  }
};

const sendReceiverInfo = async (recipientInfo, orderId) => {
    const response = await fetch('http://localhost:3001/recipient-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientInfo, orderId }) // Include orderId
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

let orderId;


const Form1 = ({ formData, setFormData }) => {
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'country') {
            setFormData(prevInfo => (
                {
                    ...prevInfo,
                    [name]: value
                }
            ))
        } else {
            setFormData(prevInfo => ({
                ...prevInfo,
                [name]: value
            }))
        }
    }


  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" color="black">
        Sender Information
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight={'normal'} color="black">
            First name
          </FormLabel>
          <Input id="first-name" placeholder="First name" color="black" name="firstName" onChange={handleChange}/>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={'normal'} color="black">
            Last name
          </FormLabel>
          <Input id="last-name" placeholder="Last name" color="black" name="lastName" onChange={handleChange}/>
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={'normal'} color="black">
          Email address
        </FormLabel>
        <Input id="email" type="email" color="black" name="email" onChange={handleChange}/>
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="phoneNumber" fontWeight={'normal'} color="black">
          Phone Number
        </FormLabel>
        <Input id="phoneNumber" type="phoneNumber" color="black" name="phoneNumber" onChange={handleChange}/>
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="black">
          Country / Region
        </FormLabel>
        <Select
          id="country"
          name="country"
          autoComplete="country"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md" color="black" onChange={handleChange}>
          <option color="black">United States</option>
          <option color="black">Canada</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="address"
          fontSize="sm"
          fontWeight="md"
          color="black"
          mt="2%">
          Street address
        </FormLabel>
        <Input
          type="text"
          name="address"
          id="address"
          autoComplete="address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md" color="black" onChange={handleChange}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="black"
          mt="2%">
          City
        </FormLabel>
        <Input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md" color="black" onChange={handleChange}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="province"
          fontSize="sm"
          fontWeight="md"
          color="black"
          mt="2%">
          State / Province
        </FormLabel>
        <Input
          type="text"
          name="province"
          id="province"
          autoComplete="province"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md" color="black" onChange={handleChange}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postalCode"
          fontSize="sm"
          fontWeight="md"
          color="black"
          mt="2%">
          ZIP / Postal
        </FormLabel>
        <Input
          type="text"
          name="postalCode"
          id="postalCode"
          autoComplete="postal-code"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md" color="black" onChange={handleChange}
        />
      </FormControl>
    </>
  )
}

const Form2 = ({formData, setFormData}) => {
    

    const handleChange = (event) => {
        const {name, value} = event.target;
        if (name === 'country') {
            setFormData(prevInfo => (
                {
                    ...prevInfo,
                    [name]: value
                }
            ))
        } else {
            setFormData(prevInfo => ({
                ...prevInfo,
                [name]: value
            }))
        }
        console.log(formData)
    }


    return (
        <>
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" color="black">
            Receiver Information
          </Heading>
          <Flex>
            <FormControl mr="5%">
              <FormLabel htmlFor="first-name" fontWeight={'normal'} color="black">
                First name
              </FormLabel>
              <Input id="first-name" placeholder="First name" color="black" name="firstName" onChange={handleChange}/>
            </FormControl>
    
            <FormControl>
              <FormLabel htmlFor="last-name" fontWeight={'normal'} color="black">
                Last name
              </FormLabel>
              <Input id="last-name" placeholder="Last name" color="black" name="lastName" onChange={handleChange}/>
            </FormControl>
          </Flex>
          <FormControl mt="2%">
            <FormLabel htmlFor="email" fontWeight={'normal'} color="black">
              Email address
            </FormLabel>
            <Input id="email" type="email" color="black" name="email" onChange={handleChange}/>
            <FormHelperText>We&apos;ll never share your email.</FormHelperText>
          </FormControl>
          <FormControl mt="2%">
            <FormLabel htmlFor="phoneNumber" fontWeight={'normal'} color="black">
              Phone Number
            </FormLabel>
            <Input id="phoneNumber" type="phoneNumber" color="black" name="phoneNumber" onChange={handleChange}/>
          </FormControl>
    
          <FormControl as={GridItem} colSpan={[6, 3]}>
            <FormLabel
              htmlFor="country"
              fontSize="sm"
              fontWeight="md"
              color="black">
              Country / Region
            </FormLabel>
            <Select
              id="country"
              name="country"
              autoComplete="country"
              placeholder="Select option"
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md" color="black" onChange={handleChange}>
              <option color="black">United States</option>
              <option color="black">Canada</option>
            </Select>
          </FormControl>
    
          <FormControl as={GridItem} colSpan={6}>
            <FormLabel
              htmlFor="address"
              fontSize="sm"
              fontWeight="md"
              color="black"
              mt="2%">
              Street address
            </FormLabel>
            <Input
              type="text"
              name="address"
              id="address"
              autoComplete="address"
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md" color="black" onChange={handleChange}
            />
          </FormControl>
    
          <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
            <FormLabel
              htmlFor="city"
              fontSize="sm"
              fontWeight="md"
              color="black"
              mt="2%">
              City
            </FormLabel>
            <Input
              type="text"
              name="city"
              id="city"
              autoComplete="city"
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md" color="black" onChange={handleChange}
            />
          </FormControl>
    
          <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
            <FormLabel
              htmlFor="province"
              fontSize="sm"
              fontWeight="md"
              color="black"
              mt="2%">
              State / Province
            </FormLabel>
            <Input
              type="text"
              name="province"
              id="province"
              autoComplete="province"
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md" color="black" onChange={handleChange}
            />
          </FormControl>
    
          <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
            <FormLabel
              htmlFor="postalCode"
              fontSize="sm"
              fontWeight="md"
              color="black"
              mt="2%">
              ZIP / Postal
            </FormLabel>
            <Input
              type="text"
              name="postalCode"
              id="postalCode"
              autoComplete="postalCode"
              focusBorderColor="brand.400"
              shadow="sm"
              size="sm"
              w="full"
              rounded="md" color="black" onChange={handleChange}
            />
          </FormControl>
        </>
      )
}

const Form3 = ({formData, setFormData}) => {
  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === 'country') {
        setFormData(prevInfo => (
            {
                ...prevInfo,
                [name]: value
            }
        ))
    } else {
        setFormData(prevInfo => ({
            ...prevInfo,
            [name]: value
        }))
    }
    console.log(formData)
}
    return (
        <>
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" color="black">
            Package Information
          </Heading>
          <Flex>
            <FormControl mr="5%">
              <FormLabel htmlFor="height" fontWeight={'normal'} color="black">
                Height
              </FormLabel>
              <Input id="height" placeholder="Height (cm)" color="black" name="height" onChange={handleChange}/>
            </FormControl>
    
            <FormControl mr="5%">
              <FormLabel htmlFor="width" fontWeight={'normal'} color="black">
              Width
              </FormLabel>
              <Input id="width" placeholder="Width (cm)" color="black" name="width" onChange={handleChange}/>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="length" fontWeight={'normal'} color="black">
                Length
              </FormLabel>
              <Input id="length" placeholder="Length (cm)" color="black" name="length" onChange={handleChange}/>
            </FormControl>
          </Flex>
          <FormControl mt="2%">
            <FormLabel htmlFor="weight" fontWeight={'normal'} color="black">
            Weight
            </FormLabel>
            <Input id="weight" placeholder='Weight (g)' color="black" name="weigth" onChange={handleChange}/>
          </FormControl>
          
        </>
      )
}

const Form4 = ({formData, setFormData, orderId}) => {
  alert(orderId)
    return (
        <>
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%" color="black">
            Shipping Options
          </Heading>
          <Quote formData={formData} setFormData={setFormData} orderId={orderId}/>
        </>
      )
}

export default function Multistep() {
  const toast = useToast()
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(25)

  const [senderInfo, setSenderInfo] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',
    email: ''
})

const [receiverInfo, setReceiverInfo] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phoneNumber: '',
    email: ''
})

const [packageInfo, setPackageInfo] = useState({
  height:'',
  width:'',
  length:'',
  weight:''
})

const [quotation, setQuotation] = useState({
  regularPrice: 10,
  expressPrice: 32,
  selectedType: '',
  selectedPrice: 0
});

  const handleFormSubmit = async () => {
    try {
      if (step === 1) {
        const result = await sendSenderInfo(senderInfo);
        console.log(result.message);
        orderId = result.orderId;
        // Handle navigation or other logic here if needed
      } else if (step === 2) {
        const result = await sendReceiverInfo(receiverInfo, orderId);
        console.log(result.message);
        alert(orderId)
        // Handle navigation or other logic here if needed
      } else if (step === 3){
        const result = await sendPackageInfo(packageInfo, orderId);
        console.log(result.message)
      }
      // Add more conditions for other steps if needed
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form">
        <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated colorScheme="purple"></Progress>
        {step === 1 ? <Form1 formData={senderInfo} setFormData={setSenderInfo}/> : step === 2 ? <Form2 formData={receiverInfo} setFormData={setReceiverInfo}/> : step === 3 ? <Form3 formData={packageInfo} setFormData={setPackageInfo}/> : <Form4 formData={quotation} setFormData={setQuotation} orderId={orderId}/>}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1)
                  setProgress(progress - 25)
                  
                }}
                isDisabled={step === 1}
                colorScheme="purple"
                variant="solid"
                w="7rem"
                mr="5%">
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 4}
                onClick={() => {
                    handleFormSubmit()
                  setStep(step + 1)
                  if (step === 4) {
                    setProgress(100)
                  } else {
                    setProgress(progress + 25)
                  }
                }}
                colorScheme="purple"
                variant="outline">
                Next
              </Button>
            </Flex>
            {/* {step === 4 ? (
              <Button
                w="7rem"
                colorScheme="purple"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Account created.',
                    description: "We've created your account for you.",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })
                }}>
                Submit
              </Button>
            ) : null} */}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  )
}