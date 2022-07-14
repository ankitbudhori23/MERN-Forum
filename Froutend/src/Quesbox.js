import "./styles.css";
import { useEffect, useState } from "react";

export default function Quesbox() {
  const [fetdata, setfetdata] = useState([]);
  const [adom, setadom] = useState(false);
  const [qansna, setqansna] = useState("");
  const [qans, setqans] = useState("");
  const [qid, setqid] = useState("");

  const fetchData = () => {
    fetch("https://hv2qx8.sse.codesandbox.io/api/questions")
      .then((response) => response.json())
      .then((data) => {
        // console.warn(data);
        setfetdata(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  });

  const subans = async () => {
    if (qans.length > 3 && qansna) {
      await fetch("https://hv2qx8.sse.codesandbox.io/api/answers", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          questionId: qid,
          user: qansna,
          answer: qans
        })
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
        })
        .catch((error) => {
          console.log(error);
        });
      setqid("");
      setqans("");
      setqansna("");
      setadom(false);
    } else {
      alert("Enter answer");
    }
  };
  return (
    <>
      {adom && (
        <div className="domans">
          <div className="doma">
            <button onClick={() => setadom(false)} className="anscls">
              close
            </button>
            <input
              type="text"
              placeholder="Enter your name"
              value={qansna}
              onChange={(e) => setqansna(e.target.value)}
            />
            <br />
            <textarea
              value={qans}
              onChange={(e) => setqans(e.target.value)}
              placeholder="Enter your answer"
            ></textarea>
            <br />
            <button onClick={subans}>Submit</button>
          </div>
        </div>
      )}

      <div className="qcbox">
        {fetdata.map((d) => (
          <div className="allques" key={d._id}>
            <div className="qme">
              <h4 className="qhead">Ques :- {d.questionName}</h4>
              <h6 className="qus">By :- {d.user}</h6>
              <button
                className="qansw"
                onClick={() => {
                  setadom(true);
                  setqid(d._id);
                }}
              >
                Add answer
              </button>
            </div>
            <div className="ansmain">
              {d.allAnswers.map((e) => (
                <div className="ans" key={e._id}>
                  <div className="ansa">{e.answer}</div>
                  <div className="ansuser">By :-{e.user}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
