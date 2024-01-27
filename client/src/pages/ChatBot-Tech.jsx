import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/Chatbot.css'
import axios from 'axios'
function Chatech(){
  const location = useLocation();
  const imageName = location.state.imageName;
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  console.log(userAnswers)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:3001/extract/tech", {
          imageName,
        });

        const extractedQuestions = response.data.questions;

        if (extractedQuestions && extractedQuestions.length > 0) {
          setQuestions(extractedQuestions);
          setLoading(false);
        } else {
          console.error("No questions extracted");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [imageName]);

  useEffect(() => {
    if (!loading && questions.length > 0) {
      if (currentQuestionIndex < questions.length) {
        const isQuestionDisplayed = messages.some(
          (message) => message.text === questions[currentQuestionIndex]
        );

        if (!isQuestionDisplayed) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: questions[currentQuestionIndex], sender: "bot" },
          ]);
        }
      }
    }
  }, [loading, questions, currentQuestionIndex]);

  useEffect(() => {
    console.log("showEvaluation:", showEvaluation);
  }, [showEvaluation]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessages = [...messages, { text: inputMessage, sender: "user" }];
      setMessages(newMessages);
      setUserAnswers((prevAnswers) => [...prevAnswers, inputMessage]);
      setInputMessage("");
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      console.log("No more questions");
      setShowEvaluation(true);
      try {
        axios.post("http://localhost:3001/evaluate", {
          questions, userAnswers, imageName
        }).then((res) => {
          //console.log(res.data.feedback)
          let feedback = res.data.feedback
          console.log(res.status)
          if (res.status === 200) {
            console.log("Idhar ara h")
            navigate('/feedback', { state: { feedback } });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">ChatBot</h1>
      <p className="image-name">Received Image Name: {imageName}</p>
      {showEvaluation ? <p>Evaluating</p> : <p></p>}

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "bot" ? "bot-message" : "user-message"
              }`}
          >
            <span className="message-sender">
              {message.sender === "bot" ? "Bot:" : "You:"}
            </span>{" "}
            {message.text}
          </div>
        ))}
      </div>

      {loading ? (
        <p>Loading questions...</p>
      ) : currentQuestionIndex < questions.length ? (
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your answer..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="message-input"
          />
          <button
            onClick={handleSendMessage}
            className="send-button"
            disabled={showEvaluation}
          >
            Send
          </button>
        </div>
      ) : (
        <div>
          {showEvaluation && (
            <div>
              <p>Evaluation paragraph after 10 questions...</p>
              <p>Additional content for evaluation...</p>
            </div>
          )}
          {!showEvaluation && <p>No more questions</p>}
        </div>
      )}
    </div>
  );
}

export default Chatech;