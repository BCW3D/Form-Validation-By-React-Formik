import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import style from "./signup.module.css";

export default function SignUp() {
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length > 15) {
      errors.name = "Name must be 15 characters or less";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (!/(?=.*[A-Z])/i.test(values.password)) {
      errors.password = "Password must have a uppercase letter";
    } else if (!/[0-9]/i.test(values.password)) {
      errors.password = "Password must have a number";
    } else if (
      !/^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/i.test(values.password)
    ) {
      errors.password = "Password must have a special charater";
    } else if (!/[a-z]/i.test(values.password)) {
      errors.password = "Password must have a letter";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 charaters long";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <div className={style["signup-form"]}>
      <h1>Registration Form</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Form.Group>

        {formik.errors.name ? (
          <p style={{ color: "red" }}>{formik.errors.name}</p>
        ) : null}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </Form.Group>
        {formik.errors.email ? (
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        ) : null}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Form.Group>
        {formik.errors.password ? (
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        ) : null}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
