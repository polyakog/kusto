import React from "react"
import { Formik } from "formik"
import showPasswordBtn from "../../public/icons/eye-outline.svg"
import hidePasswordBtn from "../../public/icons/eye-off-outline.svg"
import googleIcon from "../../public/icons/google-svgrepo-com.svg"
import githubIcon from "../../public/icons/github-svgrepo-com.svg"
import { SignupSchema } from "utils/registrationValidation"
import {
  StyledBtn,
  StyledContainer,
  StyledErrorMsg,
  StyledField,
  StyledForm,
  StyledShowPasswordBtn,
  StyledSignIn,
  StyledSignInWrapper,
  StyledSocialMediaIcon,
  StyledSocialMediaWrapper,
  StyledText,
  StyledTitle
} from "styles/styles"
import { getLayout } from "../../components/Layout/BaseLayout/BaseLayout"
import Home from "../index"
import { useShowPassword } from "assets/hooks/useShowPassword"

interface reqI {
  login: string
  password: string
  email: string
}

export default function Registration() {
  const { passwordType, passwordConfirmationType, showPassword, showPasswordConfirmation } =
    useShowPassword()

  return (
    <StyledContainer>
      <StyledTitle>Sign Up</StyledTitle>
      <StyledSocialMediaWrapper>
        <StyledSocialMediaIcon alt="google-icon" src={googleIcon} />
        <StyledSocialMediaIcon alt="github-icon" src={githubIcon} />
      </StyledSocialMediaWrapper>
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordConfirmation: "",
          email: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values, { resetForm }) => {
          console.log(values)
          const data: reqI = {
            email: values.email,
            password: values.password,
            login: values.username
          }

          try {
            await fetch("https://calypso-one.vercel.app/auth/registration", {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json"
              }
            }).then(() => console.log("otpravleno"))
            resetForm()
          } catch {
            console.log("err")
          }
        }}
      >
        {({ errors, touched }) => (
          <StyledForm>
            <label>
              Username
              <StyledField
                name="username"
                border={errors.username?.length && touched.username ? "red" : "white"}
              />
              {errors.username && touched.username ? (
                <StyledErrorMsg>{errors.username}</StyledErrorMsg>
              ) : null}
            </label>
            <label id="pass">
              Password
              <StyledField
                name="password"
                type={passwordType}
                border={errors.password?.length && touched.password ? "red" : "white"}
              />
              <StyledShowPasswordBtn
                alt="show password"
                src={passwordType === "password" ? showPasswordBtn : hidePasswordBtn}
                onClick={() => showPassword()}
              />
              {errors.password && touched.password ? (
                <StyledErrorMsg>{errors.password}</StyledErrorMsg>
              ) : null}
            </label>
            <label id="pass">
              Password confirmation
              <StyledShowPasswordBtn
                alt="show password"
                src={passwordConfirmationType === "password" ? showPasswordBtn : hidePasswordBtn}
                onClick={() => showPasswordConfirmation()}
              />
              <StyledField
                name="passwordConfirmation"
                type={passwordConfirmationType}
                border={
                  errors.passwordConfirmation?.length && touched.passwordConfirmation
                    ? "red"
                    : "white"
                }
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <StyledErrorMsg>{errors.passwordConfirmation}</StyledErrorMsg>
              ) : null}
            </label>
            <label>
              Email
              <StyledField
                name="email"
                type="email"
                border={errors.email?.length && touched.email ? "red" : "white"}
              />
              {errors.email && touched.email ? (
                <StyledErrorMsg>{errors.email}</StyledErrorMsg>
              ) : null}
            </label>
            <StyledBtn type="submit">Sign Up</StyledBtn>
          </StyledForm>
        )}
      </Formik>
      <StyledSignInWrapper>
        <StyledText>Do you have an account?</StyledText>
        <StyledSignIn href="/login">Sign in</StyledSignIn>
      </StyledSignInWrapper>
    </StyledContainer>
  )
}

Registration.getLayout = getLayout
