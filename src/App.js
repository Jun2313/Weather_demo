import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function App() {
const API_KEY = "6c3b8ec558e36f8f98599f6070da6a43";
const [result, setResult] = useState({});
const [location, setLocation] = useState('')

const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`


const searchweather = async (e) => {
  if (e.key === 'Enter') {
    try {
      const data = await axios({
        method: "GET",
        url:url
      });
      console.log(data)
      setResult(data);
    } 
    catch (error) {
      console.error("에러", error);
    }
  }
};
  return (
    <AppWrap>
      <div className="appContentWrap">
        <input 
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="도시를 입력해주세요"
          onKeyDown={searchweather}
        />
        {Object.keys(result).length !== 0 && (
          <ResultWrap>
            <div className="city">{result.data.name}</div>
            <div className="temp">{result.data.main.temp}</div>
            <div className="sky">{result.data.weather[0].main}</div>
          </ResultWrap>
          )}
      </div>
    </AppWrap>
  );
}

export default App;

const AppWrap = styled.div`
  width: 100vw;
  height: 100vh;

.appContentWrap {
  left: 50%;
  top: 50%;
  transform: translateY(-50%, -50%);
  position: absolute;
  padding: 20px;
}
input {
  padding: 16px;
  border: 2px solid black;
  border-radius: 16px;
}
`;

const ResultWrap = styled.div`
  margin-top: 60px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;

  .city{
    fonst-size: 24px;
  }
  .temp{
    font-size: 60px;
    margin-top: 8px;
  }
  .sky{
    fonst-size: 20px;
    text-align: right;
    margin-top: 8px;
  }
`;
