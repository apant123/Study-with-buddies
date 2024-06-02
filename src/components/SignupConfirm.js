import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text, Button } from '@chakra-ui/react';

function SignupConfirm() {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      mt={20}
      ml={10}
      mr={10}
      bgGradient="linear(to-r, #f0f9ff, #38bdf8, #075985)"
    >
      <Text fontSize="xl" fontWeight="bold" color="#082f49">
        Congratulations! You have joined this group! Check your My Groups page for location and time.
      </Text>
      <Link to={`/findgroups`}>
      <Button mt={4} bg="#075985" color="white" size="sm">
        Find More Groups
      </Button>
    </Link>
    </Box>
  );
}

export default SignupConfirm;
