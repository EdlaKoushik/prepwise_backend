// import { google } from "@ai-sdk/google";
// import express from "express";

//  const router = express.Router();

// router.get("/",(req,res)=>{
//     res.status(200).json({"message":"generate is working .."});
// })

// router.post("/", async (req)=>{
//      const {type,role,level,techstack,amount,userid}=req.body();

//      try{
//       const {text:questions}= await generateText({
//         model:google("gemini-2.0-flash-001"),
//         prompt: `Prepare questions for a job interview.
//         The job role is ${role}.
//         The job experience level is ${level}.
//         The tech stack used in the job is: ${techstack}.
//         The focus between behavioural and technical questions should lean towards: ${type}.
//         The amount of questions required is: ${amount}.
//         Please return only the questions, without any additional text.
//         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
//         Return the questions formatted like this:
//         ["Question 1", "Question 2", "Question 3"]
        
//         Thank you! <3
//     `,
//       });

//       const interview={
//          role,type,level,
//          techstack:techstack.split(','),
//          questions:JSON.parse(questions),
//          userId:userid,
//          finalized:true,
//          coverImage:getRandomInterviewCover(),
//          createdAt:new Date().toISOString()
//       }
//        await db.collection("interviews").add(interview);
//         return res.json({success:true}, {status:200});
//      }catch(error){
//         console.error(error);
//         return res.json({success:false,error},{status:500});
//      }
// })




// export default router;



import { google } from "@ai-sdk/google";
import { generateText } from "ai";

import express from "express";
import dotenv from "dotenv";
import Interview from "../models/Interview.js";

dotenv.config();

const router = express.Router();
dotenv.config();

router.get("/", (req, res) => {
    res.status(200).json({ message: "generate is working .." });
});

router.post("/", async (req, res) => {


    const { type, role, level, techstack, amount, userid } = req.body;

    try {
        const { text: questions } = await generateText({
            model: google("gemini-2.0-flash-001"),
            apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
            prompt: `Prepare questions for a job interview.
                The job role is ${role}.
                The job experience level is ${level}.
                The tech stack used in the job is: ${techstack}.
                The focus between behavioural and technical questions should lean towards: ${type}.
                The amount of questions required is: ${amount}.
                Please return only the questions, without any additional text.
                The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
                Return the questions formatted like this: ["Question 1", "Question 2", "Question 3"]
                Thank you! <3
            `,
        });

        const interview = new Interview({
            role,
            type,
            level,
            techstack: techstack.split(","),
            questions: JSON.parse(questions),
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        });

        await interview.save();
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error });
    }
});

// Utility function to get a random cover image name
function getRandomInterviewCover() {
  const covers = [
    'adobe.png',
    'amazon.png',
    'facebook.png',
    'hostinger.png',
    'pinterest.png',
    'quora.png',
    'reddit.png',
    'skype.png',
    'spotify.png',
    'telegram.png',
    'tiktok.png',
    'yahoo.png',
  ];
  const idx = Math.floor(Math.random() * covers.length);
  return covers[idx];
}

export default router;