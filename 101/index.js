let inp = document.getElementById("name");
let greet = document.getElementById("greet");

inp.addEventListener("keyup", (ebent) => {
    greet.innerText = "Hello " + `${inp.value}`;
});