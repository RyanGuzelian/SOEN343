'use client'

import {
  Box,
  Button,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const optionsRegular = [
  { id: 1, desc: 'Standard delivery time' },
  { id: 2, desc: 'Reliable shipping service' },
  { id: 3, desc: 'Affordable standard option' },
]

const optionsExpress = [
    { id: 1, desc: 'Express delivery available' },
    { id: 2, desc: 'Quick and timely shipping' },
    { id: 3, desc: 'Expedited delivery choice' },
  ]
const PackageTier = ({ title, options, typePlan, checked = false, onShipItClick }) => {
  const colorTextLight = checked ? 'white' : 'purple.600'
  const bgColorLight = checked ? 'purple.400' : 'gray.300'

  const colorTextDark = checked ? 'white' : 'purple.500'
  const bgColorDark = checked ? 'purple.400' : 'gray.300'


  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: 'flex-start',
        md: 'space-around',
      }}
      direction={{
        base: 'column',
        md: 'row',
      }}
      alignItems={{ md: 'center' }}>
      <Heading size={'md'} color="black">{title}</Heading>
      <List spacing={3} textAlign="start">
        {options.map((desc, id) => (
          <ListItem key={desc.id} color="black">
            <ListIcon as={FaCheckCircle} color="green.500" />
            {desc.desc}
          </ListItem>
        ))}
      </List>
      <Heading size={'xl'} color="black">{typePlan}</Heading>
      <Stack>
        <Button
          size="md"
          onClick={() => onShipItClick(typePlan)}           color={useColorModeValue(colorTextLight, colorTextDark)}
          bgColor={useColorModeValue(bgColorLight, bgColorDark)}>
          Ship It!
        </Button>
      </Stack>
    </Stack>
  )
}
const Quote = ({formData, setFormData, orderId}) => {
  const navigate = useNavigate();
  const toast = useToast()

  const handleRegularChange = (typePlan) => {
    // Handle regular shipping change
    console.log('Regular Shipping Selected', typePlan);
    // Add your logic here
    setFormData({
      ...formData,
      selectedType: 'regular',
      selectedPrice: formData.regularPrice,
    });
    toast({
      title: 'Regular shipment request placed.',
      description: "Your order id is"+orderId+".",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    navigate("/payment");
  };

  const handleExpressChange = (typePlan) => {
    // Handle express shipping change
    console.log('Express Shipping Selected', typePlan);
    // Add your logic here
    setFormData({
      ...formData,
      selectedType: 'express',
      selectedPrice: formData.expressPrice,
    });
    toast({
      title: 'Express shipment request placed.',
      description: "Your order id is "+orderId+".",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    navigate('/payment')
  };
  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width={'100%'} direction={'column'}>
        <Stack
          p={5}
          alignItems={'center'}
          justifyContent={{
            base: 'flex-start',
            md: 'space-around',
          }}
          direction={{
            base: 'column',
            md: 'row',
          }}>
          <Stack
            width={{
              base: '100%',
              md: '40%',
            }}
            textAlign={'center'}>
            <Heading size={'lg'}color="black">
              The Right Plan for <Text color="purple.400">Your Needs</Text>
            </Heading>
          </Stack>
          <Stack
            width={{
              base: '100%',
              md: '60%',
            }}>
            <Text textAlign={'center'}color="black">
            Experience unparalleled convenience with our shipping options. Choose the option that best suits your needs and enjoy the exceptional quality of our shipping services.
            </Text>
          </Stack>
        </Stack>
        <Divider />
        <PackageTier title={'Regular Shipping'} typePlan="$10.00" options={optionsRegular} onShipItClick={handleRegularChange}/>
        <Divider />
        <PackageTier
          title={'Express Shipping'}
          checked={true}
          typePlan="$32.00"
          options={optionsExpress}
          onShipItClick={handleExpressChange}
        />
        <Divider />
      </Stack>
    </Box>
  )
}

export default Quote