$(document).ready(initializeApp);


function initializeApp() {
  addClickHandlersToElements();
  getData();
}

function addClickHandlersToElements() {
  $('#studentName').on("input", checkIfValid.bind(null, "studentName", ".add-student-invalid" ));
  $('#course').on("input", checkIfValid.bind(null, "course", ".add-course-invalid"));
  $('#studentGrade').on("input"), checkIfValid.bind(null, "studentGrade", ".add-grade-invalid");
  $('#modalStudentName').on("input", checkIfValid.bind(null, "modalStudentName", ".modal-add-student-invalid"));
  $('#modalCourse').on("input", checkIfValid.bind(null, "modalCourse", ".modal-add-course-invalid"));
  $('#modalStudentGrade').on("input", checkIfValid.bind(null, "modalStudentGrade", ".modal-add-grade-invalid"));
  $('.addStudentClick').on("click", submitCheck);

  $('.cancelButton').on("click", clearStudentForm);
  $('.refreshButton').on("click", getData);
}

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
    const studentObject = snap.val();
    clearPage();    
    for (var student in studentObject) {
      renderStudents(studentObject[student], student)
    }
    calculateAverage(studentObject)
  }
)
}



function calculateAverage(studentObject){
  var sum = null;
  for(student in studentObject){
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

function renderStudents(studentObj, student) {
  // clearPage();
    // for (student in studentObject) {
      var outer_tr = $('<tr>');
      var inner_td_name = $('<td>', {
        text: studentObj.name
      });

      var inner_td_course = $('<td>', {
        text: studentObj.course
      })
      var innter_td_grade = $('<td>', {
        text: studentObj.grade
      })
      var inner_button = $('<td>', {class: "td-buttons"});
      var second_inner_button = $('<td>', {class: "td-buttons"});
      var update_button = $('<button>', {
        text: 'Update',
        class: 'btn btn-info student-update',
        'data-toggle': "modal",
        'data-target': "#updateModal",
        on: {
          click: function() {
            showStudentInfoOnModal(studentObj, student)
          }
        }
      })
      var delete_button = $('<button>', {
        text: 'Delete',
        class: 'btn btn-danger student-delete',
        on: {
          click: function (){
            dbRefObject.child(student).remove()      
        }
      }});
      $(inner_button).append(delete_button);
      $(second_inner_button).append(update_button);
      $(outer_tr).append(inner_td_name, inner_td_course, innter_td_grade, second_inner_button, inner_button);
      $('.student-list tbody').prepend(outer_tr);

    // }
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
function showStudentInfoOnModal(studentObject, student){
    $('.modal-title').text(`Update ${studentObject.name}'s information`)
    $('.modalStudentName').val(studentObject.name);
    $('.modalStudentCourse').val(studentObject.course);
    $('.modalStudentGrade').val(studentObject.grade);
    $('.update-student-button').on('click' ,function() {
      updateStudent(studentObject, student);
      $(".update-student-button").off();

    });
}

function updateStudent(studentObject, student) {
  
  var modalNameValid = checkIfValid("modalStudentName", ".modal-add-student-invalid" );
  var modalCourseValid = checkIfValid("modalCourse", ".modal-add-course-invalid");
  var modalGradeValid = checkIfValid("modalStudentGrade", ".modal-add-grade-invalid");
  if(!modalNameValid || !modalCourseValid || !modalGradeValid){
    // $('.update-student-button').attr("data-dismiss", "null");  
    return;
      
  }
  // $('.update-student-button').attr("data-dismiss", "modal")
  // document.getElementById("update-student-button").setAttribute("data-dismiss", "modal")
  //$('.update-student-button').attr("data-dismiss", "modal");
  const modalName = $('.modalStudentName')
  const modalCourse = $('.modalStudentCourse')
  const modalGrade = $('.modalStudentGrade')
  const updateStudentObject = {}

  updateStudentObject.name = modalName.val()
  updateStudentObject.course = modalCourse.val();
  updateStudentObject.grade = modalGrade.val()
  dbRefObject.child(student).set(updateStudentObject);
  getData();
  
  }


function submitCheck(){
  var nameValid = checkIfValid("studentName", ".add-student-invalid" );
  var courseValid = checkIfValid("course", ".add-course-invalid");
  var gradeValid = checkIfValid("studentGrade", ".add-grade-invalid");
  if(!nameValid || !courseValid || !gradeValid){
      return;
  }
  submitClick();
}


function submitClick() {
  
  const nameSection = document.getElementById("studentName");
  const course = document.getElementById("course");
  const grade = document.getElementById("studentGrade");
  const submitBtn = document.getElementById("submitBtn")
  const newStudentObject = {};
  // if (!nameSection.value) {
  //   $('.add-student-invalid').addClass('show-message')
  //   return;
  // }
  // else{
  //   $('.add-student-invalid').removeClass('show-message')
  // }
  // if(!course.value){
  //   $('.add-course-invalid').addClass('show-message')
  //   return;
  // }
  // else{
  //   $('.add-course-invalid').removeClasse('show-message')
  // }
  // if(!grade.value){
  //   $('.add-grade-invalid').addClass('show-message')
  //   return;
  // }
  // else{
  //   $('.add-course-invalid').removeClass('show-message')
  // }

  newStudentObject.name = nameSection.value;
  newStudentObject.course = course.value;
  newStudentObject.grade = parseFloat(grade.value).toFixed(2);

  dbRefObject.push(newStudentObject);
  clearStudentForm();
 // getData();
}


function checkIfValid(inputId, responseElementClass){
  const pageElement = document.getElementById(inputId)

  if (!pageElement.value) {
    $(responseElementClass).addClass('show-message');
    return false;
  }
  else{
    $(responseElementClass).removeClass('show-message');
    return true;
  }
}


function clearStudentForm(){
  $('#studentName').val('');
  $('#course').val('');
  $('#studentGrade').val('');
}


  