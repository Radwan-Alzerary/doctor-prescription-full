import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useEffect, useState } from "react";

const VoiceRecoed = () => {
  const [selector, setSelector] = useState("");
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  useEffect(() => {
    if (selector === "input1") {
      setValue1(transcript);
    } else if (selector === "input2") {
      setValue2(transcript);
    }
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="container">
        <h2>Speech to Text Converter</h2>
        <br />
        <p>
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>
        <input
          value={value1}
          onChange={(event) => {
            setValue1(event.target.value);
          }}
          onClick={() => {
            setSelector("input1");
            resetTranscript()

          }}
        ></input>
        <input
          value={value2}
          onChange={(event) => {
            setValue2(event.target.value);
          }}
          onClick={() => {
            setSelector("input2");
            resetTranscript()
          }}
        ></input>

        <div className="main-content">{transcript}</div>

        <div className="btn-style">
          <button onClick={startListening}>Start Listening</button>
          <button onClick={SpeechRecognition.stopListening}>
            Stop Listening
          </button>
        </div>
      </div>
    </>
  );
};

export default VoiceRecoed;
