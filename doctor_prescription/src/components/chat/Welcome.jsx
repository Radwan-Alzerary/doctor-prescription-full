import React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

export default function Welcome({ currentUser }) {
  console.log(currentUser);
  return (
    <Container>
      <div className="text-center">
        {/* <img src={Robot} alt="welcome" /> */}
        <h1 className=" font-bold text-5xl text-center">
          <FormattedMessage id={"welcome"} defaultMessage="Hello, World!" />
          <span>{currentUser.userName}!</span>
        </h1>
        <h3 className="text-center font-bold text-5xl">
          <FormattedMessage id={"startMassage"} defaultMessage="Hello, World!" />
        </h3>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 75%;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: black;
  img {
    height: 20rem;
  }
  span {
    color: #4e00ff;
    text-transform: capitalize;
  }
`;
