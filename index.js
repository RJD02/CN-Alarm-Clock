// catch all btns through which we can create new alarm element
const addNewBtn = document.querySelectorAll(".add-new-alarm");

// Modal opening and closing logic
const modalDialog = document.querySelector("#dialog");
const modalCloseBtn = document.querySelector("#close");
const overlay = document.querySelector("#overlay");

// the id for alarms
let id = 1;

// these variables are used to removeEventListener after modal is opened for one alarm obj
let okBtnListener;
let cancelBtnListener;

// audio object
const audio = new Audio();

// all the input fields
const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");
const soundName = document.querySelector("#sound-select");
const gridDiv = document.querySelector(".grid");
const am = document.querySelector("#AM");
const pm = document.querySelector("#PM");

// modal action btns
const okBtn = document.querySelector("#ok");
const cancelBtn = document.querySelector("#close");

// sound names
const soundNames = {
  first: "Waves",
  second: "Ocean",
  third: "Winter",
  fourth: "Joy",
};

// add event listener to "Add alarm" btns
addNewBtn.forEach((val) =>
  val.addEventListener("click", () => {
    console.log("creating new alarm");
    const alarm = new AlarmElement();
    openModal();
    console.log(alarm);
    okBtnListener = () => {
      alarm.okhandler();
    };
    cancelBtnListener = () => {
      alarm.cancelHandler();
    };
    okBtn.addEventListener("click", okBtnListener);
    cancelBtn.addEventListener("click", cancelBtnListener);
  })
);

// openModal opens the UI modal
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

// closeModal closes the modal
const closeModal = () => {
  console.log("closing modal");
  modalDialog.classList.add("hidden");
  overlay.classList.add("hidden");
};

// playAudio plays the audio of selected sound
const playAudio = (soundName) => {
  audio.src = `./public/assets/audio/${soundName}.wav`;
  audio.play();
};

// pauseAudio pauses the audio no matter the alarm
const pauseAudio = () => {
  audio.pause();
};

// updateCountDown is called every second by each alarm to update and check the time remaining
// called by every object and is binded to that object
function updateCountDown(alarmTime) {
  const countdownPara = document.querySelector(
    `#col-${this.uniqueId} .count-down`
  );
  const now = new Date();
  const timeRemaining = alarmTime - now;
  if (timeRemaining <= 0) {
    if (this.isSoundOn) playAudio(this.soundName);
    clearInterval(this.alarmInterval);
    alert("Time's up! Alarm triggered");
    if (this.isSoundOn) pauseAudio();
    this.deleteAlarm();
    countdownPara.textContent = "00:00:00";
    return;
  }
  const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  countdownPara.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// AlarmElement class handles the alarm features
class AlarmElement {
  constructor() {
    openModal();
    this.uniqueId = id++;
    this.isSoundOn = true;
    this.soundName = "first";
    this.alarmInterval;
    this.timeRemaining;
    this.colDiv;
    console.log("this id = ", this.uniqueId);
  }

  // showError shows error paragraph inside modal
  showError(content) {
    const message = document.querySelector(".error");
    message.classList.remove("hidden");
    console.log(message, content);
    message.textContent = content;
  }

  // okhandler handles the check and creates new HTML element(alarm)
  okhandler() {
    // set the sound name
    this.soundName = soundName.value;
    // input validation
    if (parseInt(hours.value) > 12 || hours.value === "") {
      this.showError(`Please enter hours between 1 to 12`);
      return;
    }
    if (parseInt(minutes.value) > 59 || minutes.value === "") {
      this.showError(`Please enter minutes between 0 to 59`);
      return;
    }
    if (am.checked === pm.checked) {
      this.showError(
        `Please select ${
          am.checked === false ? "at least am or pm" : "at most one of am or pm"
        }`
      );
      return;
    }
    const now = new Date();
    const alarmTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      pm.checked ? parseInt(hours.value) + 12 : hours.value,
      minutes.value,
      0
    );
    const timeRemaining = alarmTime - now;
    if (timeRemaining < 0) {
      this.showError("Please set a time in the future");
      return;
    }

    // create a new alarm element
    this.colDiv = document.createElement("div");
    this.colDiv.classList.add("col");
    this.colDiv.id = `col-${this.uniqueId}`;
    console.log(this);
    this.colDiv.innerHTML =
      `<div class="min-w-[200px] min-h-[200px] flex flex-col border-solid border-2 border-grey-500 rounded-md px-2">
      <p class="text-center mb-4"><span class="text-5xl">${hours.value
        .toString()
        .padStart("0", 2)}:${minutes.value
        .toString()
        .padStart("0", 2)}</span><span class="text-xl">${
        am.checked ? "AM" : "PM"
      }</span></p>
          <div class="time-remaining flex justify-between text-base">
            <p>Time Remaining:</p>
            <p class="count-down">Loading...</p>
          </div>

          <hr class="w-full h-1 mx-auto my-0.5 bg-gray-300 border-0 rounded" />
          <div class="sound flex justify-between text-base">
            <p>Sound:</p>
            <p>${soundNames[this.soundName]}</p>
          </div>
          <hr class="w-full h-1 mx-auto my-0.5 bg-gray-300 border-0 rounded" />
          <div class="repeat flex justify-between text-base">
            <p>Repeat:</p>
            <p>Everyday</p>
          </div>
          <hr class="w-full h-1 mx-auto my-0.5 bg-gray-300 border-0 rounded" />
          <div class="actions flex justify-between w-100 mt-4">
            <i class="fa-solid fa-toggle-on fa-2xl cursor-pointer"></i>
            <i class="fa-solid fa-toggle-off fa-2xl hidden cursor-pointer"></i>
            <i class="fa-solid fa-trash fa-lg cursor-pointer"></i>
          </div></div>`.trim();
    gridDiv.lastElementChild.before(this.colDiv);
    this.cancelHandler();

    this.alarmInterval = setInterval(
      updateCountDown.bind(this),
      1000,
      alarmTime
    );
    okBtn.removeEventListener("click", okBtnListener);

    // add event listener to delete and sound on/off btn icons
    const soundOffBtn = document.querySelector(
      `#col-${this.uniqueId} .actions .fa-toggle-on`
    );
    const soundOnBtn = document.querySelector(
      `#col-${this.uniqueId} .actions .fa-toggle-off`
    );
    const deleteAlarmBtn = document.querySelector(
      `#col-${this.uniqueId} .actions .fa-trash`
    );

    soundOffBtn.addEventListener("click", () => {
      soundOffBtn.classList.add("hidden");
      soundOnBtn.classList.remove("hidden");
      this.isSoundOn = false;
    });
    soundOnBtn.addEventListener("click", () => {
      soundOnBtn.classList.add("hidden");
      soundOffBtn.classList.remove("hidden");
      this.isSoundOn = true;
    });

    deleteAlarmBtn.addEventListener("click", () => {
      console.log("Deleting ", this.uniqueId);
      this.deleteAlarm();
    });
  }

  // deleteAlarm deletes the alarm element from the HTML document
  deleteAlarm() {
    clearInterval(this.alarmInterval);
    this.colDiv.remove();
  }

  // cancelHandler closes the modal and resets the input fields
  cancelHandler() {
    const message = document.querySelector(".error");
    hours.value = "";
    minutes.value = "";
    am.checked = false;
    pm.checked = false;
    message.textContent = "";
    message.classList.add("hidden");
    closeModal();
    cancelBtn.removeEventListener("click", cancelBtnListener);
  }
}
