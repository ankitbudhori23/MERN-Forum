import "./styles.css";
import Quesbox from "./Quesbox";
import { useState } from "react";

export default function Questions() {
  const [ques, setques] = useState("");
  const [username, setusername] = useState("");
  const subque = async () => {
    if (ques.length > 5 && username) {
      await fetch("https://hv2qx8.sse.codesandbox.io/api/questions", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          user: username,
          questionName: ques
        })
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
        })
        .catch((error) => {
          console.log(error);
        });
      setques("");
      setusername("");
    }
  };

  return (
    <>
      <div className="question">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <br />
        <textarea
          value={ques}
          onChange={(e) => setques(e.target.value)}
          placeholder="Enter your question."
        ></textarea>
        <br />
        <button onClick={subque}>Submit</button>
        <br />
        <Quesbox />
      </div>
    </>
  );
}
