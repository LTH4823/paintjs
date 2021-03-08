// 각 html 요소 변수 선언
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

// 공용 변수 선언
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//Pixel Modifier -> 그림 판 영역 자체를 위한 픽셀 영역 선언 (css의 size 선언과는 다름)
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//JavaScript 자체의 canvas함수 변형 사용 
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth=2.5;
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);

//수동적 변화 변수 선언
let painting = false;
let filling = false;
let fillStyle = INITIAL_COLOR;

//마우스 위치 값 선언 및 cavas 선 그리기 함수 사용
function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}    


function startPainting(event){
    painting = true;
}


function stopPainting(event){
    painting = false;
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText="fill";
    }else{
        filling = true;
        mode.innerText = "paint";
    }
}

function handleCanvasClick(){
    if(filling){ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);}    
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
const image = canvas.toDataURL();
const link = document.createElement("a");
link.href = image;
link.download = "PaintJS[🎨]";
link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM)
}
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
if(range){
    range.addEventListener("input",handleRangeChange)
}
if(mode){
    mode.addEventListener("click",handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}