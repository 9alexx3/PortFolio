const powershell = document.getElementById('powershell');
const powershell_button = document.getElementById('PowerShell-Icon');
const g_chrome = document.getElementById('chrome');
const chrome_Icon = document.getElementById('Google_Chrome');
const calculator = document.getElementById('calculator');
const calculator_Icon = document.getElementById('Calculator-Icon');
powershell_button.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!powershell.classList.contains('show')) {
        powershell.classList.remove('hide');
        powershell.classList.add('show');
    }
});

chrome_Icon.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!g_chrome.classList.contains('show')) {
        g_chrome.classList.remove('hide');
        g_chrome.classList.add('show');
    }
});

calculator_Icon.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!calculator.classList.contains('show')) {
        calculator.classList.remove('hide');
        calculator.classList.add('show');
    }
});
document.addEventListener("click", (e) => {
    if (!e.target.closest("#powershell") && !e.target.closest("#PowerShell-Icon") && powershell.classList.contains('show')) {
        powershell.classList.remove('show');
        powershell.classList.add('hide');
    }

    if (!e.target.closest("#g_chrome") && !e.target.closest("#Google_Chrome") && g_chrome.classList.contains('show')) {
        g_chrome.classList.remove('show');
        g_chrome.classList.add('hide');
    }

    if (!e.target.closest("#calculator") && !e.target.closest("#Calculator-Icon") && g_chrome.classList.contains('show')) {
        calculator.classList.remove('show');
        calculator.classList.add('hide');
    }



});
