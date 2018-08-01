

const config = {
  apiKey: "AIzaSyA3d7dUvmA6XDVH048f43zKm3zpBzaAUSk",
  authDomain: "data-management-project-f00e7.firebaseapp.com",
  databaseURL: "https://data-management-project-f00e7.firebaseio.com",
  projectId: "data-management-project-f00e7",
  storageBucket: "",
  messagingSenderId: "595805807435"
};
firebase.initializeApp(config);

const preObject = document.getElementById('object')
const ulList = document.getElementById('list')

//create reference
const dbRefObject = firebase.database().ref().child('object');


const dbRefList = dbRefObject.child('hobbies')

//sync object changes
function getData() {
  dbRefObject.on('value', snap => {
    console.log('DB DATA:', snap.val());
    const studentObject = snap.val();
    renderStudents(studentObject)
    calculateAverage(studentObject)
  }
)
}

function calculateAverage(studentObject){
  var sum = null;
  for(student in studentObject){
    console.log('student grade:', studentObject[student].grade)
    console.log('number of students', Object.entries(studentObject).length )
    
    sum = sum + parseFloat(studentObject[student].grade)
  }
  var average = sum / Object.entries(studentObject).length
  average = average.toFixed(2)
  $('.avgGrade').text(average)
  return average;
}

function clearPage(){
  document.getElementById('tableBody').innerHTML = "";
}

function renderStudents(studentObject) {
  clearPage();
  console.log(studentObject);
    for (student in studentObject) {
      var outer_tr = $('<tr>');
      var inner_td_name = $('<td>', {
        text: studentObject[student].name
      });

      var inner_td_course = $('<td>', {
        text: studentObject[student].course
      })
      var innter_td_grade = $('<td>', {
        text: studentObject[student].grade
      })
      var inner_button = $('<td>')
      var button = $('<button>', {
        text: 'Delete',
        class: 'btn btn-danger',
        on: {
          click: function (){
            console.log('delete')
            // console.log('studentObj', studentObject.indexOf(student))
            console.log("This is the id we need to delete the student", student);
            dbRefObject.child(student).remove()
            
            // dbRefObject.on('child_removed', snap => {
            //   const elementToRemove = document.getElementById(student);
            //   elementToRemove.remove();
            // })
            
            
            
        }
      }});
      $(inner_button).append(button)
      $(outer_tr).append(inner_td_name, inner_td_course, innter_td_grade, inner_button);
      $('.student-list tbody').prepend(outer_tr);

    }
    // snap.val().map(function(name, course){
    //   console.log(name, course)
    // })

  }


// //sync list changes
// dbRefList.on('child_added', snap => {
//     const li = document.createElement('li');
//     li.innerText = snap.val();
//     li.id = snap.key;
//     ulList.appendChild(li);
//   });

// dbRefList.on('child_changed', snap => {
//   const liChanged = document.getElementById(snap.key);
//   liChanged.innerText = snap.val();
// })





function submitClick() {
  const nameSection = document.getElementById("studentName");
  const course = document.getElementById("course");
  const grade = document.getElementById("studentGrade");
  const submitBtn = document.getElementById("submitBtn")
  const newStudentObject = {};

  newStudentObject.name = nameSection.value;
  newStudentObject.course = course.value;
  newStudentObject.grade = grade.value;

  dbRefObject.push(newStudentObject);
  clearStudentForm();
 // getData();
}

function clearStudentForm(){
  $('#studentName').val('');
  $('#course').val('');
  $('#studentGrade').val('');
}


    //   firebase.database().ref('object').set({
    //     name: "john",
    // })

    // }()); 