import { Suspense, createContext, useRef } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import Spinner from "./Spinner";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  position: relative;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export const MainContext = createContext();

function AppLayout() {
  const mainRef = useRef(null);

  return (
    <StyledAppLayout>
      <Header />

      <Sidebar />

      <MainContext.Provider value={{ mainRef }}>
        <Main ref={mainRef}>
          <Container>
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </Container>
        </Main>
      </MainContext.Provider>
    </StyledAppLayout>
  );
}

export default AppLayout;
