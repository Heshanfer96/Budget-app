class UI{
    constructor(){
        this.list=[];
        this.incomeValue=0;
        this.expanceValue=0;
        this.balanceValue=0;
        this.outcome=document.querySelector('#outcome-display');
        this.income=document.querySelector('#income-display');
        this.balance=document.querySelector('#balance');
    }


    deletIteams(target){
        target.parentElement.parentElement.remove();

        this.list.forEach((element,index)=>{
            if(index==target.parentElement.parentElement.id){
                // // if(index==0){
                //     this.list=[]
                // }
                // else{
                    this.list.splice(index,1);
               // }
            }
        })
    }

    editIteams(target){
        this.list.forEach((element,index) =>{
            if(index==target.parentElement.parentElement.id){

                if(element.type==='income'){
                    document.getElementById('incomeTitle').value=element.title;
                    document.getElementById('incomeAmount').value=element.amount;
                }
                else if(element.type==='expence'){
                    document.getElementById('expenceTitle').value=element.title;
                    document.getElementById('expenceAmount').value=element.amount;
                }
            }
        })  
        this.deletIteams(target);
    }

    addamounts(){
        let income=0;
        let expence=0;
        this.list.forEach(element=>{
            if(element.type==='income'){
                // console.log(element);
                income=income+element.amount;
            }
            else if(element.type==='expence'){
                expence=expence+element.amount;
            }
        }) 
        this.incomeValue=income;
        this.expanceValue=expence; 

        this.balanceValue=this.incomeValue-this.expanceValue;
    }

    updateUI(){
        this.outcome.innerHTML=`<h2><span>${'RS'} </span>${this.expanceValue}</h2>`
        this.income.innerHTML=`<h2><span>${'RS'} </span>${this.incomeValue}</h2>`
        this.balance.innerHTML=`<h2><span>${'RS'} </span>${this.balanceValue}</h2>`

    }

    updateTable(){
        let incomeTable=document.getElementById('income-data');
        incomeTable.innerHTML='';

        let expanceTable=document.getElementById('expence-data');
        expanceTable.innerHTML='';

        let allTable=document.getElementById('All-dat');
        allTable.innerHTML='';
   
        this.list.forEach((element,index)=>{    
        let entry= ` <li style="color: black;" id="${index}">
                        <div>${element.title}:</div>
                        <div style="padding-left: 10px;">RS.${element.amount}</div>
                        <div style="padding: 50px;"><i class="fas fa-pen-square fa-1x"id="edit"></i></div>
                        <div><i class="fas fa-trash-alt fa-1x" id="delet"></i></div>
                    </li>`;

            if(element.type==='income'){
                incomeTable.insertAdjacentHTML('afterbegin',entry);
            }
            else if(element.type==='expence'){
                expanceTable.insertAdjacentHTML('afterbegin',entry);
            } 

            allTable.insertAdjacentHTML('afterbegin',entry);
        })
    }

    activeToggle(button){
        button.classList.add('active');
    }

    inActiveToggle(buttons){
        buttons.forEach(element => {
            element.classList.remove('active');
        });
    }

    showArea(area){
        area.classList.remove('hide')
    }

    hideArea(areas){
        areas.forEach(element =>{
            element.classList.add('hide')
        })
    }

    freeInput(){
        document.getElementById('incomeTitle').value='';
        document.getElementById('incomeAmount').value='';
        document.getElementById('expenceTitle').value='';
        document.getElementById('expenceAmount').value='';
    }

    getData(){
        let iteams;
        if(localStorage.getItem('budget')===null){
            iteams=[]
        }else{
            iteams=JSON.parse(localStorage.getItem('budget')); 
        }
        return iteams;
    }

    setIteams(){
        let iteams=this.getData()

        iteams.forEach((element,index)=>{
            iteams.splice(index,1)
        })
        localStorage.setItem('budget',JSON.stringify(this.list))
    }

    removeIteams(target){
        let iteams=this.getData()

        iteams.forEach((elements,index)=>{
            if(index==target.parentElement.parentElement.id){
                iteams.splice(index,1)
            }
        })

        localStorage.setItem('budget',JSON.stringify(iteams))
    }

    
    updateRefresh(){
        let iteams=this.getData()

        this.list=iteams;

        bujet.addamounts()
        bujet.updateUI();
        bujet.updateTable();
        bujet.freeInput()
        updateChart(bujet.incomeValue,bujet.expanceValue);
    }
}



let bujet=new UI();

window.onload=bujet.updateRefresh();

const expenseButton=document.querySelector('.tab1');
const incomeButton=document.querySelector('.tab2');
const AllButton=document.querySelector('.tab3');

const expenceArea=document.querySelector('.expences');
const incomeArea=document.querySelector('.income');
const allArea=document.querySelector('.all');



expenseButton.addEventListener("click",()=>{
    bujet.activeToggle(expenseButton);
    bujet.inActiveToggle([incomeButton,AllButton]);
    bujet.showArea(expenceArea);
    bujet.hideArea([incomeArea,allArea])

})

incomeButton.addEventListener("click",()=>{
    bujet.activeToggle(incomeButton);
    bujet.inActiveToggle([expenseButton,AllButton]);
    bujet.showArea(incomeArea);
    bujet.hideArea([expenceArea,allArea])

})

AllButton.addEventListener("click",()=>{
    bujet.activeToggle(AllButton);
    bujet.inActiveToggle([incomeButton,expenseButton]);
    bujet.showArea(allArea);
    bujet.hideArea([incomeArea,expenceArea])

})

document.getElementById('incomeBtn').addEventListener('click',()=>{
  
    // alert(`income button is working`)
    let income = {
        'type':'income',
        'title':document.getElementById('incomeTitle').value,
        'amount':parseFloat(document.getElementById('incomeAmount').value),
    }

     bujet.list.push(income);
    //console.log(bujet.list);

    bujet.addamounts()
    bujet.updateUI();
    bujet.updateTable();
    bujet.freeInput()
    updateChart(bujet.incomeValue,bujet.expanceValue);
    bujet.setIteams()
    // console.log(bujet.incomeValue);
    // console.log(bujet.expanceValue);

    // test()
//    console.log(bujet.incomeValue) ;
//    console.log(bujet.balanceValue) ;


    // add income outcome
    // shoe blance
    // add iteam to list
    // update ui
})

document.getElementById('expanceBtn').addEventListener('click',()=>{
  
    let expences={
        'type':'expence',
        'title':document.getElementById('expenceTitle').value,
        'amount':parseFloat(document.getElementById('expenceAmount').value),
    }

    bujet.list.push(expences);

    bujet.addamounts();
    bujet.updateUI();
    bujet.updateTable();
    bujet.freeInput()
    updateChart(bujet.incomeValue,bujet.expanceValue);
    bujet.setIteams()

    // console.log(bujet.incomeValue);
    // console.log(bujet.expanceValue);

    // test()

    // alert(`expance button is working`)
    // add income outcome
    // shoe blance
    // add iteam to list
    // update ui
})

document.querySelector('.expences').addEventListener('click',(e)=>{
    if(e.target.id==='edit'){
       
        bujet.editIteams(e.target);
        // console.log(e.target.parentElement.parentElement.id)
        bujet.addamounts();
        bujet.updateUI();
        updateChart(bujet.incomeValue,bujet.expanceValue);

        //alert(`this is edit`)

    }
    else if(e.target.id==='delet'){
       // alert(`this is delet`)
    bujet.deletIteams(e.target)
    // console.log(e.target.parentElement.parentElement.id)
    // console.log(bujet.list);
    bujet.addamounts();
    bujet.updateUI();
    updateChart(bujet.incomeValue,bujet.expanceValue);
    bujet.removeIteams(e.target);

    }
})

document.querySelector('.income').addEventListener('click',(e)=>{
    if(e.target.id==='edit'){
       
        bujet.editIteams(e.target);
        // console.log(e.target.parentElement.parentElement.id)
        bujet.addamounts();
        bujet.updateUI();
        bujet.updateTable()
        updateChart(bujet.incomeValue,bujet.expanceValue);

    }
    else if(e.target.id==='delet'){
        // alert(`this is delet`)
     bujet.deletIteams(e.target)
     // console.log(e.target.parentElement.parentElement.id)
     // console.log(bujet.list);
     bujet.addamounts();
     bujet.updateUI();
     bujet.updateTable()
     updateChart(bujet.incomeValue,bujet.expanceValue);
     console.log(bujet.list);
     bujet.removeIteams(e.target);


     }
})

document.querySelector('.all').addEventListener('click',(e)=>{
    if(e.target.id==='edit'){
       
        bujet.editIteams(e.target);
        // console.log(e.target.parentElement.parentElement.id)
        bujet.addamounts();
        bujet.updateUI();
        bujet.updateTable()
        updateChart(bujet.incomeValue,bujet.expanceValue);

    }
    else if(e.target.id==='delet'){
        // alert(`this is delet`)
     bujet.deletIteams(e.target)
     // console.log(e.target.parentElement.parentElement.id)
     // console.log(bujet.list);
     bujet.addamounts();
     bujet.updateUI();
     bujet.updateTable()
    updateChart(bujet.incomeValue,bujet.expanceValue);

     }
})