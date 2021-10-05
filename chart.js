const chart=document.getElementById('chart');

let canvas=document.createElement('canvas');

canvas.width='80';
canvas.height='80';

chart.appendChild(canvas);

const ctx=canvas.getContext("2d");
// console.log(ctx);

ctx.lineWidth=20;


function drawCircle(color,ratio,cloclwise){
    ctx.strokeStyle=color;
    ctx.beginPath();
    ctx.arc(canvas.width/2,canvas.height/2,30,0,ratio*2*Math.PI,cloclwise);
    ctx.stroke();
}

function updateChart(income,outcome){
    let ratio=income/(income+outcome);
    //console.log(ratio);
    drawCircle("#228B22", -ratio,true)
    drawCircle("#FF0000", 1-ratio,false)

}

// function test(){
//     const chart=document.getElementById('chart');

//     let p=document.createElement('p');
//     p.innerHTML=`<h1>heshan </h1>`;
    
//     chart.appendChild(p);
// }
