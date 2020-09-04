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

const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

// create element & render cafe
function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  // deleting data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  });
}

// getting data
db.collection("cafes")
  .orderBy("city")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderCafe(doc);
    });
  });

// saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("cafes").add({
    name: form.name.value,
    city: form.city.value,
  });
  form.name.value = "";
  form.city.value = "";
});
