const employeeStatus = new XMLHttpRequest();
employeeStatus.onreadystatechange =  () => {
  if(employeeStatus.readyState === 4 && employeeStatus.status === 200) {
    const employees = JSON.parse(employeeStatus.responseText);
    let statusHTML = '<ul class="bulleted">';
    for (let i=0; i<employees.length; i += 1) {
      if ( employees[i].inoffice ) {
        statusHTML += '<li class="in">';
      } else {
        statusHTML += '<li class="out">';
      }
      statusHTML += `${employees[i].name}</li>`;
    }
    statusHTML += '</ul>';
    document.querySelector('#employeeList').innerHTML = statusHTML;
  }
};

const meetingRooms = new XMLHttpRequest();
meetingRooms.onreadystatechange = () => {
  if(meetingRooms.readyState === 4){
    if(meetingRooms.status === 200){
      const availableRooms = JSON.parse(meetingRooms.responseText);
      let roomsHTML = '<ul class="rooms">';
      for( let i = 0; i < availableRooms.length; i++){
        if(availableRooms[i].available){
          roomsHTML += '<li class="empty">';
        } else {
          roomsHTML += '<li class="full">'
        }
        roomsHTML += `${availableRooms[i].room}</li>`
      }
      roomsHTML += '</ul>';
      document.querySelector('#roomList').innerHTML = roomsHTML
    } else {
      console.log(meetingRooms.status, meetingRooms.responseText);
    }
  }
}

employeeStatus.open('GET', '../data/employees.json');
employeeStatus.send();

meetingRooms.open('GET', '../data/rooms.json');
meetingRooms.send();