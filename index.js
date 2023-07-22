const addNewBtn = document.querySelectorAll(".add-new-alarm");

// Modal opening and closing logic
const modalDialog = document.querySelector("#dialog");
const modalCloseBtn = document.querySelector("#close");
const overlay = document.querySelector("#overlay");

// the id for alarms
let id = 1;
let okBtnListener;
let cancelBtnListener;

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

const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");
const soundName = document.querySelector("#sound-select");
const gridDiv = document.querySelector(".grid");
const am = document.querySelector("#AM");
const pm = document.querySelector("#PM");
const okBtn = document.querySelector("#ok");
const cancelBtn = document.querySelector("#close");
class AlarmElement {
  constructor() {
    openModal();
    this.uniqueId = id++;
    this.isOn = true;
    this.soundName = "first";
    this.alarmInterval;
    this.timeRemaining;
    console.log("this id = ", this.uniqueId);
  }

  // show error in p tag content
  showError(content) {
    const message = document.querySelector(".error");
    message.classList.remove("hidden");
    console.log(message, content);
    message.textContent = content;
  }

  // ok button handler
  okhandler() {
    console.log(this);
    // client side validation
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
    const colDiv = document.createElement("div");
    colDiv.classList.add("col");
    colDiv.id = `col-${this.uniqueId}`;
    console.log(this);
    colDiv.innerHTML =
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
            <p>Waves</p>
          </div>
          <hr class="w-full h-1 mx-auto my-0.5 bg-gray-300 border-0 rounded" />
          <div class="repeat flex justify-between text-base">
            <p>Repeat:</p>
            <p>Everyday</p>
          </div>
          <hr class="w-full h-1 mx-auto my-0.5 bg-gray-300 border-0 rounded" />
          <div class="actions flex justify-between w-100 mt-4">
            <i class="fa-solid fa-toggle-on fa-2xl"></i>
            <i class="fa-solid fa-toggle-off fa-2xl hidden"></i>
            <i class="fa-solid fa-trash fa-lg"></i>
          </div></div>`.trim();
    gridDiv.lastElementChild.before(colDiv);
    this.cancelHandler();

    const updateCountDown = (alarmTime) => {
      const countdownPara = document.querySelector(
        `#col-${this.uniqueId} .count-down`
      );
      const now = new Date();
      const timeRemaining = alarmTime - now;

      if (timeRemaining <= 0) {
        // this.playAudio();
        clearInterval(this.alarmInterval);
        alert("Time's up! Alarm triggered");
        countdownPara.textContent = "00:00:00";
        return;
      }

      const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      countdownPara.textContent = `${hours
        .toString()
        .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    };

    this.alarmInterval = setInterval(
      updateCountDown.bind(this),
      1000,
      alarmTime
    );
    okBtn.removeEventListener("click", okBtnListener);
  }

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
