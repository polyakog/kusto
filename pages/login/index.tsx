import React from 'react';
import styled from "styled-components";
import {themeProject} from "../../styles/styledComponents/Them.styled";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import google from '../../public/icons/google-svgrepo-com 1.svg'
import github from '../../public/icons/github-svgrepo-com (3) 1.svg'
import Image from "next/image";
import {Button, ThemeButton} from "../../components/Button/ui/Button";
import {Input} from "../../components/Input/Input";


const Login = () => {

  return (
    // <StyledPageWrapper>
    <StyledFormAuth width={'378px'} height={'516px'} >
      <Title>Sing In</Title>
      <StyledIconBlock>
        <Image width={36} height={36} src={google} alt={'Kusto'}/>
        <Image  width={36} height={36} src={github} alt={'it'}/>
      </StyledIconBlock>
      <Input/>
      <div>
        <Button theme={ThemeButton.PRIMARY}>Log In</Button>
      </div>
    </StyledFormAuth>
    // </StyledPageWrapper>
  );
};

Login.getLayout = getLayout
export default Login;

type FormAuthPropsType = {
  width: string
  height: string
}

const StyledFormAuth = styled.div<FormAuthPropsType>
  `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    //align-items: flex-start;
    width: ${props => props.width};
    height: ${props => props.height};
    background: ${themeProject.colors.dark_500};
    border: 1px solid ${themeProject.colors.dark_300};
    padding: 20px;
  `

const Title = styled.h1
`
  text-align: center;
  width: 100%;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 36px;
  color:${themeProject.colors.light_100};
  margin: 0;
`
const StyledIconBlock = styled.div
`
  max-width: 132px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 50px 20px 50px;
`





