let currentStep = 0;
let LastStep = 6;
let lastStep = 6;
let bulletStartedFrom = 3;
let bulletCurrentIndex = 1;
let jumbedIndex = 4;

if (getCookie("dose")) {
  console.log("Has a cookie");
  $("body").css("display", "none");
} else {
  $(function () {
    $("#outerStepper").steps({
      headerTag: "h2",
      bodyTag: "section",
      enablePagination: false,
      enableKeyNavigation: false,
      titleTemplate: '<div class="hidden">#title#</div>',
    });
    $("#wizard").steps({
      headerTag: "h2",
      bodyTag: "section",
      enablePagination: false,
      enableKeyNavigation: false,
      titleTemplate: '<div class="hidden">#title#</div>',
    });
    $('[role = "next-alt"]').on("click", function () {
      $("#wizard").steps("next");
    });
    $("#introStepper").steps({
      headerTag: "h2",
      bodyTag: "section",
      enablePagination: false,
      enableKeyNavigation: false,
      titleTemplate: '<div class="hidden">#title#</div>',
    });

    /* Close Loading */
    setTimeout(() => {
      drawDose("genotropinGoQuick");
      setGuard("without");

      document.querySelector("#loadingWindow").classList.add("hidden");
      document.querySelector("#allPages").classList.remove("hidden");
    }, 3500);

    goNext();
    $('[role = "next"]').on("click", wizardNextHandler);
    $('[role = "next"]').on("touchmove", wizardNextHandler);
    $('[role = "outer-next"]').on("click", function () {
      console.log("clicked");
      document.querySelector("body").classList.remove("all-p-0");
      console.log("clicked after remove ");

      $("#outerStepper").steps("next");
      $("#outerStepper-p-1").css("display", "block");
    });
    $('[role = "intro-next"]').on("click", function () {
      goNext();
    });

    function wizardNextHandler() {
      console.log("clicked");
      $("#wizard").steps("next");
      if ($("#wizard").steps("getCurrentIndex") == 1) {
        document.querySelector("body").classList.add("all-p-0");
      } else if (
        $("#wizard").steps("getCurrentIndex") == 1 &&
        $("#introStepper").steps("getCurrentIndex") == 0
      ) {
        document.querySelector("body").classList.remove("all-p-0");
      }
    }

    $.fn.steps.setStep = function (step) {
      var self = $(this);
      var currentIndex = self.steps("getCurrentIndex");
      // Calculates the number of missing steps to get to the desired step
      var missingSteps = Math.abs(step - currentIndex);
      // The method then determines whether to navigate forward or backward to the desired step by checking if the step parameter is greater than the current index
      var direction = step > currentIndex ? "next" : "previous";
      // Move forward or backward by one step each time the loop runs, until it reaches the desired step
      for (var i = 0; i < missingSteps; i++) {
        self.steps(direction);
      }
    };
    $("#skipIntroBtn").on("click", function () {
      if (currentStep == LastStep) {
        setCookieRedirect();
      } else {
        skip();
      }
    });
  });
}
// function setCookie(cname, cvalue, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   let expires = "expires=" + d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// function getCookie(cname) {
//   let name = cname + "=";
//   let decodedCookie = decodeURIComponent(document.cookie);
//   let ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return 0;
// }
function jumb(n) {
  goNext();
  for (let i = 0; i < n; i++) {
    $("#wizard").steps("next");
  }
}
function skip() {
  currentStep = LastStep;
  console.log("currentStep " + currentStep);
  console.log("bulletStartedFrom " + bulletStartedFrom);
  bulletCurrentIndex = jumbedIndex;
  $("#introStepper").steps("setStep", LastStep);
  StepChanged();
}
function goNext() {
  if (currentStep != LastStep) {
    $("#introStepper").steps("next");
    currentStep++;
    if (currentStep > bulletStartedFrom) bulletCurrentIndex++;
    StepChanged();
  }
}
function goBack() {
  if (currentStep != 0) {
    $("#introStepper").steps("previous");
    currentStep--;
    if (currentStep >= bulletStartedFrom) bulletCurrentIndex--;
    StepChanged();
  }
}
//search in devices by value
function searchDevices(value) {
  console.log("searching for " + value);
  let result = [];
  for (let i = 0; i < dosageByDevice.length; i++) {
    if (dosageByDevice[i].value === value) {
      result = dosageByDevice[i];
    }
  }
  return result;
}
//drow doesage based on device
function drawDose(device) {
  console.log("device " + device);
  let doses = searchDevices(device);
  console.log("doses");
  console.log(doses);
  $("#dosesContainer").empty();
  for (let i = 0; i < doses.doses.length; i++) {
    console.log(doses.doses[i].label);
    $("#dosesContainer").append(
      `   <section
    onclick="setDose('${doses.doses[i].dose}')"
    class="selection flex items-center"
    role="intro-next"

  >
    <img class="mr-4" src="./assets/icons/pen-icon.svg" alt="" />
    <p class="text-xl bold-family">${doses.doses[i].label}</p>
  </section>`
    );
    setTimeout(() => {
      resetNextStepper();
    }, 100);
  }
}
function resetNextStepper() {
  $('[role = "intro-next"]').unbind("click");
  $('[role = "intro-next"]').on("click", function () {
    goNext();
  });
}

function StepChanged() {
  $("#currentStepNumber").text(currentStep);
  $("#lastStep").text(lastStep);
  $("#lasstStep").text(lastStep);
  $("#currentStepLabel").text(labels[currentStep - 1]);
  $("#nextStepNumber").text(currentStep + 1);
  $("#nextStepLabel").text(labels[currentStep]);
  let bullets = document.querySelectorAll(".bullet");
  bullets.forEach((b) => {
    b.classList.remove("selected");
  });
  console.log("new step");
  console.log("currentStep " + currentStep);

  if (currentStep == bulletStartedFrom) {
    console.log("bulletCurrentIndex", bulletCurrentIndex);
    bullets[bulletCurrentIndex].classList.add("selected");
    // bulletCurrentIndex++;
  } else if (bulletCurrentIndex < bullets.length && bulletCurrentIndex > 1) {
    bullets[bulletCurrentIndex].classList.add("selected");
    // bulletCurrentIndex++;
  }

  if (currentStep == LastStep) {
    $("#nav2").css("display", "none");
    $("#skipIntroBtn").text("Finish ");
    $("#skipIntroBtn").append(
      '<span><img src="./assets/icons/Arrow.svg" class="inline" alt=""></span>'
    );
  } else {
    $("#nav2").css("display", "flex");
    $("#skipIntroBtn").text("Skip intro ");
    $("#skipIntroBtn").append(
      '<span><img src="./assets/icons/Arrow.svg" class="inline" alt=""></span>'
    );
  }

  if (currentStep < bulletStartedFrom) {
    $("#Footer").css("display", "none");
  } else {
    $("#Footer").css("display", "block");
  }
}
let labels = [
  "Select the device",
  "Select the device",
  "Follow the guide",
  "View injection site",
  "Use the device",
  "Find notes and tips",
];
let dosageByDevice = [
  {
    label: "Genotropin Pen",
    value: "genotropinPen",
    doses: [
      {
        label: "5mg",
        dose: "5",
      },
      {
        label: "5.3mg",
        dose: "5.3",
      },
      {
        label: "12mg",
        dose: "12",
      },
    ],
  },
  {
    label: "Genotropin GoQuick",
    value: "genotropinGoQuick",
    doses: [
      {
        label: "5.3mg",
        dose: "5.3",
      },
      {
        label: "12mg",
        dose: "12",
      },
    ],
  },
  {
    label: "Genotropin MiniQuick",
    value: "genotropinMiniQuick",
    //doses from 0.2 to 2mg
    doses: [
      {
        label: "0.2mg",
        dose: "0.2mg",
      },
      {
        label: "0.4mg",
        dose: "0.4mg",
      },
      {
        label: "0.6mg",
        dose: "0.6mg",
      },
      {
        label: "0.8mg",
        dose: "0.8mg",
      },
      {
        label: "1.0mg",
        dose: "1.0mg",
      },
      {
        label: "1.2mg",
        dose: "1.2mg",
      },
      {
        label: "1.4mg",
        dose: "1.4mg",
      },
      {
        label: "1.6mg",
        dose: "1.6mg",
      },
      {
        label: "1.8mg",
        dose: "1.8mg",
      },
      {
        label: "2mg",
        dose: "2mg",
      },
    ],
  },
];


function setCookieRedirect() {
  console.log("setCookie function is being called!");
  const exdays = 1;
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  let url;
  // if(guard=='genotropinGoQuick' || guard == 'genotropinPen'){
  if (guardian) {
    url = `/app/index.html`;
  } else {
    url = `/index.html`;
  }

  url = url.replaceAll(" ", "_").toLocaleLowerCase();
  let cookie = {
    lang: local,
    url: url,
  };
  // document.cookie = "withNeedle =" + withNeedle + ";" + expires + ";path=/";
    document.cookie = "doseGeno =" + dose + ";" + expires + ";path=/";
  document.cookie = "deviceType =" + deviceType + ";" + expires + ";path=/";
  document.cookie = "local =" + local + ";" + expires + ";path=/";
  document.cookie = "guardian =" + guardian + ";" + expires + ";path=/";
  // document.cookie = "usefor =" + usefor + ";" + expires + ";path=/";
  document.cookie = "url =" + url + ";" + expires + ";path=/";
  document.cookie =
    "experienceTypeGeno =" + experienceType + ";" + expires + ";path=/";

    document.location.href = urlBase + url;
  console.log(urlBase + url);

  console.log("cookie fired with values:", {
    dose,
    deviceType,
    local,
    guardian,
    experienceType,
  });
}