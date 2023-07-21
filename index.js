const addNewBtn = document.querySelectorAll(".add-new-alarm");

addNewBtn.forEach((val) =>
  val.addEventListener("click", () => {
    console.log("creating new alarm");
    openModal();
  })
);
// Modal opening and closing logic
const modalDialog = document.querySelector("#dialog");
const modalCloseBtn = document.querySelector("#close");
const overlay = document.querySelector("#overlay");

// show the overlay and the dialog
const openModal = () => {
  console.log("opening modal");
  modalDialog.classList.remove("hidden");
  overlay.classList.remove("hidden");
  // if user clicks on background modal should disappear
  overlay.addEventListener("click", () => {
    closeModal();
  });
  // if user clicks on close btn, modal should disappear
  modalCloseBtn.addEventListener("click", () => {
    closeModal();
  });
};

// hide the overlay and the dialog
const closeModal = () => {
  console.log("closing modal");
  modalDialog.classList.add("hidden");
  overlay.classList.add("hidden");
};

// const setAlarmBtn = document.querySelector("#setAlarmBtn");
// const alarmTimeInput = document.querySelector("#alarmTime");
// const countdownContainer = document.querySelector("#countdown");
// const countdownTimeSpan = document.querySelector("#countdownTime");

// let alarmInterval; // value input by user
// let audio = new Audio();

// const playAudio = () => {
//   audio.src = "./public/assets/audio/alarm-clock-project.mp3";
//   audio.autoplay = true;
//   //   setTimeout(() => {
//   //     audio.pause();
//   //   }, 1000);
// };

// setAlarmBtn.addEventListener("click", () => {
//   const alarmTime = alarmTimeInput.value;

//   if (!alarmTime) {
//     alert("Please set the alarm time!");
//     return;
//   }

//   const [hours, minutes] = alarmTime.split(":").map(Number);
//   const now = new Date();
//   const alarmDateTime = new Date(
//     now.getFullYear(),
//     now.getMonth(),
//     now.getDate(),
//     hours,
//     minutes,
//     0
//   );
//   const timeRemaining = alarmDateTime - now;
//   if (timeRemaining < 0) {
//     alert("please set a time in the future");
//     return;
//   }

//   alarmInterval = setInterval(updateCountDown, 1000, alarmDateTime);

//   countdownContainer.style.display = "block";
//   alarmTimeInput.value = "";
// });

// const updateCountDown = (alarmDateTime) => {
//   const now = new Date();
//   const timeRemaining = alarmDateTime - now;
//   console.log(timeRemaining);

//   if (timeRemaining <= 0) {
//     playAudio();
//     clearInterval(alarmInterval);
//     alert("Times up! Alarm triggered");
//     countdownContainer.style.display = "none";
//     return;
//   }
//   const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
//   const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

//   countdownTimeSpan.textContent = `${hours
//     .toString()
//     .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
//     .toString()
//     .padStart(2, "0")}`;
// };
