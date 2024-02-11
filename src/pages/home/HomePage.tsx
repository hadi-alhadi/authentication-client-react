import { Card, CardTitle } from "react-bootstrap";
import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <HomePageContainer data-testid="home-page-container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <CardTitle>Welcome to the application.</CardTitle>
        </Card.Body>
      </Card>
    </HomePageContainer>
  );
};
export default HomePage;

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
