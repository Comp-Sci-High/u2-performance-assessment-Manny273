const prompt = require('prompt-sync')()

async function aiConvo(bodyData){
    const options = {
        method : "POST",
      headers: {
        Authorization: "Bearer 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" ,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(bodyData)
    };

 
    let response = await fetch("https://api.openai.com/v1/chat/completions", options)
    let data = await response.json()
    return data;
}
let aiConvoBody = {
    model: "gpt-4o-mini",
  messages: [
    {
      "role": "system",
      "content":"You are a helpful assistant."
    },
    {
      "role": "user",
      content:" "
    },
  ]
}

async function aiImage(imageBody){
  const options = {
    method : "POST",
    headers: {
    Authorization: "Bearer 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" ,
    "Content-Type" : "application/json"
  },
  body: JSON.stringify(imageBody)
};

  let response = await fetch("https://api.openai.com/v1/images/generations", options)
  let data = await response.json()
  return data;
}
let aiImageBody = {
  "model": "dall-e-3",
  prompt: " ",
  "n": 1,
  "size": "1024x1024"
}
async function getDog() {
  let response = await fetch("https://dog.ceo/api/breeds/image/random");
  let data = await response.json();
  return data;
}



async function main(){
  let userInput = " ";
  let running = true;
  console.log("I am your Chat GPT generated assistant")
  console.log("What is the question you would like to ask?");
  aiConvoBody.messages[1].content = userInput
  while (running) {

    let userInput = prompt("");

    if (userInput.toLowerCase().includes("stop")||userInput.toLowerCase().includes("no")) {
      console.log("Would you like to see your whole conversation with the AI chat bot?")
      userInput = prompt("");
      if(userInput.toLowerCase().includes("yes")||userInput.toLowerCase().includes("please")||userInput.toLowerCase().includes("indeed")){
        console.log(aiConvoBody.messages)
        running = false
      }
      running = false
    }else if(userInput.toLowerCase().includes("image")||userInput.toLowerCase().includes("picture")){
      console.log("what is the picture you would like to generate?")
      userInput = prompt("");
      aiImageBody.prompt = userInput;
      let imageR = await aiImage(aiImageBody);
      console.log(imageR.data[0].url)
      if(userInput.toLowerCase().includes("dog")||userInput.toLowerCase().includes("puppy")){
        console.log("Would you like to compare your image of a dog to a real image")
        userInput = prompt("")
        if(userInput.toLowerCase().includes("yes")||userInput.toLowerCase().includes("ofcourse")||userInput.toLowerCase().includes("indeed")){
          // Retrieve the random dog image
          let dogImage = await getDog();
          console.log(dogImage.message);
        }
      }
      console.log("Is there another question you would like to ask?")
    }

    aiConvoBody.messages.push({ role: "user", content: userInput });

    let response = await aiConvo(aiConvoBody);

    const assistantReply = response.choices[0].message.content;
    console.log(assistantReply);
    aiConvoBody.messages.push({ role: "assistant", content: assistantReply });    

    console.log("Based on the response of the assistant would you like to ask another question, get data, or stop your interaction with the bot?")
    userInput = prompt("")
    if (userInput.toLowerCase().includes("stop")||userInput.toLowerCase().includes("no")) {
      console.log("Would you like to see your whole conversation with the AI chat bot?")
      userInput = prompt("");
      if(userInput.toLowerCase().includes("yes")||userInput.toLowerCase().includes("please")||userInput.toLowerCase().includes("indeed")){
        console.log(aiConvoBody.messages)
        running = false
      }
      running = false
    }else if(userInput.toLowerCase().includes("image")||userInput.toLowerCase().includes("picture")){
      console.log("what is the picture you would like to generate?")
      userInput = prompt("");
      aiImageBody.prompt = userInput;
      let imageR = await aiImage(aiImageBody);
      console.log(imageR.data[0].url)
      if(userInput.toLowerCase().includes("dog")||userInput.toLowerCase().includes("puppy")){
        console.log("Would you like to compare your image of a dog to a real image")
        userInput = prompt("")
        if(userInput.toLowerCase().includes("yes")||userInput.toLowerCase().includes("ofcourse")||userInput.toLowerCase().includes("indeed")){
          // Retrieve the random dog image
          let dogImage = await getDog();
          console.log(dogImage.message);
        }
      }
      console.log("Is there another question you would like to ask?")
    }
  }   
}

main()

