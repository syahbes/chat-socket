import useModalContext from "@/store/modalContext";
import styled from "styled-components";
import { SideBar } from "@/components/sidebar";

const App = () => {
  const { isModalOpen, closeModal, currentModal } = useModalContext();
  return (
    <>
      <Container>
        <SidebarWrapper>
          <SideBar />
          {/* <StyledH2>Sidebar</StyledH2> */}
        </SidebarWrapper>
        <MessagesWrapper>{/* <StyledH2>Messages</StyledH2> */}</MessagesWrapper>
      </Container>
      {/* modal */}
    </>
  );
};

const Container = styled.main`
  width: 100%;
  height: 95%;
  max-width: 1280px;
  background-color: ${({ theme }) => theme.palette.background.dark};
  border-radius: 4px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const SidebarWrapper = styled.div`
  width: 30%;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50%;
  }
`;

const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 50%;
  }
`;

const StyledH2 = styled.h2`
  margin-top: 16px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
`;

export default App;
