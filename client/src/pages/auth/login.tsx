import { AuthForm } from "@/components/forms/authForm";
import { Link } from "@/components/link";
import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <Title>Login</Title>
      <AuthForm type="login"/>
      <Link href="/register">Already have an account? register</Link>
    </Container>
  );};
export default Login;

const Container = styled.section`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;
background-color: ${({theme}) => theme.palette.background.dark};
max-width: 500px;
min-height: 500px;
border-radius: 10px;
padding: 12px;
`;

const Title = styled.h1`
text-align: center;
margin-bottom: 16px;
`;
