const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
    item.onclick = () => {
        if (item.id === "clear") {
            display.innerHTML = " ";
        } else if (item.id === "backspace") {
            let string = display.innerText.toString();
            display.innerHTML = string.substr(0, string.length - 1);
        } else if (display.innerHTML != " " && item.id === "equal") {
            display.innerHTML = eval(display.innerHTML);
        } else if (display.innerHTML == "" && item.id === "equal") {
            display.innerHTML = "Empty!";
            setTimeout(() => (display.innerHTML = " "), 2000);
        } else {
            display.innerHTML += item.id;
        }
    };
});

const themeTogglerBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");

let isDark = true;
themeTogglerBtn.onclick = () => {
    calculator.classList.toggle("dark");
    themeTogglerBtn.classList.toggle("active");
    isDark = !isDark;
};
