var UUID;
function addKey() {
    alert("NewKey");
}
function addUUID(uuid) {
    UUID=uuid
}
function removeKey() {
    window.location.replace("http://localhost:3001/removeKey?key="+UUID);
}