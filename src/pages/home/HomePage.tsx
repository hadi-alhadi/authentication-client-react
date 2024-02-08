import { Card, CardTitle } from "react-bootstrap";
import "./homePage.css";
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="home-wrapper" data-testid="home-wrapper">
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <CardTitle>Welcome to the application.</CardTitle>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
export default HomePage;
