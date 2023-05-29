import * as yup from "yup";

export const billingSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^(\+?\d{1,3}[-.\s]?)?(\()?\d{3}(\))?[-.\s]?\d{3}[-.\s]?\d{4}$/,
      "Invalid phone number. Must be +3800951234567"
    )
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  postCode: yup
    .string()
    .length(5, "Invalid postal code. Must be 5 numbers")
    .matches(/^[0-9]{5}/, "Invalid postal code. Only numbers")
    .required("Postal code is required"),
  notes: yup.string(),
  spamCheck: yup.boolean().oneOf([true], "You must accept sending messages"),
  policyCheck: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});
