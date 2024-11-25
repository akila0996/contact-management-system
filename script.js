let contactList =JSON.parse(localStorage.getItem('contactList')) || [];

let idnoElement  =document.getElementById("rollno");
let usernameElement = document.getElementById("input");
let emailElement = document.getElementById("mail");
let contactElement = document.getElementById("mobile");
let buttonElement = document.getElementById("submit");
let resultElement =document.getElementById("result");
let errorElement =document.getElementById("error");
let updateElement = document.getElementById("update");

buttonElement.addEventListener('click',function(event){

    event.preventDefault()

    if(idnoElement.value === '' || usernameElement.value === '' || emailElement.value === '' || contactElement.value === ''){
        errorElement.innerHTML = "Please Fill the Fields!"
        
    }else { 
        let obj ={id:idnoElement.value , name:usernameElement.value, email:emailElement.value , contact:contactElement.value}
        contactList.push(obj);
        showContact(contactList)
        localStorage.setItem('contactList', JSON.stringify(contactList))
    }

    usernameElement.value = ''
    emailElement.value =''
    contactElement.value = ''
    idnoElement.value = ''

})
 

function showContact(array){

    resultElement.innerHTML = ''
    errorElement.innerHTML = ''

    let tableElement =document.createElement('table')

    tableElement.innerHTML =`<tr>
                            <th> <i class="fa-solid fa-list-ol"></i> </th>
                            <th> <i class="fa-solid fa-user"></i> </th>
                            <th> <i class="fa-solid fa-envelope"></i> </th>
                            <th> <i class="fa-solid fa-square-phone"></i> </th>
                            <th colspan='3'> Action </th>
                           </tr>`;
                          
    array.forEach((data,index) => {
      
    tableElement.innerHTML +=`<tr class="table-td">
        <td>${data.id} </td>
        <td>${data.name} </td>
        <td>${data.email}  </td>
        <td>${data.contact} </td>
        <td><button onclick="editItem(${index})"><i class="fa-solid fa-pencil"></i></button></td>
        <td><button onclick="removeItem(${index})"><i class="fa-solid fa-trash-can"></i></button> </td>
        <td><button onclick="viewItem(${index})"><i class="fa-solid fa-eye"></i></button></td>
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
   buttonElement.style.display = "none"
   updateElement.style.display = "block"

   contactList.find(contact=>contact.id === id)
   idnoElement.value = contactList[id].id
   usernameElement.value = contactList[id].name
   emailElement.value = contactList[id].email
   contactElement.value = contactList[id].contact
   showContact(contactList)
   localStorage.setItem('contactList', JSON.stringify(contactList))
}

updateElement.addEventListener('click',function(){
 contactList = contactList.map(contact=>{
    if(contact.id === idnoElement.value){
        contact.name = usernameElement.value
        contact.email = emailElement.value
        contact.contact = contactElement.value 
    }
    return contact
 })
 showContact(contactList)
   localStorage.setItem('contactList', JSON.stringify(contactList))
})



function viewItem(id){  
                
                let viewElement = document.getElementById('view')
                let divElement = document.createElement('div')
                 divElement.innerHTML = ''
                contactList.find(item=>item.id === id)
                divElement.innerHTML  = `<div class='modal'> 
                                                <button onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
                                            <div class='details'> 
                                                <h2>CONTACT DETAILS </h2>
                                                <p>ID: ${contactList[id].id} </p> 
                                                <p>NAME: ${contactList[id].name} </p> 
                                                <p>EMAIL: ${contactList[id].email} </p> 
                                                <p>CONTACT: ${contactList[id].contact} </p> 
                                            </div>
                                        </div>`
                    viewElement.appendChild(divElement)

     document.getElementById("view").style.display="block"
                                    
}

function closeModal(){
    document.getElementById("view").style.display="none"        
}



showContact(contactList)