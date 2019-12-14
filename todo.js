
const toDoform=document.querySelector(".js-toDoForm"),
toDoInput=toDoform.querySelector("input"),
toDoList=document.querySelector(".js-toDoList");
const finishedToDo=document.querySelector(".js-finished");

const TODOS_LS="toDos";
const FINISHED="FINISHED";
let toDos=[];
let toDosFinished=[];
let totalLen=0;

function deleteToDo(event){
    const btn=event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id!==parseInt(li.id);
    });
    toDos=cleanToDos;
    saveToDos();

}

function deleteFinishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedToDo.removeChild(li);
  const cleanFinished = toDosFinished.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDosFinished = cleanFinished;
  saveToDos();
}

function moveToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  let tmpText = li.innerText;
  tmpText = tmpText.replace("❌", "");
  tmpText = tmpText.replace("✅", "");

  toDoList.removeChild(li);
  const cleanPending = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos= cleanPending;
  paintFinishedToDo(tmpText);
  saveToDos();
}

function backToDos(event) {
  const btn = event.target;
  const li = btn.parentNode;
  let tmpText = li.innerText;
  tmpText = tmpText.replace("⏪", "");
  tmpText = tmpText.replace("❌", "");

  finishedToDo.removeChild(li);
  const cleanFinished = toDosFinished.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDosFinished = cleanFinished;
  paintToDo(tmpText);
  saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
    localStorage.setItem(FINISHED, JSON.stringify(toDosFinished));

}

function paintToDo(text){
    const li=document.createElement("li");
    const delBtn=document.createElement("button");
    const moveBtn = document.createElement("button");
    moveBtn.innerText = "✅";
    delBtn.innerText="❌";
    delBtn.addEventListener("click",deleteToDo);
    moveBtn.addEventListener("click", moveToDo);
    const span=document.createElement("span");
  
    span.innerText=`${text}`;
    totalLen = totalLen + 1;
    const newId = totalLen;
    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(moveBtn);
    
    li.id=newId;
    toDoList.appendChild(li);

    const toDoObj={
        text:text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();

}

function paintFinishedToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  backBtn.innerText = "⏪";
  delBtn.innerText = "❌";
  backBtn.addEventListener("click", backToDos);
  delBtn.addEventListener("click", deleteFinishedToDo);
  const span = document.createElement("span");
  totalLen += 1;
  const newId = totalLen;
  span.innerText = text;

  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(backBtn);
  li.id = newId;
  finishedToDo.appendChild(li);

  const toDoObj = {
    id: newId,
    text: text
  };
  toDosFinished.push(toDoObj);
  saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue=toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";

}

function loadToDos(){
    const loadedtoDos=localStorage.getItem(TODOS_LS);
    const loadedFinished = localStorage.getItem(FINISHED);
    if(loadedtoDos!==null){
        const parsedToDos=JSON.parse(loadedtoDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
     if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function(x) {
      paintFinishedToDo(x.text);
    });
  }
}


function init(){
    loadToDos();
    toDoform.addEventListener("submit",handleSubmit);

}

init();