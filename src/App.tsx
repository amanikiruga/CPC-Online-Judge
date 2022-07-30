import React, { ChangeEventHandler, useState } from "react";
import { processAnswer } from "./ProcessAnswer";

import logo from "./logo.svg";
import "./App.css";

function App() {
    //create large text box to input text tailwind
    const [input, setInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const onAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInput("");
        // console.log(processAnswer(input, "Hello World"));
        setIsCorrect(processAnswer(input, "Hello World"));
    };
    const onInputChange = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setInput(e.target.value);
    };

    return (
        <div className="App">
            <h1 className="text-3xl font-bold">CPC OJ</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, nisi eu consectetur consectetur, nisl nisl
                consectetur nisl, eu consectetur nisl nisl euismod nisl.
            </p>
            <form onSubmit={onAnswerSubmit}>
                <label>
                    Your Answer
                    <textarea
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        name="Text1"
                        cols={40}
                        rows={5}
                        value={input}
                        onChange={onInputChange}
                    ></textarea>
                    <input
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        value="Submit"
                    />
                </label>
            </form>
            <div className="flex justify-center">
                <div className="bg-gray-200 text-gray-700 p-4 rounded">
                    <p>{isCorrect ? "Correct" : "Incorrect"}</p>
                </div>
            </div>
        </div>
    );
}

export default App;
