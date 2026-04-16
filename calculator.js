let expression = "";
let historyList;
let operators = ['+', '-', '*', '/', '%'];

/* ================= FIX: DOM LOAD ================= */
window.onload = () => {
    historyList = document.getElementById("historyList");
};

/* ================= DISPLAY ================= */
function updateDisplay() {
    document.getElementById("expression").innerText = expression;

    try {
        let temp = expression;

        while (operators.includes(temp.slice(-1))) {
            temp = temp.slice(0, -1);
        }

        document.getElementById("result").innerText =
            temp ? eval(temp) : "0";

        // Auto scroll
        let expBox = document.getElementById("expression");
        expBox.scrollLeft = expBox.scrollWidth;

    } catch {
        document.getElementById("result").innerText = "0";
    }
}

/* ================= APPEND ================= */
function append(val) {
    let last = expression.slice(-1);

    if (expression === "" && operators.includes(val)) return;

    if (operators.includes(last) && operators.includes(val)) {
        expression = expression.slice(0, -1) + val;
    } else {
        expression += val;
    }

    updateDisplay();
}

/* ================= CLEAR ================= */
function clearAll() {
    expression = "";
    updateDisplay();
}

/* ================= DELETE ================= */
function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

/* ================= CALCULATE ================= */
function calculate() {
    try {
        let temp = expression;

        // Square logic
        if (temp.endsWith('*')) {
            temp = temp.slice(0, -1);
            let result = eval(temp);
            result = result * result;

            addHistory(temp + "² = " + result);

            expression = result.toString();
            updateDisplay();
            return;
        }

        while (operators.includes(temp.slice(-1))) {
            temp = temp.slice(0, -1);
        }

        if (temp === "") return;

        let result = eval(temp);

        addHistory(temp + " = " + result);

        expression = result.toString();
        updateDisplay();

    } catch {
        updateDisplay();
    }
}

/* ================= HISTORY ================= */
function addHistory(item) {
    let li = document.createElement("li");
    li.textContent = item;

    li.onclick = () => {
        expression = item.split(" = ")[0];
        updateDisplay();
    };

    historyList.prepend(li);
}

function clearHistory() {
    historyList.innerHTML = "";
}

function toggleHistory() {
    document.getElementById("historyBox").classList.toggle("active");
}

/* ================= THEME ================= */
function toggleTheme() {
    document.body.classList.toggle("light");
}

/* ================= SCIENTIFIC ================= */
function square() {
    let val = eval(expression || "0");
    expression = (val * val).toString();
    updateDisplay();
}

function sqrt() {
    let val = eval(expression || "0");
    expression = Math.sqrt(val).toString();
    updateDisplay();
}

function sin() {
    let val = eval(expression || "0");
    expression = Math.sin(val).toString();
    updateDisplay();
}

function cos() {
    let val = eval(expression || "0");
    expression = Math.cos(val).toString();
    updateDisplay();
}

/* ================= KEYBOARD ================= */
document.addEventListener("keydown", function(e) {

    if (!isNaN(e.key)) append(e.key);
    else if (operators.includes(e.key)) append(e.key);
    else if (e.key === '.') append('.');
    else if (e.key === "Enter") calculate();
    else if (e.key === "Backspace") deleteLast();
    else if (e.key === "Escape") clearAll();

});

/* ================= RIPPLE (FIXED POSITION) ================= */
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", function(e) {

        const ripple = document.createElement("span");
        ripple.classList.add("ripple");

        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);

        ripple.style.width = ripple.style.height = size + "px";

        ripple.style.left = e.clientX - rect.left - size / 2 + "px";
        ripple.style.top = e.clientY - rect.top - size / 2 + "px";

        btn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 500);

    });
});