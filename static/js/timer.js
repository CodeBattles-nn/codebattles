let date = new Date("2023-05-27 18:30  GMT+0300");
// alert(date);

function battle_not_started(h, m) {
    return !(h < 0 || m < 0);

}

function main() {
    let now = new Date();
    let left_time_elem = document.getElementById("12345");
    let start_btn = document.getElementById("123456");
    let state_html = document.getElementById("1234567");

    let different = (date - now);

    let hours = date.getUTCHours() - now.getUTCHours()
    let minutes = date.getUTCMinutes() - now.getUTCMinutes() - 1;
    let seconds = 60 - Math.abs(date.getUTCSeconds() - now.getUTCSeconds());
    let result = hours + ':' + minutes + ":" + seconds;

    //console.log(result);

    if (battle_not_started(hours, minutes)) {
        left_time_elem.innerHTML = "До начала " + result;
    } else {
        left_time_elem.innerHTML = "";
        start_btn.disabled = false;
        state_html.innerHTML = "началось";
    }


}
setTimeout(main, 1);
setTimeout(() => setInterval(main, 500), 500);
