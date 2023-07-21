const addNewBtn = document.querySelectorAll(".add-new-alarm");

// Modal opening and closing logic
const modalDialog = document.querySelector("#dialog");
const modalCloseBtn = document.querySelector("#close");
const overlay = document.querySelector("#overlay");

// the id for alarms
let id = 1;
const countdownContainer = document.querySelector(".count-down");

addNewBtn.forEach((val) =>
  val.addEventListener("click", () => {
    console.log("creating new alarm");

    const alarm = new AlarmElement();
    alarm.handle();
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

class AlarmElement {
  constructor() {
    openModal();
    this.id = id++;
    this.isOn = true;
    this.soundName = "first";
    this.alarmInterval;
    this.timeRemaining;
  }
  okhandler() {
    const hours = document.querySelector("#hours");
    const minutes = document.querySelector("#minutes");
    const soundName = document.querySelector("#sound-select");

    const am = document.querySelector("#AM");
    const pm = document.querySelector("#PM");

    console.log("AM", am.checked);
    console.log("PM", pm.checked);
    if (am.checked === pm.checked) {
      const message = document.querySelector(".error");
      message.classList.remove("hidden");
      message.textContent = `Please select ${
        am.checked === false ? "at least am or pm" : "at most one of am or pm"
      }`;

      return;
    }
    // createNewAlarmHTMLElement();
    hours.value = 0;
    minutes.value = 0;
    am.checked = false;
    pm.checked = false;
    closeModal();
  }
  cancelHandler() {
    closeModal();
  }
  handle() {
    const okBtn = document.querySelector("#ok");
    const cancelBtn = document.querySelector("#close");
    okBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.okhandler();
    });
    cancelBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.cancelHandler();
    });
  }
}
