let getACall = document.getElementById('call');
let name = document.getElementById('fname');
let email = document.getElementById('email1');
let phoneNo = document.getElementById('phone');
let date = document.getElementById('date');
let time = document.getElementById('time');


getACall.addEventListener('click', (e) => {
    e.preventDefault();
    saveToDatabase();

});



window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/admin/getUsers')
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                showUserOnScreen(res.data[i]);
            }
        })
        .catch((err) => {
            alert('something went wrong')
        });
})




function saveToDatabase() {
    const userDetails = {
        name: name.value,
        email: email.value,
        phoneNo: phoneNo.value,
        date: `${date.value}:${time.value}`,
    }
    axios.post('http://localhost:3000/add-user', userDetails)
        .then((res) => {
            showUserOnScreen(res.data);
            location.reload();
        })
        .catch((err) => {
            alert(err);
        })
}




function deleteDetails(dataId) {
    axios.delete(`http://localhost:3000/admin/deleteUser/${dataId}`)
        .then((res) => {
            alert('Deleted From Database');
        })
        .catch((err) => {
            // alert('something went wrong');
            console.log('error in deleteDetails function')
        });
}




function addToInputAndUpdate(data) {
    const dateTime = new Date(data.date);
    const formattedDate = dateTime.toISOString().split('T')[0];
    const formattedTime = dateTime.toTimeString().split(' ')[0];
    name.value = data.name;
    email.value = data.email;
    phoneNo.value = data.phoneNo;
    date.value = formattedDate;
    time.value = formattedTime;

    deleteDetails(data.id);
}




function showUserOnScreen(data) {
    let ul = document.createElement('ul');
    let body = document.querySelector('.bg-img');
    let li = document.createElement('li');
    li.className = 'list-group-item';

    let details = document.createTextNode(`${data.name} - ${data.email} - ${data.phoneNo} - ${data.date}`);
    li.appendChild(details);
    ul.appendChild(li);
    body.appendChild(ul);

    //adding delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    let delBtnName = document.createTextNode('delete');
    deleteBtn.appendChild(delBtnName);
    li.appendChild(deleteBtn);

    //adding edit button
    let editBtn = document.createElement('button');
    editBtn.classList = 'btn btn-success btn-sm float-right delete'
    let editBtnName = document.createTextNode('edit');
    editBtn.appendChild(editBtnName);
    li.appendChild(editBtn);

    //event for delete button
    deleteBtn.addEventListener('click', () => deleteDetails(data.id));
    deleteBtn.addEventListener('click', deleteFromScreen)

    //event for edit button
    editBtn.addEventListener('click', () => addToInputAndUpdate(data));
    editBtn.addEventListener('click', deleteFromScreen);


    function deleteFromScreen() {
        ul.remove(li);
    }

}

