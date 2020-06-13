const dbRoot = firebase.database().ref();
const projects = dbRoot.child('Projects');
const projectFields = projects.child('fields');
const projectsForm = document.querySelector('#projects-form');
const fieldsForm = document.querySelector('#fields-form');
const addFieldButton = document.querySelector('#add-field-button');
const addProjectButton = document.querySelector('#add-project-button');
const projectsTable = document.querySelector('#projects-table')
projectsForm.reset();


const editSVG='<svg title="edit" class="edit-row edit bi bi-pencil" width="1.6em" height="1.6em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg>';
const deleteSVG='<svg title="delete" class="delete-row delete bi bi-trash" width="1.6em" height="1.6em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/></svg>';

projectsForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('projects form submitted');
})

addFieldButton.addEventListener('click',(e)=>{
    data=new FormData(projectsForm);
    const field=data.get('field');
    const type=data.get('type');
    addField(field,parseInt(type));
    projectsForm.reset();
})

addProjectButton.addEventListener('click',(e)=>{
    data=new FormData(projectsForm);
    data.delete('1BHK');
    data.delete('2BHK');
    data.delete('3BHK');
    data.delete('4BHK');
    var obj = {};
    data.forEach((value, key) => {obj[key] = value.trim()});
    delete obj.field;
    delete obj.type;
    const inpActive=document.querySelectorAll('.input-active');
    if(inpActive.length){
        inpActive.forEach(ele=>{
            let temp={...obj}
            temp.Type=ele.id;
            temp.Area=ele.children.Area.value.trim();
            temp.Price=ele.children.Price.value.trim();
            temp.Specifications=ele.children.Specifications.value.trim();
            addProject(temp);
            ele.classList.remove('input-active');
        })
    }else{
        alert('Enter Types of Flats in the Project.');
    }
    projectsForm.reset();
})

const addProject = (args) =>{
    let newKey = projects.push().key;
    let Project={
        ...args
    }
    let update={};
    update[newKey]=Project;
    projects.update(update);
}
const deleteEntry = (type,key) =>{
    firebase.database().ref().child(type+'/'+key).remove();
}

const editProject = (ambulanceKey, permanentLocation, contactNumber) =>{
    if(permanentLocation)
    projects.child(ambulanceKey+'/permanentLocation').set(permanentLocation);
    if(contactNumber)
    projects.child(ambulanceKey+'/contact').set(contactNumber);
}

const addField = (fieldName,fieldType) =>{
    projectFields.child(fieldName).set(fieldType);
}


function showMessage(message) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML=message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
} 

projects.on('child_added',snap=>{
    const project=snap.val();
    projectsTable.innerHTML+= JSON.stringify(project)+'<br>' ;
})

projectFields.on('child_added',snap=>{
    // const projectsTableHeader=document.querySelector('.table-head');
    const field=snap.key;
    // projectsTableHeader.innerHTML+=`<th>${field}</th>`;
    const type=snap.val();
    console.log('added',field,type);
    const  fieldLabel = document.createElement('label');
    fieldLabel.setAttribute('for',field);
    fieldLabel.innerHTML=field;
    const  formField = document.createElement('span');
    formField.classList.add('form-field');
    formField.appendChild(fieldLabel);
    switch(type){
        case 1: formField.innerHTML+='<span class="form-right"><input name="'+field+'" type="text" placeholder="'+field+'"></span>';
            break;
        case 2: formField.innerHTML+='<span class="form-right"><textarea name="'+field+'" placeholder="'+field+'"></textarea></span>';
            break;
        case 3: formField.innerHTML+='<span class="form-right"><input name="'+field+'" type="number" placeholder="'+field+'"></span>';
            break;
        case 4: formField.innerHTML+='<span class="form-right"><input name="'+field+'" type="email" placeholder="'+field+'"></span>';
            break;
        case 6: 
            formField.innerHTML+=
                `<span id="flat-type" class="form-right">
                    <div class="types">
                        <span class="check">
                            <input type="checkbox" name="1BHK">
                            <label for="1BHK">1 BHK</label>
                        </span>
                        <span id="1BHK" class="type-input">
                            <input name="Area" type="text" placeholder="Area">
                            <input name="Price" type="number" placeholder="Price">
                            <textarea name="Specifications" type="text" placeholder="Specifications"></textarea>
                        </span>
                    </div>
                    <div class="types">
                        <span class="check">
                            <input type="checkbox" name="2BHK">
                            <label for="2BHK">2 BHK</label>
                        </span>
                        <span id="2BHK" class="type-input">
                            <input name="Area" type="text" placeholder="Area">
                            <input name="Price" type="number" placeholder="Price">
                            <textarea name="Specifications" type="text" placeholder="Specifications"></textarea>
                        </span>
                    </div>
                    <div class="types">
                        <span class="check">
                            <input type="checkbox" name="3BHK">
                            <label for="3BHK">3 BHK</label>
                        </span>
                        <span id="3BHK" class="type-input">
                            <input name="Area" type="text" placeholder="Area">
                            <input name="Price" type="number" placeholder="Price">
                            <textarea name="Specifications" type="text" placeholder="Specifications"></textarea>
                        </span>
                    </div>
                    <div class="types">
                        <span class="check">
                            <input type="checkbox" name="4BHK">
                            <label for="4BHK">4 BHK</label>
                        </span>
                        <span id="4BHK" class="type-input">
                            <input name="Area" type="text" placeholder="Area">
                            <input name="Price" type="number" placeholder="Price">
                            <textarea name="Specifications" type="text" placeholder="Specifications"></textarea>
                        </span>
                    </div>
                </span>`;
                setTimeout(()=>{
                    document.querySelector('#flat-type').addEventListener('click',(e)=>{
                        if(e.target.type=='checkbox'){
                            const typeInp=e.target.parentNode.nextElementSibling;
                            typeInp.classList.toggle('input-active');
                            typeInp.children.Area.value="";
                            typeInp.children.Price.value="";
                            typeInp.children.Specifications.value="";
                        }
                    });
                },100)
                break;
    }
    projectsForm.appendChild(formField);
})

projectFields.on('child_changed',snap=>{
    console.log('changed',snap.key,snap.val());
    // let ambulance=snap.val();
    // let  ambulanceID = document.createElement('td');
    // ambulanceID.innerHTML=snap.key;
    // let location = document.createElement('td');
    // location.innerHTML='lat: '+ambulance.permanentLocation.lat+'<br>long: '+ambulance.permanentLocation.long;
    // ambulanceMarkers[snap.key].setPosition({lat:ambulance.permanentLocation.lat,lng:ambulance.permanentLocation.long});
    // let contact = document.createElement('td');
    // contact.innerHTML = ambulance.contact;
    // let actionIcons = document.createElement('td');
    // actionIcons.innerHTML = editSVG+deleteSVG;
    // actionIcons.classList.add('butt');
    // let tableRow=document.createElement('tr');
    // tableRow.appendChild(ambulanceID);
    // tableRow.appendChild(location);
    // tableRow.appendChild(contact);
    // tableRow.appendChild(actionIcons);
    // tableRow.id=snap.key;
    // tableRow.classList.add('Ambulances');
    // document.querySelector("#"+snap.key).outerHTML=tableRow.outerHTML;
})

projectFields.on('child_removed',snap=>{
    console.log('removed',snap.key);
    // document.querySelector('#'+snap.key).remove();
    // ambulanceMarkers[snap.key].setMap(null);
    // ambulanceMarkers[snap.key]=null;
})