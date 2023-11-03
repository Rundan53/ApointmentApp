let getACall= document.getElementById('call');
let name= document.getElementById('fname');
let email= document.getElementById('email1');
let phoneNo= document.getElementById('phone');
let date= document.getElementById('date');
let time= document.getElementById('time');


getACall.addEventListener('click',(e)=>{
    e.preventDefault();
    saveToCloud();
   
});

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/c2b6c7d421ad4937976867d84a3fdeb8/appointmentData')
    .then((res)=>{
        for(let i=0;i<res.data.length;i++){
            showUserOnScreen(res.data[i]);
        }
    })
    .catch((err)=>{
        alert('something went wrong')
    });
})


function saveToCloud(){
    let userDetails={
        userName: name.value,
        userEmail: email.value,
        userPhoneNo: phoneNo.value,
        dateOfApp: date.value,
        timeOfApp: time.value, 
    }
    axios.post('https://crudcrud.com/api/c2b6c7d421ad4937976867d84a3fdeb8/appointmentData',userDetails)
    .then((res)=>{
        showUserOnScreen(res.data);
    })
    .catch((err)=>{
        alert(err);
    })
}


function showUserOnScreen(data){
    let ul= document.createElement('ul');
    let body=document.querySelector('.bg-img');
    let li=document.createElement('li');
    li.className='list-group-item';
    let details=document.createTextNode(`${data.userName} - ${data.userEmail} - ${data.userPhoneNo} - ${data.dateOfApp} - ${data.timeOfApp}`);
    li.appendChild(details);
    ul.appendChild(li);
    body.appendChild(ul);

     //adding delete button
     let deleteBtn=document.createElement('button');
     deleteBtn.className= 'btn btn-danger btn-sm float-right delete';
     let delBtnName=document.createTextNode('delete');
     deleteBtn.appendChild(delBtnName);
     li.appendChild(deleteBtn);
 
     //adding edit button
     let editBtn= document.createElement('button');
     editBtn.classList='btn btn-success btn-sm float-right delete'
     let editBtnName=document.createTextNode('edit');
     editBtn.appendChild(editBtnName);
     li.appendChild(editBtn);

     //event for delete button
     deleteBtn.addEventListener('click',deleteDetails);
     deleteBtn.addEventListener('click',deleteFromScreen)

     //event for edit button
     editBtn.addEventListener('click',addToInputAndUpdate);
     editBtn.addEventListener('click',deleteFromScreen);
    
    function deleteDetails(){
        axios.delete(`https://crudcrud.com/api/c2b6c7d421ad4937976867d84a3fdeb8/appointmentData/${data._id}`)
        .then((res)=>{
            alert('Deleted From Database');
        })
        .catch((err)=>{
            alert('something went wrong');
        });
    }
    
    function deleteFromScreen(){
        ul.remove(li);
    }

    function addToInputAndUpdate(e){
        e.preventDefault();
        name.value= data.userName;
        email.value= data.userEmail;
        phoneNo.value= data.userPhoneNo;
        date.value= data.dateOfApp;
        time.value= data.timeOfApp;

        deleteDetails();
    }
}


