const prompt = require('prompt-sync')()

async function aiConvo(bodyData){
    const options = {
        method : "POST",
      headers: {
        Authorization: "Bearer" ,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(bodyData)
    };

 
    let response = await fetch("https://api.openai.com/v1/chat/completions", options)
    let data = await response.json()
    console.log(data.choices[0].message.content)
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
        "content":" "
    },
  ]
}
let userInput = "";
let running = true;
console.log("I am your Chat GPT generated assistant")
while(running){
    console.log("What is the question you would like to ask?");
    userInput = prompt("");
    if(userInput.includes("no")){
        break
    }
    aiConvoBody.messages[1].content = userInput
    aiConvo(aiConvoBody)
    
}