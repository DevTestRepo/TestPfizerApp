var deferredPrompt;
window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    showAddToHomeScreen()
});

function showAddToHomeScreen() {
    var a2hsBtn = document.querySelector(".ad2hs-prompt");
    var a2hsBtnContainer = document.querySelector(".ad2hs-prompt-container");
    if (!window.matchMedia('(display-mode: standalone)').matches) {
        if (typeof $.cookie('app-installed') === 'undefined') {
            if (typeof $.cookie('not-now') === 'undefined') {
                a2hsBtn.style.display = "block";
                a2hsBtnContainer.style.display = "block";
                a2hsBtn.addEventListener("click", addToHomeScreen)
            } else {}
        }
    }
}

function addToHomeScreen() {
    var a2hsBtn = document.querySelector(".ad2hs-prompt");
    var a2hsBtnContainer = document.querySelector(".ad2hs-prompt-container");
    a2hsBtn.style.display = 'none';
    a2hsBtnContainer.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
        } else {
            console.log('User dismissed the A2HS prompt')
        }
        deferredPrompt = null
    })
}
$('#ad2hs-prompt-close-2').click(function() {
    console.log("ttt");
    var a2hsBtn = document.querySelector(".ad2hs-prompt");
    var a2hsBtnContainer = document.querySelector(".ad2hs-prompt-container");
    a2hsBtn.style.display = 'none';
    a2hsBtnContainer.style.display = 'none';
    $.cookie("not-now", 1, {
        expires: 7
    })
})
$('#ad2hs-prompt-close').on('click', function() {
    var a2hsBtn = document.querySelector(".ad2hs-prompt");
    var a2hsBtnContainer = document.querySelector(".ad2hs-prompt-container");
    a2hsBtn.style.display = 'none';
    a2hsBtnContainer.style.display = 'none';
    $.cookie("not-now", 1, {
        expires: 7
    })
})
var isIos = !1;
var browser = '';
var standalone = !1;
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf('ipad') != -1 || ua.indexOf('iphone') != -1 || ua.indexOf('ipod') != -1 ||  ua.indexOf('macintosh') != -1) {
    isIos = !0
    $(".andriod").css("display","none");
} else {
    $(".andriod").css("display","flex");
    $(".ios").css("display","none");
}

if (ua.indexOf('safari') != -1) {
    if (ua.indexOf('chrome') > -1) {
        browser = 'chrome'
    } else {
        browser = 'safari'
    }
}
if (("standalone" in window.navigator) && !window.navigator.standalone) {
    standalone = !0
}

if (isIos && standalone) {
    if (navigator.onLine) {
        if (typeof $.cookie('app-installed') === 'undefined') {
            if (typeof $.cookie('not-now-ios') === 'undefined') {
                $('.ios-prompt-install').addClass('show')
            }
        }
    }
}
$('#close-ios-prompt-2').on('click', function() {
    $('.ios-prompt-install').removeClass('show');
    $.cookie("not-now-ios", 1, {
        expires: 7
    })
})
$('#close-ios-prompt').on('click', function() {
    $('.ios-prompt-install').removeClass('show');
    $.cookie("not-now-ios", 1, {
        expires: 7
    })
})

function isInstalled() {
    if (navigator.standalone) {
        return !0
    }
    if (window.navigator.standalone) {
        return !0
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
        return !0
    }
    if (new URL(window.location).searchParams.has('homescreen')) {
        return !0
    }
    return !1
}
if (isInstalled()) {
    var date = new Date();
    date.setTime(date.getTime() + 8760 * 60 * 60 * 1000);
    $.cookie('app-installed', 'true', {
        expires: date
    });
    $('.ios-prompt-install').removeClass('show');
    var iosPropt = document.querySelector(".ios-prompt-install");
    var iosPwaEnabled = document.querySelector(".ios-mobile-pwa-enabled");
    iosPropt.classList.remove("mystyle");
    iosPropt.style.display = 'none';
    iosPwaEnabled.style.display = "block";

    $(document).on('click', '#lang', function() {
        $("#skip-btn").click();
    });
}
if (typeof $.cookie('app-installed') === 'undefined') {} else {
    $('.ios-prompt-install').removeClass('show')
}
if (navigator.onLine) {} else {
    var noConnection = document.querySelector(".ad2hs-prompt-container");
    var a2hsBtnContainer = document.querySelector(".ad2hs-prompt-container");
    var iosPropt = document.querySelector(".ios-prompt-install");
    noConnection.style.display = "none";
    a2hsBtnContainer.style.display = 'none';
    iosPropt.style.display = 'none'
}