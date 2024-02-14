let form = document.getElementById("myForm");
let inputImg = document.querySelector('.img');
let uploadImg = document.getElementById('uploadImg');
let idInput = document.getElementById('idInput');
let nameInput = document.getElementById('textInput');
let emailInput = document.getElementById('emailInput');
let officeInput = document.getElementById('officeInput');
let jobInput = document.getElementById('jobInput');
let modalTitle = document.querySelector('#formData .modal-title');

let employeData = document.getElementById('employeData');
let newUserBtn = document.querySelector('.newUserBtn');

let submitBtn = document.querySelector('.submit');


let getData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : [];
console.log(getData)

let isEdit = false, editId

newUserBtn.addEventListener("click", (e) => {
      submitBtn.innerText = "Add"
      modalTitle.innerHTML = "Add Employe Details"
      isEdit = false
      form.reset();
      inputImg.src = "img/profile-img-1.jpg"
})

// img upload method
uploadImg.onchange = () => {
      if (uploadImg.files[0].size < 1000000) {
            let fileReader = new FileReader();
            fileReader.onload = (e) => {
                  imgUrl = e.target.result
                  inputImg.src = imgUrl
            }
            fileReader.readAsDataURL(uploadImg.files[0]);
      } else {
            alert("File Size is to Large!")
      }
}

let createData = () => {
      document.querySelectorAll(".userInputData").forEach(info => info.remove())
      getData.map((values, index) => {
            let createElement = `
            <tr class="userInputData">
                        <td>${index + 1}</td>
                        <td><img src="${values.picture}" alt="Img Error" width="50" height="50"></td>
                        <td>${values.id}</td>
                        <td>${values.name}</td>
                        <td>${values.email}</td>
                        <td>${values.office}</td>
                        <td>${values.job}</td>
                        <td>
                              <button type="button" class="btn btn-warning btn-sm" onclick="editData('${index}','${values.picture}','${values.id}','${values.name}','${values.email}','${values.office}','${values.job}')" data-bs-toggle="modal" data-bs-target="#formData"><i class="fas fa-edit"></i></button> 
                            
                              <button type="button" class="btn btn-danger btn-sm" onclick="deleteData('${index}')"><i class="fas fa-trash-alt"></i></button>
                        </td>
            </tr>`

            employeData.innerHTML += createElement;
      })
}
createData();

// delete method

let deleteData = (index) => {

      swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Employe Data file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
      })
      .then((willDelete) => {
            if (willDelete) {
                  getData.splice(index, 1)
                  localStorage.setItem("userData", JSON.stringify(getData))
                  createData();
                              swal("Poof! Your Employe Data file has been deleted!", {
                                    icon: "success",
                              });
                        } else {
                              swal("Your Employe Data file is safe!");
                        }
                  });

      // if (confirm("Are you sure want to delete?")) {
      //       getData.splice(index, 1)
      //       localStorage.setItem("userData", JSON.stringify(getData))
      //       createData();
      // }
}

//edit method

let editData = (index, pic, Id, Name, Email, Office, Job) => {
      // alert()
      isEdit = true;
      editId = index;
      console.log(editId)

      profilePic.src = pic;
      idInput.value = Id;
      nameInput.value = Name;
      emailInput.value = Email;
      officeInput.value = Office;
      jobInput.value = Job;

      submitBtn.innerHTML = "Update"
      modalTitle.innerHTML = "Update The Employe Details"
}


form.addEventListener("submit", (e) => {
      e.preventDefault()

      let acceptData = {
            picture: inputImg.src == undefined ? "img/profile-img-1.jpg" : inputImg.src,
            id: idInput.value,
            name: nameInput.value,
            email: emailInput.value,
            office: officeInput.value,
            job: jobInput.value,

      };
      swal("Good job!", "Successfuly Added!", "success");
      if (!isEdit) {
            getData.push(acceptData)
      }
      else {
            isEdit = false
            getData[editId] = acceptData
      }

      localStorage.setItem("userData", JSON.stringify(getData))

      // submitBtn.innerText = "Add"
      // modalTitle.innerHTML = "Add Employe Details"

      createData();

      form.reset();

      inputImg.src = "img/profile-img-1.jpg"
})

// search method
let searchElem = document.querySelector("#inputSearch")
searchElem.oninput = function () {
      searchFun();
}

function searchFun() {
      let tr = employeData.querySelectorAll("tr");
       
      let filterElem = searchElem.value.toLowerCase();
       
      for (let i = 0; i < tr.length; i++) {
            let id = tr[i].getElementsByTagName("td")[2].innerHTML;
            let name = tr[i].getElementsByTagName("td")[3].innerHTML;
            let mail = tr[i].getElementsByTagName("td")[4].innerHTML;
            let office = tr[i].getElementsByTagName("td")[5].innerHTML;
            let job = tr[i].getElementsByTagName("td")[6].innerHTML;
            if (id.toLocaleLowerCase().includes(filterElem)) {
                  tr[i].style.display = "";
            }   
            else if (name.toLocaleLowerCase().includes(filterElem)) {
                  tr[i].style.display = "";
            }   
            else if (mail.toLocaleLowerCase().includes(filterElem)) {
                  tr[i].style.display = "";
            }   
            else if (office.toLocaleLowerCase().includes(filterElem)) {
                  tr[i].style.display = "";
            }   
            else if (job.toLocaleLowerCase().includes(filterElem)) {
                  tr[i].style.display = "";
            }   
            
            else {
                  tr[i].style.display = 'none';
            }
      }
}

//delete all

let clearAll=document.getElementById("clearAll")
let checkAllData=document.querySelector("#checkAllData");

clearAll.addEventListener("click",(e)=>{
      if(checkAllData.checked==true){
            swal({
                  title: "Are you sure?",
                  text: "Once deleted, you will not be able to recover this Employe Data files!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
            })
            .then((willDelete) => {
                  if (willDelete) {
                        localStorage.removeItem("userData");
                        window.location=location.href
                        swal("Poof! Your Employe Data files has been deleted!", {
                              icon: "success",
                        });
                        } else {
                               swal("Your Employe Data files is safe!");
                        }
                  });
      } else{
            swal("Check Box!", "Please check the box to delete data!", "warning"); 
      }

})

      