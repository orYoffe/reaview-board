import { useForm } from "react-hook-form";
import React from "react";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Select,
  Flex,
  Stack,
} from "@chakra-ui/core";

function Filters({ languages, submit }) {
  const { handleSubmit, errors, register, formState } = useForm();

  return (
    <Stack spacing="2" m={8}>
      <form onSubmit={handleSubmit(submit)}>
        <Flex align="center" justify="flex-start" direction="row" wrap="wrap">
          <FormControl isInvalid={errors.name} m={1}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input name="name" placeholder="Name" ref={register()} />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.language} m={1}>
            <FormLabel htmlFor="language">Language</FormLabel>
            {languages && (
              <Select
                placeholder="Select language"
                name="language"
                ref={register()}
              >
                {languages.map((lang, index) => (
                  <option key={lang + index} value={lang}>
                    {lang}
                  </option>
                ))}
              </Select>
            )}
            <FormErrorMessage>
              {errors.language && errors.language.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Button
          m={1}
          mt={4}
          variantColor="teal"
          isLoading={formState.isSubmitting}
          type="submit"
        >
          Apply filters
        </Button>
      </form>
    </Stack>
  );
}

export default Filters;
