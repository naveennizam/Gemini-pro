import "./App.css";
import { useState, useEffect } from "react";
import OpenAI from "openai";
//import { OpenAI } from "@langchain/openai";
//import { ChatOpenAI } from "@langchain/openai";
import axios from "axios";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ...
function NameGenerator() {
  const openai = new OpenAI({
    apiKey: "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", // This is the default and can be omitted
    dangerouslyAllowBrowser: true,
  });

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(
    "AIzaSyAI3ngwNHqP2_Dt-eMpwLTZfESaDSSBxys"
  );

  // ...
  const [age, setAge] = useState("");
  const [result, setResult] = useState([]);
  const [promptData, setPromptData] = useState([]);
  const changeAge = async () => {
    // For text-only input, use the gemini-pro model
    setAge(prompt("Write something"));
    console.log("agge", age);
    if (age != " ") {
      const generationConfig = {
        maxOutputTokens: 10,
        temperature: 0.9,
      };
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      // const chat = model.startChat({
      //   history: [
      //     {
      //       role: "user",
      //       parts: [{ text: "Hello, I have 2 dogs in my house." }],
      //     },
      //     {
      //       role: "model",
      //       parts: [{ text: "Great to meet you. What would you like to know?" }],
      //     },
      //   ],
      //   generationConfig: {
      //     maxOutputTokens: 10,
      //   },
      // });
      //   const msg = "How many paws are in my house?";
      const result = await model.generateContent(`without catogries`+age+'name');
      //   const result = await chat.sendMessage(msg);

      const response = await result.response;
      const text = response.text();
      setPromptData(text)
      console.log("text Result", text);
    }
  };
  useEffect(() => {}, [age]);

  let getTicker = async () => {
    const symbolInput =`without catogries and unordered `+ document.getElementById("symbol").value+' name'
console.log(symbolInput);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const url = await model.generateContent(symbolInput);

    const response = await url.response;
    let text = response.text();
    console.log('text',text);
    text = text.substring(1);
    const stringArray = text.split("\n*");

    // text = text.replaceAll("\n-", ",");
    // console.log(text);
    // let re = [];
    // re.push(text);
    console.log("text Result", stringArray);
    setResult(stringArray);
    if (text != " ") {
      
      console.log(result);
    } else {
      console.error("There was a problem with the fetch operation:");
    }
    // fetch(url)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //       console.log(data);
    //         // Display the response in the container
    //         const responseContainer = document.getElementById('response-container');
    //         responseContainer.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);
    //     });
  };
  // const apiKey = "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";
  // const prompt = "Once upon a time";
  // const maxTokens = 100;

  // function makeRequest() {
  //   axios
  //     .post(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         prompt: prompt,
  //         max_tokens: maxTokens,
  //         model: "gpt-3.5-turbo",
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${apiKey}`,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response.data.choices[0].text);
  //     })
  //     .catch((error) => {
  //       if (error.response && error.response.status === 429) {
  //         const retryAfter = error.response.headers["retry-after"];
  //         console.log(
  //           `Rate limit exceeded. Retrying after ${retryAfter} seconds...`
  //         );
  //         //  setTimeout(makeRequest, retryAfter * 1000); // Retry after the specified seconds
  //       } else {
  //         console.error(
  //           "Error:",
  //           error.response ? error.response.data : error.message
  //         );
  //       }
  //     });
  // }

  // makeRequest(); // Initial request

  // async function main() {
  //   try {
  //     const params = {
  //       messages: [{ role: "user", content: "Say this is a test" }],
  //       model: "gpt-3.5-turbo",
  //     };
  //     const chatCompletion = await openai.chat.completions.create(params);
  //     console.log("chatCompletion", chatCompletion);
  //   } catch (error) {
  //     if (error.response && error.response.status === 429) {
  //       const retryAfter = error.response.headers["retry-after"];
  //       console.log(
  //         `Rate limit exceeded. Retrying after ${retryAfter} seconds...`
  //       );
  //      // setTimeout(makeRequest, retryAfter * 1000); // Retry after the specified seconds
  //     } else {
  //       console.error(
  //         "Error:",
  //         error.response ? error.response.data : error.message
  //       );
  //     }
  //   }
  // }
  // main();

  // const generateResponse = async () => {
  //   try {
  //     let inputText = 'lorem vxv'
  //     const response = await fetch(
  //       'https://api.openai.com/v1/engines/davinci/completions',
  //       {
  //         prompt: inputText,
  //         max_tokens: 150,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer  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`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error fetching response:', error);
  //   }
  // };
  // generateResponse()
  // async function main() {
  //   // const completion = await openai.chat.completions.create({
  //   //   model: "gpt-3.5-turbo",
  //   //   prompt: "Write a tagline for an ice cream shop.",
  //   // });

  //   // const embedding = await openai.embeddings.create({
  //   //   model: "text-embedding-3-small",
  //   //   input: "Your text string goes here",
  //   //   encoding_format: "float",
  //   // });

  //   console.log(openai);
  // }
  // console.log("completion", completion);

  //main();

  return (
    <div className="App">
      <div className="m-5">
        <h1 style={{ textAlign: "center" }}>Homepage</h1>
        <p>age: {age} </p>
        <p> {promptData} </p>
        <button onClick={changeAge}>Prompt</button>
      </div>

      <h1>Gemini API </h1>
      <div id="response-container"></div>
      <div>
        <label for="symbol">Enter Symbol (e.g., btcusd): </label>
        <input type="text" id="symbol" placeholder="btcusd" />
        <button onClick={getTicker}>Get Ticker</button>

        {result.length > 0 &&
          result.map((item) => {
            return (
              <>
                <div className="m-2 d-flex justify-content-around">
                  <div class="card " style={{ width: "280px" }}>
                    <div class="card-body">
                      <h5 class="card-title">{item}</h5>

                      <a href="#" class="card-link">
                        Card link
                      </a>
                      <a href="#" class="card-link">
                        Another link
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default NameGenerator;
