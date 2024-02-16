import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as yup from "yup";
import { Formik } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import "./signinPage.css";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useAppDispatch } from "../../redux/hooks";
import { useSigninMutation } from "../../services/auth.service";
import { setAuthenticatedUser } from "../../redux/slices/auth.slice";
import { setShowLoader } from "../../redux/slices/general.slice";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup.string().required("Password is required"),
});

const SigninPage = () => {
  const [signin, { data, error, isLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && !error) {
      console.log("SigninPage:: data:", data);
      NotificationManager.success(
        `Welcome ${data.name}`,
        "Authentication Success",
      );
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setAuthenticatedUser(data));
      navigate("/home");
    } else if (error) {
      NotificationManager.error(
        "Error authenticating user, please check your email and password",
        "Authentication Error",
      );
      console.log(`SigninPage:: Authentication error`, error);
    }
  }, [data, error, dispatch, navigate]);

  useEffect(() => {
    dispatch(setShowLoader(isLoading));
  }, [isLoading, dispatch]);

  const handleSignin = (formValue: { email: string; password: string }) => {
    const { email, password } = formValue;
    signin({ email, password });
  };

  return (
    <div className="signin-wrapper">
      <Formik
        validationSchema={schema}
        onSubmit={handleSignin}
        initialValues={{
          email: "",
          password: "",
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Card className="card" style={{ width: "18rem" }}>
            <Card.Title className="title">Sign In Page</Card.Title>
            <Form className="form" noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="validationFormikEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Your email address"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="validationFormikPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Your password"
                    aria-describedby="inputGroupPrepend"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <div>
                <span>Don’t have an account?</span>{" "}
                <a href="/signup">Sign Up</a>
              </div>
              <Button type="submit" className="submit-button">
                Sign In
              </Button>
            </Form>
          </Card>
        )}
      </Formik>
    </div>
  );
};

export default SigninPage;
