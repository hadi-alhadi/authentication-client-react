import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectGeneral } from "./redux/slices/general.slice";
import {
  resetState,
  selectAuthenticatedUser,
  setAuthenticatedUser,
} from "./redux/slices/auth.slice";
import { store } from "./redux/store";
import Loader from "./components/Loader";
import RootNavigation from "./navigation/RootNavigation";

function App() {
  const general = useAppSelector(selectGeneral);
  const { name, accessToken } = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();
  const [finishedInitialize, setFinishedInitialize] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userFromStorage = JSON.parse(user);
      console.log("userFromStorage", userFromStorage);
      dispatch(setAuthenticatedUser(userFromStorage));
    }
    setFinishedInitialize(true);
  }, [dispatch]);

  const logout = () => {
    dispatch(resetState());
  };

  return (
    <div className="App">
      {finishedInitialize && (
        <Provider store={store}>
          <NotificationContainer />
          <Loader show={general.isLoading} />
          {accessToken && (
            <Navbar bg="dark" expand="lg" variant="dark">
              <Container>
                <Navbar.Brand href="#home">Auth App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse
                  id="basic-navbar-nav"
                  className="justify-content-end"
                >
                  <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <NavDropdown title={name} id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={logout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          )}
          <RootNavigation />
        </Provider>
      )}
    </div>
  );
}

export default App;
