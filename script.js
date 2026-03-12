const API_URL =
"https://fa9b8dd8-f924-46d6-96e2-a27aad93b772-00-38usgs9k6fk96.kirk.replit.dev/check-task";

async function checkTask(taskId, textareaId, resultId) {

  const code = document.getElementById(textareaId).value;
  const result = document.getElementById(resultId);

  result.textContent = "Checking...";

  const response = await fetch(API_URL,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      taskId:taskId,
      code:code
    })
  });

  const data = await response.json();

  if(!data.ok){
    result.textContent="Server error";
    return;
  }

  if(data.correct){

    result.textContent="✅ Correct";
    result.style.color="limegreen";

  }else{

    result.textContent=
    "❌ Wrong\n\nExpected:\n"+
    data.expected+
    "\n\nYour output:\n"+
    data.output;

    result.style.color="red";

  }

}