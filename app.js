// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAVjaAkdtRy51BHDEhGAl-B8EBsMfAeiB4",
  authDomain: "cafe-cloud-8f1e8.firebaseapp.com",
  databaseURL: "https://cafe-cloud-8f1e8.firebaseio.com",
  projectId: "cafe-cloud-8f1e8",
  storageBucket: "cafe-cloud-8f1e8.appspot.com",
  messagingSenderId: "661991400506",
  appId: "1:661991400506:web:70197fc2eff25743320103",
  measurementId: "G-DCRJBPWQ8R",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//my own setup
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

  
const cafeList = document.querySelector('#cafe-list');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li);
}

// getting data
db.collection('cafes').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});