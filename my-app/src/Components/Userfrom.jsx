import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import data from "../data/data.json";
import { formValidation } from "./FormValidateion";

import { useFormik, Formik } from "formik";
import {
  FormControl,
  FormGroup,
  FormLabel,
  FormCheck,
  FormSelect,
  Form,
} from "react-bootstrap";
import axios from "axios";

let INITIAL_VALUES = {
  name: "",
  email: "",
  adress: "",
  age: "",
  doctrer: "",
  gender: "",
  image: "",
  date: "",
  dept: "",
  phone: "",
  latitude: "",
  longitude: "",
  intrest: [],
  password: "",
  cpassword: "",
};

const Userfrom = () => {
  let { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: formValidation,
    onSubmit: (values) => {
      handleForm(values);
    },
  });

  const navigate = useNavigate();

  let [docters, setdocters] = useState([]);
  const [location, setlocation] = useState({ latitude: null, longitude: null });
  const [imgurl, setimgurl] = useState();
  const [image, setimage] = useState();

  const [focus, setfocus] = useState({
    nameFocus: false,
    emailFocus: false,
    adressFocus: false,
    ageFocus: false,
    doctrerFocus: false,
    genderFocus: false,
    imageFocus: false,
    dateFocus: false,
    deptFocus: false,
    phoneFocus: false,
    intrestFocus: false,
    passwordFocus: false,
    cpasswordFocus: false,
  });

  useEffect(() => {
    myLocation();
  }, [values]);

  const myLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // values={...values,latitude: position.coords.latitude,longitude: position.coords.longitude,}
        setlocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("somting went wrong");
    }
  };

  let department = data?.map((item) => {
    return <option key={item.id}>{item.department}</option>;
  });

  let handeldpt = (e) => {
    console.log(e.target.value);
    if (e.target.value) {
      let docters = data.filter((item) => {
        return item.department === e.target.value;
      });
      setdocters(docters);
    }
  };

  let doctersList = docters?.map((item) => {
    return item.docters.map((value, index) => {
      return <option key={index}>Dr.{value.name}</option>;
    });
  });

  const handleForm = (values) => {
    values = {
      ...values,
      latitude: location.latitude,
      longitude: location.longitude,
    };
    if (values.latitude && values.longitude) {
      const formData = new FormData();
      formData.set("file", imgurl);
      formData.set("fileName", imgurl?.name);
      formData.set("name", values.name);
      formData.set("email", values.email);
      formData.set("password",values.password)
      formData.set("cpassword",values.cpassword)
      formData.set("mobile", values.phone);
      formData.set("age", values.age);
      formData.set("date", values.date);
      formData.set("department", values.dept);
      formData.set("docters", values.doctrer);
      formData.set("gender", values.gender);
      formData.set("adress", values.adress);
      formData.set("intrestes", values.intrest);
      formData.set("langtitude", values.latitude);
      formData.set("longtitude", values.longitude);

      const url = "http://localhost:4001/upload";

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      axios.post(url, formData, config).then((response) => {
        console.log(response.data);
      });

      navigate("/userdetails");
    } else {
      alert("You must allow to access your location");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-5">
        <span>Register Form</span>
      </h1>
      <div
        style={{
          width: "150px",
          backgroundColor: "black",
          margin: "30px 0 30px 0px",
          height: "45px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "30px",
        }}
      >
        <a
          href="/userdetails"
          style={{ color: "white", textDecoration: "none" }}
        >
          Goto Details
        </a>
      </div>
      <Formik>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          style={{ width: "800px" }}
        >
          <FormGroup className="mb-3 ">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              name="name"
              value={values.name}
              className="text-center"
              placeholder="Enter Name"
              onChange={(e) => handleChange(e)}
              onBlur={handleBlur}
              onFocus={() => setfocus({ ...focus, nameFocus: true })}
            />
            {focus.nameFocus
              ? errors.name && <span className="errorspan">{errors.name}</span>
              : ""}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Email Address</FormLabel>
            <FormControl
              type="email"
              name="email"
              value={values.email}
              className="text-center"
              placeholder="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={() => setfocus({ ...focus, emailFocus: true })}
            />
            {focus.emailFocus
              ? errors.email && (
                  <span className="errorspan">{errors.email}</span>
                )
              : ""}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Mobile Number</FormLabel>
            <FormControl
              type="tel"
              name="phone"
              value={values.phone}
              required
              className="text-center"
              onChange={handleChange}
              placeholder="Enter Mobile number with Country code"
              onBlur={handleBlur}
              onFocus={() => setfocus({ ...focus, phoneFocus: true })}
            />
            {focus.phoneFocus
              ? errors.phone && (
                  <span className="errorspan">{errors.phone}</span>
                )
              : ""}
          </FormGroup>

          <FormGroup className="mb-3 ">
            <FormLabel>Password</FormLabel>
            <FormControl
              type="text"
              name="password"
              value={values.password}
              className="text-center"
              placeholder="Enter your Password"
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => setfocus({ ...focus, passwordFocus: true })}
            />
            {focus.passwordFocus && errors.password && (
              <span className="errorspan">{errors.password}</span>
            )}
          </FormGroup>

          <FormGroup className="mb-3 ">
            <FormLabel>ConfirmPassword</FormLabel>
            <FormControl
              type="text"
              name="cpassword"
              value={values.cpassword}
              className="text-center"
              placeholder="Re-enter Your Password"
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => setfocus({ ...focus, cpasswordFocus: true })}
            />
            {focus.cpasswordFocus && errors.cpassword && (
              <span className="errorspan">{errors.cpassword}</span>
            )}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel> Age</FormLabel>
            <FormControl
              type="number"
              name="age"
              value={values.age}
              className="text-center"
              placeholder="Enter Your Age"
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() => setfocus({ ...focus, ageFocus: true })}
            />
            {focus.ageFocus && errors.age && (
              <span className="errorspan">{errors.age}</span>
            )}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Address</FormLabel>
            <FormControl
              type="text"
              name="adress"
              value={values.adress}
              className="text-center"
              onBlur={handleBlur}
              placeholder="Enter Your Address"
              onChange={handleChange}
              onFocus={() => setfocus({ ...focus, adressFocus: true })}
            />
            {focus.adressFocus && errors.adress && (
              <span className="errorspan">{errors.adress}</span>
            )}
          </FormGroup>

          <FormGroup className="mb-4 ">
            <FormLabel>Choose Your Date</FormLabel>
            <FormControl
              type="date"
              name="date"
              value={values.date}
              className="text-center"
              onBlur={handleBlur}
              placeholder="Enter Your Address"
              onChange={handleChange}
              onFocus={() => setfocus({ ...focus, dateFocus: true })}
            />
            {focus.dateFocus && errors.date && (
              <span className="errorspan">{errors.date}</span>
            )}
          </FormGroup>

          <FormGroup className="mb-4">
            <FormLabel>Departments</FormLabel>
            <FormSelect
              value={values.dept}
              name="dept"
              onChange={(e) => {
                handleChange(e);
                handeldpt(e);
              }}
              aria-label="Default select example"
              onBlur={handleBlur}
              placeholder="select department"
              onFocus={() => setfocus({ ...focus, deptFocus: true })}
            >
              <option value={""}>Select Department </option>
              {department}
            </FormSelect>
            {focus.deptFocus && errors.dept && (
              <span className="errorspan">{errors.dept}</span>
            )}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel> Docters</FormLabel>
            <FormSelect
              value={values.doctrer}
              name="doctrer"
              onChange={handleChange}
              aria-label="Default select example"
              onBlur={handleBlur}
              onFocus={() => setfocus({ ...focus, doctrerFocus: true })}
            >
              <option> Select Docter</option>

              {doctersList}
            </FormSelect>
            {focus.doctrerFocus && errors.doctrer && (
              <span className="errorspan">{errors.doctrer}</span>
            )}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel> Gender</FormLabel>
            <FormSelect
              value={values.gender}
              name="gender"
              onChange={handleChange}
              aria-label="Default select example"
              onBlur={handleBlur}
              onFocus={() => setfocus({ ...focus, genderFocus: true })}
            >
              <option>Select</option>
              <option value="male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </FormSelect>
            {focus.genderFocus && errors.gender && (
              <span className="errorspan">{errors.gender}</span>
            )}
          </FormGroup>

          <FormGroup className="mt-4 mb-3 d-flex gap-4 justify-content-center">
            <FormLabel>Intrests: </FormLabel>
            <FormCheck
              onChange={handleChange}
              label="Reading"
              name="intrest"
              value="reading"
              type="checkbox"
              onBlur={() => setfocus({ ...focus, intrestFocus: true })}
            />
            <FormCheck
              onChange={handleChange}
              label="Travel"
              name="intrest"
              value="travel"
              type="checkbox"
              onBlur={() => setfocus({ ...focus, intrestFocus: true })}
            />
            <FormCheck
              onChange={handleChange}
              label="Coading"
              name="intrest"
              value="coading"
              type="checkbox"
              onBlur={() => setfocus({ ...focus, intrestFocus: true })}
            />
            {focus.intrestFocus && errors.intrest && (
              <span className="errorspan">{errors.intrest}</span>
            )}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Image</FormLabel>
            <FormControl
              type="file"
              className="text-center"
              name="image"
              placeholder="Upload your Image"
              // onChange={(e) =>{ handleImage(e); setFieldValue("image",URL.createObjectURL( e.target.files[0]))}}
              onChange={(e) => {
                handleChange(e);
                setimgurl(e.target.files[0]);
                setimage(URL.createObjectURL(e.target.files[0]));
              }}
              onFocus={handleBlur}
            />
            {focus.imageFocus && errors.image && (
              <span className="errorspan">{errors.image}</span>
            )}
            <img style={{ width: 200, marginTop: 15 }} src={image} alt="" />
          </FormGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Userfrom;
