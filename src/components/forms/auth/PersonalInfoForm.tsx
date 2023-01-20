import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import {
  Box,
  Collapse,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Category, selectCategories } from "@/store/features";
import { motion } from "framer-motion";

const schema = z.object({
  birthDay: z.string().min(5),
  interests: z.array(z.string()).min(1),
});

export type PersonalInfoSchemeType = z.infer<typeof schema>;

const CardWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 24px 16px;
  background: #ffffff;
  border: 1.5px solid #d9d9d9;
  box-shadow: 0px 4px 64px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  height: 600px;
`;
const HeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
type Props = {
  onSubmit: (data: PersonalInfoSchemeType) => void;
};
export type EducationInfoRef = {
  submit: () => void;
};
export const PersonalInfoForm = forwardRef<EducationInfoRef, Props>(
  (props, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
    } = useForm<PersonalInfoSchemeType>({
      resolver: zodResolver(schema),
      defaultValues: {
        birthDay: "2002-01-08",
      },
    });
    const { t } = useTranslation();
    const categories = useSelector(selectCategories);
    const submitButtonRef = useRef<HTMLButtonElement>(null);

    const processForm: SubmitHandler<PersonalInfoSchemeType> = async (
      data: PersonalInfoSchemeType,
    ) => {
      props.onSubmit(data);
    };

    useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          submitButtonRef?.current?.click();
        },
      }),
      [handleSubmit],
    );

    return (
      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0.3, x: -200 }}
        transition={{ duration: 0.5 }}
      >
        <CardWrapper
          onSubmit={handleSubmit(processForm)}
          style={{ display: "flex", flexDirection: "column", width: 300 }}
        >
          <HeadWrapper>
            {/*         <div>Welcome!</div>
          <div>Register the Unilife</div> */}
          </HeadWrapper>

          <FormControl isInvalid={Boolean(errors.interests)}>
            <Controller
              control={control}
              name="interests"
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <Categories
                  categories={categories}
                  selectedCategoryIDs={value}
                  updateSelectedCategories={onChange}
                />
              )}
            />
            <FormLabel htmlFor="interests">Interests</FormLabel>

            <Collapse
              in={errors.interests?.message ? true : false}
              animateOpacity
            >
              <Box fontSize={"sm"} textColor={"red.500"}>
                <FormErrorMessage>
                  {errors.interests && errors.interests.message}
                </FormErrorMessage>
              </Box>
            </Collapse>
          </FormControl>

          <FormControl isInvalid={Boolean(errors.birthDay)}>
            <FormLabel htmlFor="birthDay">Birth Dates</FormLabel>
            <Input
              type="date"
              placeholder="Your graduation year here"
              {...register("birthDay", { required: true })}
            />
            <Collapse
              in={errors.birthDay?.message ? true : false}
              animateOpacity
            >
              <Box fontSize={"sm"} textColor={"red.500"}>
                <FormErrorMessage>
                  {errors.birthDay && errors.birthDay.message}
                </FormErrorMessage>
              </Box>
            </Collapse>
          </FormControl>

          <Button
            ref={submitButtonRef}
            visibility={"hidden"}
            mt={"6"}
            colorScheme="purple"
            size="lg"
            type="submit"
            isLoading={false}
          >
            {t("forms.registerForm.register")}
          </Button>
        </CardWrapper>
      </motion.div>
    );
  },
);

type CategoryProps = {
  category: Category;
  toggleCategory: (categoryID: string) => void;
  selectedCategoryIDs: string[];
};

const CategorySingle = (props: CategoryProps) => {
  const { category, toggleCategory, selectedCategoryIDs } = props;

  return (
    <>
      <Button
        px={2}
        py={1}
        cursor={"pointer"}
        borderRadius={"md"}
        border={selectedCategoryIDs?.includes(category._id) ? "2px" : "0px"}
        variant={"outline"}
        borderColor={"purple.500"}
        textAlign={"left"}
        onClick={() => toggleCategory(category._id)}
      >
        <Text align={"left"} fontSize={"sm"}>
          {getCategoryEmoji(category.name)} {category.name}
        </Text>
      </Button>
      {selectedCategoryIDs?.includes(category._id) &&
        category.subCategories?.length > 0 &&
        category.subCategories.map((subCategory) => {
          return (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 1 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              key={subCategory._id}
            >
              <Button
                px={2}
                py={1}
                cursor={"pointer"}
                borderRadius={"md"}
                border={
                  selectedCategoryIDs?.includes(subCategory._id) ? "2px" : "0px"
                }
                variant={"outline"}
                borderColor={"purple.500"}
                onClick={() => props.toggleCategory(subCategory._id)}
              >
                <Text fontSize={"sm"}>
                  {/*   {getCategoryEmoji(subCategory.name)} */}{" "}
                  {subCategory.name}
                </Text>
              </Button>
            </motion.div>
          );
        })}
    </>
  );
};

type CategoriesProps = {
  categories: Category[];
  updateSelectedCategories: (selectedCategories: string[]) => void;
  selectedCategoryIDs: string[];
};

const getCategoryEmoji = (categoryName: string) => {
  switch (categoryName) {
    case "Technology":
      return "👩‍💻";
    case "Sports & Activities":
      return "🏀";
    case "Food & Drink":
      return "🍔";
    default:
      return "👩‍💻";
  }
};

const Categories = (props: CategoriesProps) => {
  /* TODO: fix state update problem */
  const { categories, updateSelectedCategories, selectedCategoryIDs } = props;
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    () => selectedCategoryIDs || [],
  );

  const toggleCategory = (categoryID: string) => {
    if (selectedCategories.includes(categoryID)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryID),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryID]);
    }
    updateSelectedCategories(selectedCategories);
  };

  return (
    <Stack>
      {categories.map((category) => {
        return (
          <CategorySingle
            selectedCategoryIDs={selectedCategories}
            toggleCategory={toggleCategory}
            category={category}
            key={category._id}
          />
        );
      })}
    </Stack>
  );
};
