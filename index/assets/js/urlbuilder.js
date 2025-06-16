let deviceType = "genotropinGoQuick";
let urlBase = window.location.origin;
let withNeedle;
let dose;
let guard;
let usefor;
let guardian = false;
let experienceType = "RoutineUseGoQuick";

function setDose(dos) {
  dose = dos;
}
function setLocal(l = "en") {
  local = l;
}
function setExperienceType(l = "RoutineUseGoQuick") {
  experienceType = l;
}

function selectAllFlow() {
  setLocal("en");

  setDeviceType("genotropinGoQuick");
  setGuard("guardian");
}
function setDeviceType(l = "genotropinGoQuick") {
  deviceType = l;
  if (l == "genotropinGoQuick") {
    $("#introStepper-p-2").remove();
    $("#introStepper-p-3").css({ display: "block" });
    bulletStartedFrom = 5;
    jumbedIndex = 5;
  } else if (l == "genotropinPen") {
    $("#introStepper-p-3").remove();
    $("#introStepper-p-5").remove();
    $("#introStepper-p-2").css({ display: "block" });
    bulletStartedFrom = 4;
    jumbedIndex = 5;

    lastStep--;
    LastStep--;
  } else {
    $("#introStepper-p-3").remove();
    $("#introStepper-p-2").remove();
    $("#introStepper-p-5").remove();

    bulletStartedFrom = 3;
    jumbedIndex = 5;

    lastStep -= 2;
    LastStep -= 2;
    // lables.splice(4,1);
  }
  drawDose(l);
}
function setGuard(l) {
  console.log("setGuard " + l);
  guardian = l;
}
// function setWithNeedle(l) {
//   withNeedle = l;
// }
// function setUsingGoQuick(l){
//     usefor = l;
// }
