import { Button } from "components/Button/Button";
import { StyledWrap } from "components/Container";
import { Input } from "components/Input/Input";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { useGetIsEmailQuery } from 'assets/api/password_recovery_api'

const RecoveryPage = () => {
  const [email, setEmail] = useState("")
  const [isMessage, setIsMessage] = useState(false)
  const { data } = useGetIsEmailQuery(email)

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleEmailSend = () => {
        console.log(JSON.stringify(data))

    if (data.users.length != 0) {
      setIsMessage(true)
    }
  };

  return (
    <StyledPageConatiner>
      <StyledRecoveryPageContainer>
        <StyledTitle>Forgot Password</StyledTitle>
        <Input
          onChange={handleEmailChange}
          labelText="Email"
          hintText="Enter your email address and we will send you further instructions"
          value={email}
          type='email'
        />
        { isMessage ? <><div>We have sent a link to confirm your email to {email}</div>
                    <Button onClick={handleEmailSend}>Send Link Again</Button></>
                    : <Button onClick={handleEmailSend}>Send Link</Button>
        }
        <StyledButtonSecondary onClick = {() => null} variant="secondary">
          Back to Sign In
        </StyledButtonSecondary>
      </StyledRecoveryPageContainer>
    </StyledPageConatiner>
  );
};

export default RecoveryPage;

const StyledPageConatiner = styled(StyledWrap)`
  background: #000;
`;

const StyledRecoveryPageContainer = styled.div`
  background: #171717;
  width: 378px;
  height: 456px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  padding: 24px;
  border: 2px solid #333333;
  border-radius: 2px;
`;

const StyledButtonSecondary = styled(Button)`
  margin-top: 24px;
`;

const StyledTitle = styled.h1`
  color: #fff;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
  margin-bottom: 37px;
`;
