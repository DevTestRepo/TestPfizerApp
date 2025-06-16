let local = "en";
function __(text) {
    let t = locales["en"][text];
    return t ? t : text;
}



const locales = {
    "en": {
        "Select language": "Select language",
        "Select": "Select",
        "your language": "your language",
        "Save the app": "Save the app",
        "to your login screen": "to your login screen",
        "Select the pen": "Select the pen",
        "by type": "by type",
        "Select the dos": "Select the dos",
        "Follow the guide": "Follow the guide",
        "To inject correctly": "To inject correctly",
        "I Speak English": "I Speak English",
        "Choose English language": "Choose English language",
        "Saya cakap melayu": "Saya cakap melayu",
        "Pilih bahasa Malaysia": "Pilih bahasa Malaysia",
        "Tap on the share button at the bottom of the screen": "Tap on the share button at the bottom of the screen",
        "Tap on the 'Add to home screen' option": "Tap on the \"Add to home screen\" option",
        "Tap the 'Add' button at the top of the screen": "Tap the \"Add\" button at the top of the screen",
        "step4Text": "Let the Virtual Nurse guide you through the exact steps to inject your medication safely.",
        "step5Text": "Choose your injection site every day and learn about different areas to avoid injection in the same spot every day.",
        "step6Text": "If you start to use a new device, you can  easily change your device to another one.",
        "step7Text": "Read our detailed device guideline to learn more about the device and how to use it correcly.",

    },
    "ar": {
        "Select language": "اختيار اللغة",
        "Select": "أختر",
        "your language": "لغتك",
        "Save the app": "قم بحفظ التطبيق",
        "to your login screen": "الي نافذة دخولك",
        "Select the pen": "قم باختيار الحقنه",
        "by type": "by type",
        "Select the dos": "Select the dos",
        "Follow the guide": "Follow the guide",
        "To inject correctly": "To inject correctly",
        "I Speak English": "I Speak English",
        "Choose English language": "Choose English language",
        "Saya cakap melayu": "Saya cakap melayu",
        "Pilih bahasa Malaysia": "Pilih bahasa Malaysia",
        "Tap on the share button at the bottom of the screen": "Tap on the share button at the bottom of the screen",
        "Tap on the 'Add to home screen' option": "Tap on the \"Add to home screen\" option",
        "Tap the 'Add' button at the top of the screen": "Tap the \"Add\" button at the top of the screen",
        "step4Text": "Read our detailed device guideline to learn more about the pen and how to use it correcly.",

    }
};



function setLocals(){
    let nodes = document.querySelectorAll('[word]');
    nodes.forEach(node => {
        let word = node.getAttribute("word");
        node.innerHTML = __(word);
    });

}

setLocals();

