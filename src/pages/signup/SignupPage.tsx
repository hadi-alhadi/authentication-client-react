import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
// import Button from "react-bootstrap/Button";
import { NotificationManager } from "react-notifications";
import * as yup from "yup";
import { authAPI } from "../../services/auth.service";
import { setShowLoader } from "../../redux/slices/general.slice";
import { useAppDispatch } from "../../redux/hooks";
import { setAuthenticatedUser } from "../../redux/slices/auth.slice";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),
});

const SignupPage = () => {
  const [signup, { data, error, isLoading }] = authAPI.useSignupMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.accessToken && !error) {
      NotificationManager.success(
        `Thank you ${data.name}`,
        "Registration Success",
      );
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setAuthenticatedUser(data));
      navigate("/home");
    } else if (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const errorMessage = error?.data?.message || "Error authenticating user";
      NotificationManager.error(errorMessage, "Authentication Error");
      console.log(`SignupPage: Authentication error`, error);
    }
  }, [data?.accessToken, error, dispatch, navigate]);

  useEffect(() => {
    dispatch(setShowLoader(isLoading));
  }, [isLoading, dispatch]);

  const handleSignup = (formValue: {
    name: string;
    email: string;
    password: string;
  }) => {
    const { name, email, password } = formValue;
    signup({ name, email, password });
  };

  return (
    <PageContainer data-testid="signup-page-container">
      <Formik
        validationSchema={schema}
        onSubmit={handleSignup}
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <SignUpCard>
            <Title>Sign Up Page</Title>
            <SignUpForm noValidate onSubmit={handleSubmit}>
              <Form.Group as={Col} md="12" controlId="validationFormikName">
                <Form.Label>Name</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    aria-describedby="inputGroupPrepend"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name && touched.name}
                    onBlur={handleBlur}
                  />
                  {touched.name && (
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
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
                    isInvalid={!!errors.email && touched.email}
                    onBlur={handleBlur}
                  />
                  {touched.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="validationFormikPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    placeholder="Your Password"
                    aria-describedby="inputGroupPrepend"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password && touched.password}
                    onBlur={handleBlur}
                  />
                  {touched.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
              <div>
                <span>Already have an account?</span>{" "}
                <a href="/signin">Sign In</a>
              </div>
              <StyledButton type="submit">Sign Up</StyledButton>
            </SignUpForm>
          </SignUpCard>
        )}
      </Formik>
    </PageContainer>
  );
};

export default SignupPage;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

const SignUpCard = styled(Card)`
  padding: 20px;
  width: 18rem;
`;

const Title = styled(Card.Title)`
  text-align: center;
  padding-top: 20px;
`;

const SignUpForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledButton = styled.button`
  border-radius: 30px;
  box-shadow: none;
  background-image: linear-gradient(145deg, #2cbd9a, #65c86d);
  box-sizing: border-box;
  outline: none;
  cursor: pointer;
  border: 0;
  color: #fff;
  height: 60px;
`;
