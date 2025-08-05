let scores=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    loss:0,
    tie:0,};
document.querySelector(".scores").innerHTML=`wins-${scores.wins}, loss-${scores.loss}, tie-${scores.tie}`
function computerpick(){
const computermove=Math.random();
let pick;
if(computermove<1/3){
pick='rock'
}else if(computermove>1/3 && computermove<2/3){
    pick='paper'
}else if(computermove>2/3 && computermove<1){
    pick='scissors'
}
return pick
}
let autoplaying=false;
let intervalID;
const autobutton=document.querySelector(".autoplay-btn")
function autoplay(){
    if(!autoplaying){
        intervalID=setInterval( ()=>{
            play(computerpick()) 
            }, 1000)
        autoplaying=true;
        autobutton.innerHTML="Stop auto play"
        autobutton.style.background='red';
        autobutton.style.color='white';
    }else{
        stopautoplay()
    };
}
function stopautoplay(){
    clearInterval(intervalID);
        autoplaying=false;
        autobutton.innerHTML="Auto play"
        autobutton.style.background='white';
        autobutton.style.color='black';
}
/*////////////////////////////////////////////////////*/
document.querySelector(".js-rock").addEventListener('click',()=>play("rock"))
document.querySelector(".js-paper").addEventListener('click',()=>play("paper"))
document.querySelector(".js-scissors").addEventListener('click',()=>play("scissors"))
document.querySelector(".reset").addEventListener('click',()=>reset())
document.querySelector(".autoplay-btn").addEventListener('click',()=>autoplay())
document.body.addEventListener('keydown',(event)=>{
    if(event.key==="r"){
        play('rock')
    }else if(event.key==="p"){
        play('paper')
    }else if(event.key==="s"){
        play('scissors')
    }else if(event.key==="a"){
        autoplay()
    }else if (event.code==='Space'){
        reset()
    }
})

/*////////////////////////////////////////////////////*/


function play(playermove){
    let cmove=computerpick()
    let result;
    if(playermove===cmove){
        result="Tie 🪢"
        document.querySelector(".result").style.color="white"
    }else if (playermove==='rock' && cmove==='paper'){
        result="You Loss 💨";
        document.querySelector(".result").style.color="red"
    }else if (playermove==='rock' && cmove==='scissors'){
        result="You Win 🏆";
        document.querySelector(".result").style.color="green"
    }else if (playermove==='paper' && cmove==='rock'){
        result="You Win 🏆";
        document.querySelector(".result").style.color="green"
    }else if (playermove==='paper' && cmove==='scissors'){
        result="You Loss 💨";
        document.querySelector(".result").style.color="red"
    }else if (playermove==='scissors' && cmove==='paper'){
        result="You Win 🏆";
        document.querySelector(".result").style.color="green"
    }else if (playermove==='scissors' && cmove==='rock'){
        result="You Loss 💨";
        document.querySelector(".result").style.color="red"
    }
    updatescore(result)

document.querySelector(".result").innerHTML=` ${result}`
document.querySelector(".status").innerHTML=`You 🤵 <img class="picks" src="${playermove}-emoji.png" alt="${playermove}">-<img class="picks" src="${cmove}-emoji.png" alt="${cmove}">Computer 🤖`
document.querySelector(".scores").innerHTML=`wins-${scores.wins}, loss-${scores.loss}, tie-${scores.tie}`
}
function updatescore(result){
    if (result==="You Win 🏆"){
        scores.wins += 1;
    } else if (result==="You Loss 💨"){
        scores.loss += 1;
    } else if (result==="Tie 🪢"){
        scores.tie += 1;
    }
    localStorage.setItem('score',JSON.stringify(scores))
}
function reset(){
    document.querySelector(".alert").innerHTML=`<p class="alert-active">Are you sure. you want to reset the score? <button class="terminate" onclick="terminate()">Yes</button><button class="notTerminate" onclick="notTerminate()" >NO</button></p>`
}
function terminate(){
    document.querySelector(".alert").innerHTML=""
    scores.wins=0;
    scores.loss=0;
    scores.tie=0;
    localStorage.removeItem('score')
    document.querySelector(".result").innerHTML=`▶️Play`
    document.querySelector(".result").style.color="white"
    document.querySelector(".status").innerHTML=``
    document.querySelector(".scores").innerHTML=`wins-${scores.wins}  loss-${scores.loss} tie-${scores.tie}`;
    stopautoplay()
}
function notTerminate(){
    document.querySelector(".alert").innerHTML=""
}


