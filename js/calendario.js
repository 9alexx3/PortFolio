const getDateHover = () => {
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.addEventListener('click', function() {
            days.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}

const getMonthName = (month) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[month - 1];
}

const generateCalendar = (month, year) => {
    const calendarDays = document.getElementById('calendarDays');
    const currentMonthYear = document.querySelector('.calendar-date-short');
    calendarDays.innerHTML = '';
    currentMonthYear.textContent = `${getMonthName(month)} ${year}`;

    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
    const startingDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
    const daysInMonth = getDaysInMonth(month, year);
    const totalCellsNeeded = 42;

    for (let i = 0; i < startingDay; i++) {
        const prevMonthDays = document.createElement('li');
        prevMonthDays.classList.add('day', 'extra-day');
        prevMonthDays.textContent = getDaysInMonth(month - 1, year) - (startingDay - 1) + i;
        calendarDays.appendChild(prevMonthDays);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const currentMonthDays = document.createElement('li');
        currentMonthDays.classList.add('day');
        if (currentDate.getMonth() + 1 === currentMonth && currentDate.getFullYear() === currentYear && currentDay === i) {
            currentMonthDays.classList.add('today');
        }
        currentMonthDays.textContent = i;
        calendarDays.appendChild(currentMonthDays);
    }

    const totalDaysDisplayed = startingDay + daysInMonth;
    const remainingCells = totalCellsNeeded - totalDaysDisplayed;
    for (let i = 0; i < remainingCells; i++) {
        const nextMonthDays = document.createElement('li');
        nextMonthDays.classList.add('day', 'extra-day');
        nextMonthDays.textContent = i + 1;
        calendarDays.appendChild(nextMonthDays);
    }

    getDateHover(); // Asegúrate de agregar el evento hover después de generar los días
}

const currentDate = new Date();
const currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();

generateCalendar(currentMonth, currentYear);

document.getElementById('prevMonth').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth === 0) {
        currentMonth = 12;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear); // Regenera el calendario al ir al mes anterior
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth === 13) {
        currentMonth = 1;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear); // Regenera el calendario al ir al mes siguiente
});

let isCollapsed = false;
const calendar_toggle = document.getElementById('toggleCalendar');
calendar_toggle.addEventListener('click', function() {
    const calendar = document.querySelector('.calendar');
    const calendarHeaderTop = document.querySelector('.calendar-header-top');
    const otherSections = document.querySelectorAll('.calendar-header:not(.calendar-header-top), .weekdays-list, .days');

    isCollapsed = !isCollapsed;

    if (isCollapsed) {
        calendar.classList.add('collapsed');
        otherSections.forEach(section => section.classList.add('hidden-content'));
    } else {
        calendar.classList.remove('collapsed');
        otherSections.forEach(section => section.classList.remove('hidden-content'));
        generateCalendar(currentMonth, currentYear); // Regenera el calendario al expandir
    }

    calendar_toggle.classList.toggle('rotate-180');
});
