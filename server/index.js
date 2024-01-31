const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv')
const { GoogleGenerativeAI } = require("@google/generative-ai");



const app = express();
const PORT = 3001;
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GULGUL_API);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});
const imagemodel = genAI.getGenerativeModel({ model: "gemini-pro-vision" })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

example = {
  "questions" : [
    {
      "question" : "",
      "model_ans" : "",
      "candidate_ans" : "",
      "score" : "",
      "feedback" : ""
    }
  ],
  "overall_feedback" : "",
  "overall_score" : "",
}


mongoose.connect(process.env.MONGO_URI, {
}, ) 
.then(() => console.log("Connected to database"))
.catch((err) => {console.log(err)})

const registerschema = new mongoose.Schema({
  email : {
      type : String
  } , 
  registered : {
      type : Boolean
  }
})

module.exports = Register = mongoose.model('Register', registerschema)


const basicInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});

// Create a model using the schema
const BasicInfo = mongoose.model('BasicInfo', basicInfoSchema);

// Export the model
module.exports = BasicInfo;


const workSchema = new mongoose.Schema({
  certificationLink: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  points: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Certification = mongoose.model('Certification', workSchema);

module.exports = Certification;

const projectSchema = new mongoose.Schema({
  github: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  points: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

const educationSchema = new mongoose.Schema({
  college: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;


const achievementsSchema = new mongoose.Schema({
  points: {
    type: [String],
    required: true,
  },
});

const Achievements = mongoose.model('Achievements', achievementsSchema);

module.exports = Achievements;

const uploadDirectory = 'uploads';

const summarySchema = new mongoose.Schema({
  summary : {
    type : String,
    required : true,
  }
})

const Summary = mongoose.model('Summary', summarySchema);

module.exports = Summary

const otherSchema = new mongoose.Schema({
  other : {
    type : String, 
    required : true,
  }
})

const Other = mongoose.model('Other', otherSchema);
module.exports = Other

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, uploadDirectory));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


app.post('/add/basicInfo', async (req, res) => {
  try {
    const { name, title, linkedin, github, email, phone } = req.body.params;

    const newBasicInfo = new BasicInfo({
      name,
      title,
      linkedin,
      github,
      email,
      phone,
    });

    const savedBasicInfo = await newBasicInfo.save();

    res.json({ success: true, data: savedBasicInfo });
  } catch (error) {
    console.error(error);
    res.stat
  }
})


app.post('/add/workInfo', async (req, res) => {
  try{
    console.log(req.body.params)
    const {certificationLink, title, startDate, endDate, companyName, location, points} = req.body.params;
    const newWorkInfo = new Certification({
      certificationLink,
      title,
      startDate,
      endDate,
      companyName,
      location,
      points
    });

    const savedWorkInfo = await newWorkInfo.save()
    res.json({success : true, data: savedWorkInfo})
  }
  catch(e){
    console.log(e);
  }
})


app.post('/add/projectInfo', async (req, res) => {
  try{
    console.log(req.body.params);
    const {link, title, overview, github, points} = req.body.params;
    const newProjectInfo = new Project({
      link,
      title,
      overview,
      github,
      points
    });
    const savedProjectInfo = await newProjectInfo.save()
    res.json({success : true, data : savedProjectInfo})
  }
  catch(e){
    console.log(e);
  }
})

app.post('/add/eduInfo', async (req, res) => {
  try{
    console.log(req.body.params);
    const {title, college, startDate, endDate } = req.body.params; 
    const newEduInfo = new Education({
      title,
      college,
      startDate,
      endDate
    });
    const savedEduInfo = await newEduInfo.save();
    res.json({success : true, data : savedEduInfo})
  }
  catch(e){
    console.log(e);
  }
})


app.post('/add/achInfo', async (req, res) => {
  try{
    console.log(req.body.params);
    const {points} = req.body.params;
    const newAchInfo = new Achievements({
      points
    });
    const savedAchInfo = await newAchInfo.save();
    res.json({success : true, data : savedAchInfo})
  }
  catch(e){
    console.log(e);
  }

})

app.post('/add/sumInfo', async (req, res) => {
  try{
    console.log(req.body.params);
    const {sum} = req.body.params;
    const newSumInfo = new Summary({
      sum
    })
    const savedSumInfo = await newSumInfo.save();
    res.json({success : true, data : savedSumInfo})
  }
  catch(e){
    console.log(e);
  }
})


app.post('/add/otherInfo', async (req, res) => {
  try{
    console.log(req.body.params)
    const {other} = req.body.params;
    const newOtherInfo = new Other({
      other
    })
    const savedOtherInfo = await newOtherInfo.save();
    res.json({success : true, data : savedSumInfo})
  }
  catch(e){
    console.log(e);
  }
})


app.post('/check', (req, res) => {
  const email = req.body.params.email;
  Register.findOne({email : email})
  .then((data) => {
    if(!data){
      console.log("Does not Exist");
    }
    else{
      console.log('Exist');
    }
  })
})


app.post('/test', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileName = req.file.originalname;

    console.log("File uploaded:", fileName);

    // Send back the file name in the response
    res.status(200).json({ fileName });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/resumescore", upload.single("image"), async (req, res) => {
  console.log("Calculating Your Score!");
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    const imageName = req.file.originalname;
    const imagePath = path.join(__dirname, uploadDirectory, imageName);
    console.log(imagePath);
    var prompt = "Extract information from the resume";
    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
        mimeType: "image/png",
      },
    };
    const result = await imagemodel.generateContent([prompt, image]);
    var resumeInfo = result.response.text();

    var prompt = `Evaluate the resume ${resumeInfo} Find the flaws in it and write its fix ignore Iconsistend Font and Formatting after finding score give the result in format of JSON strictly follow this ${example} Do not change even the variable names. Give an overall score out oof 100 to the resume. Ignore the Inconsistency in font and formatting`

    const feedback = await model.generateContent([prompt]);
    var finalfeedback = feedback.response.text();
    console.log(finalfeedback);
    res.status(200).json({ feedback: finalfeedback });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/extract", async (req, res) => {
  try {
    console.log("Started");
    const imageName = req.body.imageName;
    const imagePath = path.join(__dirname, uploadDirectory, imageName);
    console.log(imagePath);
    var prompt = "Extract information from the resume.";
    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
        mimeType: "image/png",
      },
    };

    const result = await imagemodel.generateContent([prompt, image]);
    var resumeInfo = result.response.text();
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: `You act as an interviewer at company **XYZ** based on the resume of client ${resumeInfo} ask 5 question from it.`,
        },
        {
          role: "model",
          parts: "Nice to meet you candidate.",
        },
      ],
    });

    const maxRetries = 3; // Set your maximum retry count
    var question = [];

    for (let retryCount = 0; retryCount < maxRetries; retryCount++) {
      try {
        const msg = `return the question in an const interviewQuestions array`;
        var result1 = await chat.sendMessage(msg);
        var x = await result1.response;
        var text = x.text();
        const regex = /const interviewQuestions = (\[.*?\]);/s;
        const match = text.match(regex);

        if (match && match[1]) {
          const extractedArray = eval(match[1]);
          question = extractedArray;
          break; // Break out of the loop if extraction is successful
        } else {
          console.log("Array extraction failed. Retrying...");
        }
      } catch (error) {
        console.error("Error during extraction:", error);
      }
    }

    res.status(200).json({ questions: question });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/evaluate", async (req, res) => {
  let questions = req.body.questions;
  let answer = req.body.userAnswers;
  let resume = req.body.imageName;
  console.log(questions, answer, resume);
  console.log("EVALUATING!");
  try {
    const imageName = req.body.imageName;
    const imagePath = path.join(__dirname, uploadDirectory, imageName);
    console.log(imagePath);
    var prompt = "Extract information from the resume.";
    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
        mimeType: "image/png",
      },
    };

    const result = await imagemodel.generateContent([prompt, image]);
    var resumeInfo = result.response.text();
    //console.log(resumeInfo)
    var prompt = `based on ${resumeInfo} and ${questions} Generate Model Answers of 2-3 lines. The number of answers should match the number of question. Return the answers in const array modelanswer`;
    const modelAns = await model.generateContent([prompt]);
    var modelans = modelAns.response.text();

    var stringans = answer.toString();
    var prompt = `The questions are ${questions.toString()} the Model answer to it are ${modelans}, the answer given by the candidate is ${stringans}. Compare the model answer with the candidate answer and provide feedback for each question assign it a score out of 5. In the end give feedback as hire not hire.Generate the feedback in JSON format Strictly follow this ${example} where it can be parsed easily and write strictly in English the flaw is present then its fix or what should be there and in the end a score.Return the JSON in such a way that JSON.parse() Works on it without an issue.`
    var feedback = await model.generateContent([prompt]);
    var finalfeedback = feedback.response.text();
    console.log(finalfeedback);
    //console.log(modelans);
    res.status(200).json({ feedback: finalfeedback });
  } catch (e) {
    console.log(e);
  }
});


app.post('/tech', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const fileName = req.file.originalname;

    console.log("File uploaded:", fileName);

    // Send back the file name in the response
    res.status(200).json({ fileName });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/extract/tech', async (req, res) => {
  try{
    console.log("TECH Q STARTED");
    const imageName = req.body.imageName;
    const imagePath = path.join(__dirname, uploadDirectory, imageName);
    console.log(imagePath);
    var prompt = "Extract information from the resume.";
    const image = {
      inlineData: {
        data: Buffer.from(fs.readFileSync(imagePath)).toString("base64"),
        mimeType: "image/png",
      },
    };

    const result = await imagemodel.generateContent([prompt, image]);
    var resumeInfo = result.response.text();
    
    var prompt = `Based on resume ${resumeInfo} find out the Programming Skills, Tech Stacks and Generate 5 questions on the programming language and the tech stack Eg. Python, JavaScript, React, Java. Only Return the question in const techquestion array.`
    const techq = await model.generateContent([prompt]);
    const text = techq.response.text()
    const regex = /const techQuestions = (\[.*?\]);/s;
    const match = text.match(regex);
    var question = []
    if (match && match[1]) {
      const extractedArray = eval(match[1]);
      question = extractedArray;
    } else {
      console.log("Array extraction failed.");
    }
    res.status(200).json({ questions: question });
  }
  catch(e){
    console.log(e);
  }
})


app.post('/fix', async (req, res) => {
  console.log('fixing')
  let error_feedback = req.body.param.feedback;
  var prompt = `Fix the ${error_feedback} such that JSON.parse() works on it`
  const result = await model.generateContent([prompt])
  //console.log(result.response.text())
  const filteredFeedback = result.response.text()
        .split("\n")
        .filter((line) => !line.startsWith("```") && !line.endsWith("```"))
        .join("\n");
  console.log(JSON.parse(filteredFeedback))
  return res.status(200).json({questions : filteredFeedback})
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});