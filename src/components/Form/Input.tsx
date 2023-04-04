import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';

import {
    FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel>{label}</FormLabel>}

      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900',
        }}
        sz="lg"
        ref={ref}
        {...rest}
      ></ChakraInput>

      {/* {error && <FormErrorMessage>{error.message}</FormErrorMessage>} */}
      {/* Geändert so dass es ein overlay ist und nicht darunter */}
      {error && (
                <FormErrorMessage position="absolute" bottom="15%" left="35%">
                    {error.message}
                </FormErrorMessage>
            )}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
