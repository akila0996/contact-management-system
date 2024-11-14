let contactList =JSON.parse(localStorage.getItem('contactList')) || [];

let idnoElement  =document.getElementById("rollno");
let usernameElement = document.getElementById("input");
let emailElement = document.getElementById("mail");
let contactElement = document.getElementById("mobile");
let buttonElement = document.getElementById("submit");
let resultElement =document.getElementById("result");
let errorElement =document.getElementById("error");

buttonElement.addEventListener('click',function(){

    let obj ={id:idnoElement.value , name:usernameElement.value, email:emailElement.value , contact:contactElement.value}

    contactList.push(obj);

    showContact(contactList)

    localStorage.setItem('contactList', JSON.stringify(contactList))

})


function showContact(array){

    resultElement.innerHTML = ''

    let tableElement =document.createElement('table')

    tableElement.innerHTML =`<tr>
                            <th> <i class="fa-solid fa-list-ol"></i> </th>
                            <th> <i class="fa-solid fa-user"></i> </th>
                            <th> <i class="fa-solid fa-envelope"></i> </th>
                            <th> <i class="fa-solid fa-square-phone"></i> </th>
                            <th colspan='3'> Action </th>
                           </tr>`;
                          
    array.forEach((data,index) => {
      
    tableElement.innerHTML +=`<tr>
        <td>${data.id} </td>
        <td>${data.name} </td>
        <td>${data.email}  </td>
        <td>${data.contact} </td>
        <td><button onclick="editItem(${data.id})"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button onclick="removeItem(${index})"><i class="fa-solid fa-trash-can"></i></button> </td>
        <td><button><i class="fa-solid fa-envelope-open"></i></button></td>
       </tr>`;
    
       resultElement.appendChild(tableElement)
    });
}


function removeItem(position){
    contactList.splice(position,1)
    showContact(contactList)
    localStorage.setItem('contactList', JSON.stringify(contactList))

}

function editItem(id){
   contactList.find(contact=>contact.id === id)
   usernameElement.value = contactList[id].name;
   emailElement.value = contactList[id].email
   contactElement.value = contactList[id].contact
   showContact(contactList)
}

showContact(contactList)