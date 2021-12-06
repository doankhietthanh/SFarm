// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArygMevKgUQqU1UzyMus5SGNJVhpGMNpU",
  authDomain: "iotlab1-90185.firebaseapp.com",
  databaseURL: "https://iotlab1-90185-default-rtdb.firebaseio.com",
  projectId: "iotlab1-90185",
  storageBucket: "iotlab1-90185.appspot.com",
  messagingSenderId: "996044387475",
  appId: "1:996044387475:web:852f12d857022350cdc966",
  measurementId: "G-E7PSKVKTBH",
};

let loaded = 0;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const tempEl = document.querySelector("#temp");
const humEl = document.querySelector("#hum");
const lightEl = document.querySelector("#light");

const btn_motor_on = document.querySelector("#btn-motor-on");
const btn_motor_off = document.querySelector("#btn-motor-off");

const btn_fertilizer_on = document.querySelector("#btn-fertilizer-on");
const btn_fertilizer_off = document.querySelector("#btn-fertilizer-off");

const btn_light_on = document.querySelector("#btn-light-on");
const btn_light_off = document.querySelector("#btn-light-off");

const motor_img = document.querySelector("#image-motor");
const fertilizer_img = document.querySelector("#image-fertilizer");
const light_img = document.querySelector("#image-light");

const loading_page = document.querySelector(".loading-page");
btn_motor_on.addEventListener("click", () => {
  set(ref(db, "/motor"), true);
});

btn_motor_off.addEventListener("click", () => {
  set(ref(db, "/motor"), false);
});

btn_fertilizer_on.addEventListener("click", () => {
  set(ref(db, "/fertilizer"), true);
});
btn_fertilizer_off.addEventListener("click", () => {
  set(ref(db, "/fertilizer"), false);
});

btn_light_on.addEventListener("click", () => {
  set(ref(db, "/light_control"), true);
});

btn_light_off.addEventListener("click", () => {
  set(ref(db, "/light_control"), false);
});
///////////////////////////////////////////////////////////////
const motorRef = ref(db, "motor");
onValue(motorRef, (snapshot) => {
  const data = snapshot.val();
  checkLoading();
  if (data) {
    motor_img.setAttribute("src", "./assets/water_on.svg");
  } else {
    motor_img.setAttribute("src", "./assets/water_off.svg");
  }
});

const fertilizerRef = ref(db, "fertilizer");
onValue(fertilizerRef, (snapshot) => {
  const data = snapshot.val();
  checkLoading();
  if (data) {
    fertilizer_img.setAttribute("src", "./assets/fertilizer_on.svg");
  } else {
    fertilizer_img.setAttribute("src", "./assets/fertilizer_off.svg");
  }
});

const lightControlRef = ref(db, "light_control");
onValue(lightControlRef, (snapshot) => {
  const data = snapshot.val();
  checkLoading();
  if (data) {
    light_img.setAttribute("src", "./assets/light_on.svg");
  } else {
    light_img.setAttribute("src", "./assets/light_off.svg");
  }
});
const checkLoading = () => {
  loaded++;
  if (loaded === 3) {
    loading_page.classList.add("hide");
    setTimeout(() => {
      loading_page.style.display = "none";
    }, 500);
  }
};

////////////////////////////////////////////////////////////////
const tempRef = ref(db, "temp");
onValue(tempRef, (snapshot) => {
  const data = snapshot.val();
  tempEl.textContent = data + " °C";
});

const humRef = ref(db, "hum");
onValue(humRef, (snapshot) => {
  const data = snapshot.val();
  humEl.textContent = data + " %";
});

const lightRef = ref(db, "light");
onValue(lightRef, (snapshot) => {
  const data = snapshot.val();
  lightEl.textContent = data + " UV";
});
