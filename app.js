        // Initialize Firebase
(function() { 
        
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

      //create reference
      const dbRefObject = firebase.database().ref().child('object');

      //sync object changes
      dbRefObject.on('value', snap => {
          preObject.innerText = JSON.stringify(snap.val(), null, 3)
      })

    }());