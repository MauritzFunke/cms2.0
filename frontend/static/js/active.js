var header = document.getElementById("nav");
var btns = header.getElementsByClassName("nav-link");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("nav-active");
        current[0].className = current[0].className.replace(" nav-active", "");
        this.className += " nav-active";
    });
}
