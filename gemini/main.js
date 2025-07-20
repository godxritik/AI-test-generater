import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import cors from "cors";
const app = express();
const PORT = 6969;

// const API_KEY = "AIzaSyB4yYqZgwE3vtcK0h8E6tUUK-qtV3iGmXk";
const genAI = new GoogleGenerativeAI("AIzaSyB4yYqZgwE3vtcK0h8E6tUUK-qtV3iGmXk");
app.use(express.json());
app.use(cors())

app.post("/test", async (req, res) => {
    const { prompt } = req.body;
    const prePrompt = "act yourself as a test generator application that generate questions from given topic or paragraph or any other prompt . Now generate the test of  mcqs including answer key at the end for -- "
    const data = await gen(prePrompt+prompt);
    if (!data) return res.status(500).json({ message: "server error" })
    return res.status(200).json({ data: data })

})

async function gen(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const downstreamData = await model.generateContent(prompt);
        const encrResult = downstreamData.response;
        return encrResult.text();
    }
    catch (err) {
        console.log("error occured")
        return null;
    }

}


app.listen(PORT, () => {
    console.log(`connected to server on port ${PORT}`)
})