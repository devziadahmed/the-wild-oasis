import styled from "styled-components";

import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const { isAuthenticated, isLoading: userLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !userLoading) navigate("/");
  }, [isAuthenticated, userLoading, navigate]);

  if (userLoading) return <Spinner />;

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h1" style={{ textAlign: "center" }}>
        Log into your account
      </Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
