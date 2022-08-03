import React, { useEffect, useState } from "react";
import { processAnswer } from "./ProcessAnswer";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import firestoreApp from "./firebase";
import { collection, addDoc } from "firebase/firestore";

import cpcLogo from "./cpcLogo.png";
import "./App.css";
type ProblemAndAnswer = {
    statement: string;
    answer: string;
};

function App() {
    //firestore
    const db = getFirestore(firestoreApp);
    //create large text box to input text tailwind
    const [input, setInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [problemsAndAnswer, setProblemsAndAnswer] =
        useState<ProblemAndAnswer>();

    //useeffect to get data from firestore
    useEffect(() => {
        const fetchProblems = async () => {
            const docRef = doc(db, "problems", "100");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setProblemsAndAnswer(docSnap.data() as ProblemAndAnswer);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        };
        fetchProblems();
    }, [db]);

    const onAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setInput("");
        // console.log(processAnswer(input, "Hello World"));
        if (problemsAndAnswer?.answer) {
            setIsCorrect(processAnswer(input, problemsAndAnswer.answer));
        }
    };
    const onInputChange = (e: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setInput(e.target.value);
    };

    return (
        <div className="App">
            <img className="cpcLogo" src={cpcLogo} alt="CPC Logo"/>
            <h1 className="text-3xl font-bold">CPC OJ</h1>
            <p>{problemsAndAnswer?.statement}</p>
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
