console.log("what is up!");
function validateForm() {
    console.log("hello")
    var x = document.forms["myForm"]["username"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}
