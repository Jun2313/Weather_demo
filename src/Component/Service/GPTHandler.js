import React, { useState } from 'react';
import axios from 'axios';


// const [isLoading, setIsLoading] = useState(false);

const OPENAI_API_KEY = "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";

//GPT번역함수
export const translateCityName = async (cityName) => {
  const prompt = `Translate '${cityName}' from Korean to English.`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "오직 수도, 나라 명만 영문으로 적어줘." },
                    { role: "user", content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let translatedCity = response.data.choices[0].message.content.trim();

  const match = translatedCity.match(/is ([\w\s]+)\./);
  if (match && match[1]) {
    translatedCity = match[1].trim();
  }
  
  console.log("Translated City: ", translatedCity);
  return translatedCity;
} catch (error) {
  console.error("Error in translation:", error);
  return cityName;
}
};

//GPT 텍스트 생성함수
export const generateTextWithOpenAI = async (weatherData, setIsLoading) => {
  const prompt = `Given today's weather in ${weatherData.name} with a temperature of ${weatherData.main.temp}°C and ${weatherData.weather[0].description}, 옷을 어떻게 입어야할까?`;

  try {
    setIsLoading(true);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "당신은 친절한 인공지능 챗봇입니다. 입력에 대해 한글로 변역해서 3줄로 짧고 간결하고 친절하게 대답해주세요" },
                    { role: "user", content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    setIsLoading(false);
    return response.data.choices[0].message.content;

  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded:", error.response.data);
      setIsLoading(false);
      return "Rate limit exceeded, please try again later.";
    } else {
      console.error("Error with OpenAI API:", error);
      setIsLoading(false);
      return "An error occurred, please try again later.";
    }
  }
};