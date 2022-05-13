import * as Yup from "yup";

export const searchValidation = Yup.object().shape({
  source: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  destination: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  departure: Yup.date().required("Required"),
});
