const dbRoot = firebase.database().ref();
const projects = dbRoot.child('Projects');
const projectFields = projects.child('fields');
const filterForm = document.querySelector('#filter-form');
const applyFilterButton = document.querySelector('#apply-filter-button');
filterForm.reset();


const editSVG='<svg title="edit" class="edit-row edit bi bi-pencil" width="1.6em" height="1.6em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/><path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"/></svg>';
const deleteSVG='<svg title="delete" class="delete-row delete bi bi-trash" width="1.6em" height="1.6em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"/></svg>';

filterForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let data=new FormData(filterForm);
    let projectRefs=projects;
    let obj={};
    data.forEach((value, key) => {
        obj[key]=value.trim();
        if(key[0]!='_' && value!=""){
            console.log(key,value,'a');
            projectRefs = projectRefs.orderByChild(key).equalTo(value);
        }
    });
        console.log(obj);
    // projectRefs.once('value',snap=>{
    //     console.log(snap.val());
    // })
    // filterForm.querySelectorAll('.filter-input-active').forEach(input=>{
    //     queryParams.
    // });
    
})

filterForm.addEventListener('click',(e)=>{
    if(e.target.type=='checkbox'){
        const fillInp=e.target.parentNode.parentNode.querySelector('.filter-input');
        fillInp.classList.toggle('filter-input-active');
        fillInp.value="";
    }
})

projectFields.on('child_added',snap=>{
    const field=snap.key;
    const type=snap.val();
    console.log('added',field,type);
    const  fieldLabel = document.createElement('label');
    fieldLabel.setAttribute('for',field);
    fieldLabel.innerHTML=field;
    const  fieldCheck = document.createElement('input');
    fieldCheck.setAttribute('type','checkbox');
    fieldCheck.setAttribute('name','_'+field);
    const span = document.createElement('span');
    const div = document.createElement('div');
    div.id=field+'-div';
    span.appendChild(fieldCheck);
    span.appendChild(fieldLabel);
    div.appendChild(span);
    switch(type){
        case 1: div.innerHTML+='<input class="filter-input" name="'+field+'" type="text" placeholder="'+field+'">';
            break;
        case 2: div.innerHTML+='<textarea class="filter-input" name="'+field+'" placeholder="'+field+'"></textarea>';
            break;
        case 3: div.innerHTML+='<input class="filter-input" name="'+field+'" type="number" placeholder="'+field+'">';
            break;
        case 4: div.innerHTML+='<input class="filter-input" name="'+field+'" type="email" placeholder="'+field+'">';
            break;
    }
    filterForm.appendChild(div);
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