import React from 'react';
import { useLogin } from '../hooks/useLogin';
import {useState } from 'react';
import './styles.css';


import {
  Container,
  Stack,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  Box,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Flex,
} from '@chakra-ui/react';

import { ChakraProvider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <ChakraProvider>
      <Container
        maxW="lg"
        py={{
          base: '12',
          md: '24',
        }}
        px={{
          base: '0',
          sm: '8',
        }}
      >
        <Stack spacing="8">
          <Flex
            direction="column"
            align="center"
          >
            <Heading
              size={{
                base: 'xs',
                md: 'lg',
              }}
              style={{
                textAlign: 'center',
                padding: '0px',
              }}
            >
              Log in to your account
            </Heading>
            <Text color="muted">Don't have an account?</Text>
            <ChakraLink as={Link} to="/signup">
              <Button variant="link" colorScheme="#082f49">
                Sign up
              </Button>
            </ChakraLink>
          </Flex>
          <flex onSubmit = {handleSubmit}>
            <Box
              py={{
                base: '0',
                sm: '8',
              }}
              px={{
                base: '4',
                sm: '10',
              }}
              bg={{
                base: 'transparent',
                sm: 'bg-surface',
              }}
              boxShadow={{
                base: 'none',
                sm: 'md',
              }}
              borderRadius={{
                base: 'none',
                sm: 'xl',
              }}
            >
              <Stack spacing="6">
                <Stack spacing="5">
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input 
                      id="email" 
                      type="text" 
                      onChange = {(e) => setEmail(e.target.value)}
                      value = {email}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input 
                      id="password" 
                      type="password"
                      onChange = {(e) => setPass(e.target.value)}
                    />
                  </FormControl>
                </Stack>
                <Divider />
                <Stack spacing="6">
                  <Button
                    variant="primary"
                    style={{
                      background: '#075985',
                      color: 'white',
                      margin: '10px',
                    }}
                    onClick = {handleSubmit}
                    disabled = {isLoading}
                  >
                    Sign in
                  </Button>
                  {error && <div className="error" style={{ color: 'red'}}>**Incorrect Email or Password**</div>}
                </Stack>
              </Stack>
            </Box>
          </flex>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default Login;
