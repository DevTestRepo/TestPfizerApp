
function verify(token_id,cmp_name,cookie_name){
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let token = urlParams.get('token')
    
    if(!isRunningStandalone())
    {
        if(token != `${token_id}` && getCookie(`${cookie_name}`) === 0){
            window.location.replace(window.location.origin+"/scanqr.html");
            return;
        }
        else
        {
            window.history.pushState("", "", `${location.pathname}?cmp=${cmp_name}`);
            setCookie(`${cookie_name}`,1,10);
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return 0;
}

function isRunningStandalone() {
    return navigator.standalone || (window.matchMedia('(display-mode: standalone)').matches);
}
