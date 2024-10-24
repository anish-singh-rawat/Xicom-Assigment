import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required"),
  lastName: Yup.string()
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  dob: Yup.date()
    .required("Date of birth is required")
    .test(
      "is-18-years-old",
      "You must be at least 18 years old",
      function (value) {
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          return age > 18;
        }
        return age >= 18;
      }
    ),

  residentialAddress: Yup.object().shape({
    street1: Yup.string()
      .required("Residential address street 1 is required")
      .min(2, "Street must be at least 2 characters")
      .max(50, "Street cannot be more than 50 characters"),
    street2: Yup.string()
      .min(2, "Street must be at least 2 characters")
      .max(50, "Street cannot be more than 50 characters"),
  }),
  permanentAddress: Yup.object().shape({
    street1: Yup.string()
      .required("Permanent address street 1 is required")
      .min(2, "Street must be at least 2 characters")
      .max(50, "Street cannot be more than 50 characters"),
    street2: Yup.string()
      .min(2, "Street must be at least 2 characters")
      .max(50, "Street cannot be more than 50 characters"),
  }),
  documents: Yup.array().of(
    Yup.object().shape({
      fileName: Yup.string()
        .required("File name is required")
        .min(2, "File name must be at least 2 characters")
        .max(50, "File name cannot be more than 50 characters"),
      fileType: Yup.string()
        .required("File type is required")
        .min(2, "File type must be at least 2 characters")
        .max(50, "File type cannot be more than 50 characters"),
      file: Yup.string()
        .required("File is required")
        .min(2, "File must be at least 2 characters")
        .max(50, "File cannot be more than 50 characters"),
    })
  ),
});