import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import socket from '../../socket';

const Main = (props) => {
  const roomRef = useRef();
  const userRef = useRef();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {

    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        sessionStorage.setItem('user', userName);
        props.history.push(`/room/${roomName}`);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
  }, [props.history]);

  function clickJoin() {
    const roomName = roomRef.current.value;
    const userName = userRef.current.value;

    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Enter Room Name or User Name');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName });
    }
  }

  return (
    <Body>
      <H1 id="h1">🧑‍💻 Video Group Meeting</H1>
      <MainContainer>
        <Row>
          <Label htmlFor="roomName">📁 Room Number</Label>
          <Input
            type="text"
            id="roomName"
            ref={roomRef}
            style={{ marginLeft: "25px" }}
          />
        </Row>
        <Row>
          <Label htmlFor="userName">📁 User Name</Label>
          <Input
            type="text"
            id="userName"
            ref={userRef}
            style={{ marginLeft: "67px" }}
          />
        </Row>
        <JoinButton onClick={clickJoin}> Join </JoinButton>
        {err ? <Error>{errMsg}</Error> : null}
      </MainContainer>
    </Body>
  );
};

// styled

const Body = styled.body`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const H1 = styled.h1`
  margin-top: -20px;
  color: black;
  font-family: "NunitoBlack";
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 30px;
  width: 650px;
  height: 400px;
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.15);
`;

const Row = styled.div`
  margin: 20px 50px 0px;
  line-height: 35px;
`;

const Label = styled.label`
  font-family: "NunitoExtraBold";
  color: black;
`;

const Input = styled.input`
  width: 150px;
  height: 35px;
  padding: 2px 10px;
  margin-left: 15px;
  outline: none;
  border: 1px solid black;
  border-radius: 20px;
  font-family: "NunitoBold";
  color: black;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

const JoinButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-top: 60px;
  padding: 8px 20px;
  outline: none;
  border: none;
  border-radius: 10px;
  font-family: "NunitoExtraBold";
  color: white;
  background-color: black;
  font-size: 25px;

  :hover {
    background-color: #fcd53f;
    color: black;
    cursor: pointer;
  }
`;

export default Main;
