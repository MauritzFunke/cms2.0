var UUID;
var ID;
function addKey() {
    var name = document.getElementById("keyName").value;
    var description = document.getElementById("keyDescription").value;
    var type = document.getElementById("keyType").value;
    console.log(type);
    if(name === "" || description === "" || type === "") {
        var error = document.getElementById("apiError");
        error.innerHTML += "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Error when generating key!</strong> You should fill in all required fields.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>"
    } else {
        window.location.replace("http://localhost:3001/addKey?name="+name+"&description="+description+"&type="+type);
        //alert("http://localhost:3001/addKey?name="+name+"&description="+description+"&type="+type);
    }
}
function addUUID(uuid) {
    UUID=uuid
}
function removeKey() {
    window.location.replace("http://localhost:3001/removeKey?key="+UUID);
}
function addTask() {
    var name = document.getElementById("taskName").value;
    var description = document.getElementById("taskDescription").value;
    var time = document.getElementById("taskTime").value;
    var func = document.getElementById("taskFunc").value;
    var args = document.getElementById("taskArgs").value;
    if(name === "" || description === "" || time === "" || func === "" || description === "") {
        var error = document.getElementById("apiError");
        error.innerHTML += "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\"><strong>Error when generating task!</strong> You should fill in all required fields.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>"
    } else {
        if(args == "") {
            window.location.replace("http://localhost:3001/addTask?name="+name+"&description="+description+"&time"+time+"&func"+func);
        }
        window.location.replace("http://localhost:3001/addTask?name="+name+"&description="+description+"&time"+time+"&func"+func+"&args"+args);
    }
}
function addID(id) {
    ID=id
}
function removeTask() {
    window.location.replace("http://localhost:3001/removeTask?id="+ID);
}