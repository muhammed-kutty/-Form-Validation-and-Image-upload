import * as yup from "yup";

const phoneRegExp = /^[0-9+]\d{12}$/;
const nameRegex = /^[a-zA-Z][a-zA-Z_\-. ]{2,50}$/;
const emailRegx = /^[a-zA-Z][a-zA-Z0-9_\-.]+[@][a-z]+[.][a-z]{2,3}$/;
const psswordRegx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const handleDate = (value) => {
  let currentDate = new Date().toLocaleDateString();
  let currentYear = currentDate.slice(5, 9);
  let currentMonth = currentDate.slice(0, 1);
  let currentDay = currentDate.slice(2, 4);
  if (value) {
    let getdate = value;
    let getYear = getdate.slice(0, 4);
    let getMonth = getdate.slice(5, 7);
    let getDay = getdate.slice(8, 10);

    if (getYear - currentYear >= 0) {
      if (getMonth - currentMonth >= 0) {
        if (getDay - currentDay >= 0) {
          return value;
        }
      }
    }
  }
};

export const formValidation = yup.object({
  name: yup
    .string()
    .min(3)
    .required("Name is Required")
    .matches(nameRegex, "Name is not valid"),
  email: yup
    .string()
    .email("Please Enter Valid Email")
    .required("Email is required")
    .matches(emailRegx, "First lettr should be a alphephets"),
  adress: yup
    .string()
    .min(10, "Adress is too short please enter more Details")
    .max(70, "Adress is too Big ")
    .required("Adress is required"),
  age: yup.number().min(18).max(100).required("Please Enter Your Age"),
  doctrer: yup.string().required("Docter is Required"),
  gender: yup.string().required("Gender is Required"),
  image: yup.string().required("Select Your image"),

  date: yup
    .string()
    .required("Date is Required")
    .test("date", "Date  is not valied", (value) => {
      let checkedDate = handleDate(value);
      if (checkedDate?.length) {
        return true;
      } else {
        return false;
      }
    }),

  dept: yup.string().required("Department is Required"),
  phone: yup
    .string()
    .required("plese Enter your Phone without Country Code")
    .matches(phoneRegExp, "Not valied Phone number"),
  intrest: yup
    .array()
    .min(1, "Select atleast One Intrest")
    .required("Select atleast One Intrest"),
  password: yup
    .string()
    .required()
    .matches(
      psswordRegx,
      "password Contain Minimum eight characters, at least one letter, one number and one special character:"
    ),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password Must match")
    .required("Confirm Password is Must"),
});
