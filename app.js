        // Initialize Firebase
// (function() { 
        
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
      dbRefObject.on('value', snap => {
          preObject.innerText = JSON.stringify(snap.val(), null, 3)
      })

      //sync list changes
      dbRefList.on('child_added', snap => {
          const li = document.createElement('li');
          li.innerText = snap.val();
          li.id = snap.key;
          ulList.appendChild(li);
        });

      dbRefList.on('child_changed', snap => {
        const liChanged = document.getElementById(snap.key);
        liChanged.innerText = snap.val();
      })

      dbRefList.on('child_removed', snap => {
        const liToRemove = document.getElementById(snap.key);
        liToRemove.remove();
      })


    //   firebase.database().ref('object').set({
    //     name: "john",
    // })

    // }()); 