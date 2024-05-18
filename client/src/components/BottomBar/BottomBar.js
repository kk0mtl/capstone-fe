import React, { useCallback } from 'react';
import styled from 'styled-components';

const BottomBar = ({
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices,
  clickScreenSharing,
  screenShare,
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
}) => {
  const handleIncreaseFontSize = useCallback(() => {
    increaseFontSize();
  }, [increaseFontSize]);

  const handleDecreaseFontSize = useCallback(() => {
    decreaseFontSize();
  }, [decreaseFontSize]);

  const handleResetFontSize = useCallback(() => {
    resetFontSize();
  }, [resetFontSize]);

  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );
  return (
    <Bar>
      <Left>
        <Label>Sub</Label>
        <PlusButton onClick={increaseFontSize}>+</PlusButton>
        <MinusButton onClick={decreaseFontSize}>-</MinusButton>
        <ResetButton onClick={resetFontSize}>🔄️</ResetButton>
      </Left>
      <Center>
        <CameraButton onClick={toggleCameraAudio} data-switch="video">
          <div>
            {userVideoAudio.video ? (
              <FaIcon className="fas fa-video"></FaIcon>
            ) : (
              <FaIcon className="fas fa-video-slash"></FaIcon>
            )}
          </div>
          카메라
        </CameraButton>
        {showVideoDevices && (
          <SwitchList>
            {videoDevices.length > 0 &&
              videoDevices.map((device) => {
                return (
                  <div
                    key={device.deviceId}
                    onClick={clickCameraDevice}
                    data-value={device.deviceId}
                  >
                    {device.label}
                  </div>
                );
              })}
            <div>Switch Camera</div>
          </SwitchList>
        )}
        <CameraButton onClick={toggleCameraAudio} data-switch="audio">
          <div>
            {userVideoAudio.audio ? (
              <FaIcon className="fas fa-microphone"></FaIcon>
            ) : (
              <FaIcon className="fas fa-microphone-slash"></FaIcon>
            )}
          </div>
          마이크
        </CameraButton>
        <ScreenButton onClick={clickScreenSharing}>
          <div>
            <FaIcon
              className={`fas fa-desktop ${screenShare ? 'sharing' : ''}`}
            ></FaIcon>
          </div>
          화면 공유
        </ScreenButton>
      </Center>
      {/* <DownButton>Download</DownButton> */}
      <StopButton onClick={goToBack}>Stop</StopButton>
    </Bar>
  );
};

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  overflow: hidden;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
  /* border: 1px solid white;
  border-radius: 10px; */
  padding: 8px 15px;
`;

const Label = styled.label`
  font-family: "NunitoExtraBold";
  font-size: 15px;
  letter-spacing: 1px;
  margin-right: 8px;
`;

const PlusButton = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  font-size: 25px;
  line-height: 20px;
  margin-right: 6px;
  //background-color: #f6d365;
  background: linear-gradient(0deg, #f6d365 0%, #ffe9aa 100%);

  color: black;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 3px;
  outline: none;
  border-radius: 7px;
  font-family: "NunitoExtraBold";

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const MinusButton = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  font-size: 25px;
  line-height: 20px;
  margin-right: 6px;
  background: linear-gradient(0deg, #f6d365 0%, #ffe9aa 100%);
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 3px;
  outline: none;
  border-radius: 7px;
  font-family: "NunitoExtraBold";

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const ResetButton = styled.div`
  width: 30px;
  height: 30px;
  border: none;
  font-size: 36px;
  line-height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 3px;
  outline: none;
  border-radius: 7px;
  font-family: "NunitoExtraBold";

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const Center = styled.div`
  display: flex;
  margin-right: 85px;
`;

const CameraButton = styled.div`
  font-family: "NunitoExtraBold";
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;
  margin-top: 5px;
  margin-left: 15px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: #ee2560;
  }

  .fa-video-slash {
    color: #ee2560;
  }
`;

const SwitchList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: -65.95px;
  left: 80px;
  background-color: #4ea1d3;
  color: white;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  text-align: left;

  > div {
    font-size: 0.85rem;
    padding: 1px;
    margin-bottom: 5px;

    :not(:last-child):hover {
      background-color: #77b7dd;
      cursor: pointer;
    }
  }

  > div:last-child {
    border-top: 1px solid white;
    cursor: context-menu !important;
  }
`;

// const DownButton = styled.div`
//   width: 75px;
//   height: 30px;
//   border: none;
//   font-size: 15px;
//   line-height: 20px;
//   margin-right: 15px;
//   background-color: CornFlowerBlue;

//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 3px 5px;
//   outline: none;
//   border-radius: 10px;
//   font-family: "NunitoExtraBold";

//   :hover {
//     background-color: #f25483;
//     cursor: pointer;
//   }
// `;
const ScreenButton = styled.div`
  width: auto;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #77b7dd;
    cursor: pointer;
    border-radius: 15px;
  }

  .sharing {
    color: #ee2560;
  }
`;

const StopButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 16px;
  line-height: 20px;
  margin-right: 20px;
  background: rgb(251, 33, 117);
  background: linear-gradient(
    0deg,
    rgba(251, 33, 117, 1) 0%,
    rgba(234, 76, 137, 1) 100%
  );

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 4px;
  outline: none;
  border-radius: 10px;
  overflow: hidden;
  font-family: "NunitoExtraBold";

  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  :before {
    position: absolute;
    content: "";
    display: inline-block;
    top: -180px;
    left: 0;
    width: 30px;
    height: 100%;
    background-color: #fff;
  }

  :hover {
    text-decoration: none;
    opacity: 0.8;
    cursor: pointer;
  }
`;

const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

export default BottomBar;
