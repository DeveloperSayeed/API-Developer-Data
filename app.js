const dev_skill = document.querySelector("#dev_skill")
const dev_location = document.querySelector("#dev_location")
const Add_Devs = document.getElementById("dev_add_form")
const edit_Devs = document.getElementById("dev_edit_form")
const remove_dev = document.getElementById("remove_dev")
const view_output = document.getElementById("dev_view_output")




//  Developer Skill APi Function  

function devSkill() {

    axios("http://localhost:9090/skill").then(devs => {
        let dev_skill_list = ""
        devs.data.map(dev => {
            dev_skill_list += `
        <option value="${dev.name}">${dev.name}</option> `
        })
        dev_skill.insertAdjacentHTML('beforeend', dev_skill_list)
    })
}

devSkill();



//  developer Locatopn Api Function 

function devLocation() {


    axios("http://localhost:9090/location").then(location => {

        let devLocation = ''

        location.data.map(data => {

            devLocation += ` <option value="${data.name}">${data.name}</option>`
        })
        dev_location.insertAdjacentHTML('beforeend', devLocation)

    })
}


devLocation()



/** Add New Developer Form 
 * 
 */

Add_Devs.addEventListener("submit", function (e) {

    e.preventDefault();

    let devName = document.querySelector("#dev_name")
    let devAge = document.querySelector("#dev_age")
    let devGender = document.querySelector("input[name='gender']:checked")
    let devPhoto = document.querySelector("#dev_photo")
    let devSkills = document.querySelector("#dev_skill")
    let devLocations = document.querySelector("#dev_location")


    if (devName.value == "" || devAge.value == "" || devPhoto.value == "" || devSkills.value == "" ||
        devLocations.value == "") {
        alert(" All Field Are requird ")
    } else {

        axios.post('http://localhost:9090/developer', {

            "id": "",
            "name": devName.value,
            "age": devAge.value,
            "gender": devGender.value,
            "skillId": devSkills.value,
            "locationId": devLocations.value,
            "photo": devPhoto.value
        }).then(res => {

            devName.value = ""
            devAge.value = ""
            devPhoto.value = ""
            devGender.value = ""
            devSkills.value = ""
            devLocations.value = ""
            devDataLoad()
        })


    }


})

//  Developer Data Load
const dev_output = document.getElementById("dev_output")

devDataLoad()

function devDataLoad() {

    axios.get("http://localhost:9090/developer").then(devs_res => {

        let dev_data_load = ""
        devs_res.data.map((data, index) => {
            dev_data_load += `
                         <tr class="text-center">
                                <td>${index +1}</td>
                                <td>${data.name}</td>
                                <td>${data.age}</td>
                                <td>${data.gender}</td>
                                <td>${data.skillId}</td>
                                <td>${data.locationId}</td>
                                <td><img style="width: 40px; height: 40px; object-fit: cover;"
                                        src="${data.photo}"
                                        alt=""></td>
                                <td> <a onclick="devs_output(${data.id})" data-bs-toggle="modal" id="view" class="btn btn-outline-info btn-sm"
                                        href="#view_devs"><i class="fa-regular fa-eye"></i></a>

                                    <a onclick="dev_edit(${data.id})" data-bs-toggle="modal" id="edit" class="btn btn-outline-success btn-sm"
                                        href="#edit_devs"><i class="fa-regular fa-pen-to-square"></i></a>

                                         <a onclick="dev_remove(${data.id})" data-bs-toggle="modal" id="remove" class="btn btn-outline-danger btn-sm"
                                        href="#remove_devs"><i class="fa-regular fa-trash-can"></i></a> </td>
                            </tr>
        `

        })

        dev_output.innerHTML = dev_data_load
    })
}

//  Developer data Edit



let editDevName = document.querySelector("#edit_dev_name")
let editDevAge = document.querySelector("#edit_dev_age")
let editDevGender = document.querySelector("input[name='gender']:checked")
let editDevPhoto = document.querySelector("#edit_dev_photo")
let editDevSkills = document.querySelector("#edit_dev_skill")
let editDevLocations = document.querySelector("#edit_dev_location")
let preview = document.querySelector("#imgpreview")
let edit_id = document.getElementById("edit_Id")


function dev_edit(id) {



   

    axios.get(`http://localhost:9090/developer/${id}`).then(res => {
        editDevName.value = res.data.name;
        editDevAge.value = res.data.age;
        editDevPhoto.value = res.data.photo;
        editDevSkills.value = res.data.skillId;
        editDevLocations.value = res.data.locationId;
        preview.setAttribute('src', res.data.photo);
        edit_id.value = id;
    })
}


edit_Devs.addEventListener("submit", function (e) {
    e.preventDefault()

    axios.patch(`http://localhost:9090/developer/${edit_id.value}`,{


        "name": editDevName.value,
        "age": editDevAge.value,
        "skillId": editDevSkills.value,
        "locationId": editDevLocations.value,
        "photo": editDevPhoto.value

        

    }).then(res=>{

        editDevAge.value =""
        editDevName.value = ""
        editDevPhoto.value = ""
        editDevLocations.value = ""
        editDevSkills.value = ""
        devDataLoad()
        

    })
    edit_devLocation()
    dev_Skill();


  
})

//  Edit Developer Skill APi Function  



function dev_Skill() {

    axios("http://localhost:9090/skill").then(res => {
        let edit_skill_list = ""
        res.data.map(dev => {
            edit_skill_list += `
        <option value="${dev.name}">${dev.name}</option> `
        })
        editDevSkills.insertAdjacentHTML('beforeend', edit_skill_list)
    })
}

dev_Skill();


//  Edit developer Locatopn Api Function 

function edit_devLocation() {


    axios("http://localhost:9090/location").then(res => {

        let edit_dev_location = ''

        res.data.map(data => {

            edit_dev_location += ` <option value="${data.name}">${data.name}</option>`
        })
        editDevLocations.insertAdjacentHTML('beforeend', edit_dev_location)

    })
}
edit_devLocation()



//  Remove Developer Data

let remmoveData;
function dev_remove(id) {
    remmoveData =id 
}
function remove_devs() {

    axios.delete(`http://localhost:9090/developer/${remmoveData}`).then(res=>{
        devDataLoad()

    })
}



//  View  developer Locatopn Api Function 

function devs_output(id) {
    


    axios.get(`http://localhost:9090/developer/${id}`).then(res=>{

        view_output.innerHTML= `
            <div class="card-body>
            <div class="card-top"> <img class="card-img img-thumbnail w-50 d-block m-auto" src="${res.data.photo}" alt=""></div>
            <div class="card-content">
              <table class="table table-borderless">
                <tbody>
              <tr>
                <td>Name :</td>
                <td>${res.data.name}</td>
            </tr>
            <tr>
                <td>Age :</td>
                <td>${res.data.age}</td>
            </tr>
            <tr>
               <td>Gender :</td>
               <td>${res.data.gender}</td>
            </tr>
            <tr>
               <td>Location :</td>
               <td>${res.data.locationId}</td>
            </tr>
            <tr>
               <td>Skill :</td>
               <td>${res.data.skillId}</td>
            </tr>
         </tbody>
     </table>
 </div>

 ` 

  
    })
    

    
}
