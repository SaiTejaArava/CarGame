const board=document.querySelector(".main")
const boardLeft=board.offsetLeft
const boardRight=boardLeft+board.offsetWidth
const boardTop=board.offsetTop
const boardBottom=board.offsetHeight
const car=document.querySelector(".car")
let started=false
let moving=false

const starter=document.addEventListener("keypress",(e)=>{
    console.log(e)
    if(e.key=="Enter" && started===false){
        removeEventListener("keydown",starter)
        started=true
        game()
    }
})

function game(){
let speed=50
let reduceSpeed
let counter=0
let count=0
let divarr=[]
let maxSpeed=100
let cars=[]
let roadSpeed=8
let score=0
let mlr=false

setTimeout(()=>{roadSpeed=10;maxSpeed=110;document.getElementById("level").innerHTML="Medium"},16000)
setTimeout(() => {
    roadSpeed=12
    maxSpeed=120
    document.getElementById("level").innerHTML="Hard"
}, 32000);
let up,down,right,left
const moveUp=()=>{
    up=setInterval(() => {
        const carTop=parseFloat(window.getComputedStyle(car).getPropertyValue("top"))
        if(car.offsetTop-speed>=boardTop)
            car.style.top=carTop-speed+"px"
    }, 30);
}
const moveDown=()=>{
    down=setInterval(() => {
        const carTop=parseFloat(window.getComputedStyle(car).getPropertyValue("top"))
        const carBottom=car.offsetTop+car.offsetHeight
        if(carBottom+speed<=boardBottom)
            car.style.top=carTop+speed+"px"
    }, 30);
}
const moveLeft=()=>{
    car.style.transform="rotate(-30deg)"
    left=setInterval(() => {
        const carLeft=parseFloat(window.getComputedStyle(car).getPropertyValue("left"))
        if(carLeft-speed>=-13)
        car.style.left=carLeft-speed-1+"px"

    }, 30);
}
const moveRight=()=>{
    car.style.transform="rotate(30deg)"
    right=setInterval(() => {
        const carLeft=parseFloat(window.getComputedStyle(car).getPropertyValue("left"))
        const carRight=carLeft+60
        if(carRight+speed<=board.offsetWidth)
        car.style.left=carLeft+speed+1+"px"
    }, 30);
}
document.addEventListener("keydown",(e)=>{
    // console.log("Current Speed "+speed)
    clearInterval(reduceSpeed)
    if(speed<maxSpeed) setTimeout(()=>{speed+=4},10)
    if(e.key=="ArrowUp"  ){if(!moving)moveUp();moving=true}
    if(e.key=="ArrowDown" ){if(!moving)moveDown() ;moving=true}
    if(e.key=="ArrowLeft" ){
        
        if(!mlr) moveLeft() 
         mlr=true
        }
    if(e.key=="ArrowRight" ){if(!mlr)moveRight() ; mlr=true}
})
document.addEventListener("keyup",(e)=>{
    moving=false
    mlr=false
    if(e.key=="ArrowUp") clearInterval(up);clearTimeout(up)
    if(e.key=="ArrowDown") clearInterval(down);clearTimeout(down)
    if(e.key=="ArrowLeft") clearInterval(left);clearTimeout(left)
    if(e.key=="ArrowRight") clearInterval(right);clearTimeout(right)
    // clearInterval(up)
    // clearInterval(down)
    // clearInterval(left)
    // clearInterval(right)
    
    car.style.transform="rotate(0deg)"
    reduceSpeed=setInterval(() => {
        if(speed>50) speed-=4
    }, 5)
})

const startFlag=document.getElementById("bor")

const random=(n)=>{
    return Math.floor(Math.random()*n)
}
const trafficInterval=setInterval(()=>{
    if(count>=0){
        const traffic=document.createElement("div")
        traffic.setAttribute("class","traffic")
        traffic.setAttribute("id","traffic"+count)
        const rwidth=Math.floor(Math.random()*300)+150
        const pos=Math.floor(Math.random()*300)-50
        traffic.style.width=rwidth+"px"
        traffic.style.left=pos+"px"
        traffic.style.backgroundColor=`rgb(${random(255)},${random(255)},${random(255)})`
        const flagTop=parseInt(window.getComputedStyle(startFlag).getPropertyValue("top"))
        if(count==0 && flagTop>300 ){
            board.appendChild(traffic)
            cars.push(count++)
        }
        else if(count>0){
            const lcar=document.getElementById("traffic"+(count-1))
            const lcarTop=parseInt(window.getComputedStyle(lcar).getPropertyValue("top"))
            
            if(lcarTop>=250){
                board.appendChild(traffic)
                cars.push(count++)
            }
        }
        for(let i=0;i<cars.length;i++){
            const itraffic=document.getElementById("traffic"+cars[i])
            const itrafficTop=parseFloat(window.getComputedStyle(itraffic).getPropertyValue("top"))
            if(itrafficTop>boardBottom){
                score++
                cars.shift()
                itraffic.remove()
            }
            itraffic.style.top=itrafficTop+roadSpeed+"px"
        }
    }
    const flag=document.getElementById("bor")
    if(flag){
        const flagTop=parseFloat(window.getComputedStyle(flag).getPropertyValue("top"))
        if(flagTop>boardBottom) flag.remove()
        else flag.style.top=flagTop+roadSpeed+"px"
    }

    document.getElementById("score").innerHTML=`${score}`
},20)
const interval=setInterval(()=>{
    
    const carTop=parseFloat(window.getComputedStyle(car).getPropertyValue("top"))
    const carBottom=parseInt(window.getComputedStyle(car).getPropertyValue("bottom"))
    if(carBottom>=30 && !moving) car.style.top=(carTop+roadSpeed*4)+"px"
    
    if(counter>=0){
        const divider=document.createElement("div")
        divider.setAttribute("class","divider")
        divider.setAttribute("id","divider"+counter)
        if(counter==0){
            board.appendChild(divider)
            divarr.push(counter++)
            
        }
        else {
            
            const ldiv=document.getElementById("divider"+(counter-1))
            const ldivtop=parseInt(window.getComputedStyle(ldiv).getPropertyValue("top"))
            if(ldivtop>=50){
                board.appendChild(divider)
                divarr.push(counter++)
            }
        }
        
        
        
        
        for(let i=0;i<divarr.length;i++){
            
            const idivider=document.getElementById("divider"+divarr[i])
            const idividerTop=parseFloat(window.getComputedStyle(idivider).getPropertyValue("top"))
            if(idividerTop>boardBottom){
                divarr.shift()
                idivider.remove()
            }
            
            idivider.style.top=idividerTop+roadSpeed+"px"
        }
        
    }
    
    
},20)
const Game=setInterval(() => {
    for(let i=0;i<cars.length;i++){
        const icar=document.getElementById("traffic"+cars[i])
        const icarTop=parseInt(window.getComputedStyle(icar).getPropertyValue("top"))
        const icarLeft=parseInt(window.getComputedStyle(icar).getPropertyValue("left"))
        const carTop=parseInt(window.getComputedStyle(car).getPropertyValue("top"))
        const carLeft=parseInt(window.getComputedStyle(car).getPropertyValue("left"))
        if(((carLeft-4>icarLeft && carLeft-4<icarLeft+icar.offsetWidth)||(carLeft+60+4>icarLeft && carLeft+4<icarLeft)) && ((carTop+10>icarTop && carTop+10<icarTop+100)||(carTop-4<icarTop && carTop+100-4>icarTop))) {
            clearInterval(interval)
            clearInterval(trafficInterval)
            
            const eles=document.querySelectorAll(".traffic")
            eles.forEach(ele=>ele.remove())
            const divs=document.querySelectorAll(".divider")
            divs.forEach(div=>div.remove())
            started=false
            if(confirm("Game Over Click 'OK' to start again ")){
                clearInterval(Game)
                window.location.reload()
            }
            else window.location.reload()
        }
    }
}, 1);
}
function start(){
    if(started==false){
        started=true
        game()
    }
}

