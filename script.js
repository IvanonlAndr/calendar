const prevButton = document.querySelector('button.prev')
const nextButton = document.querySelector('button.next')
const monthElement = document.querySelector('.month')
const dateNumberElements = [...document.querySelectorAll('.date__number')]
// console.log(dateNumberElements)
const now = new Date()
console.log(now)
let currentMonth = now.getMonth();
console.log(currentMonth)
let currentYear = now.getFullYear();
console.log(currentYear)

const monthIndexToName = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
}

prevButton.addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11
        currentYear--
    } else {
        currentMonth--
    }
    renderMonth(currentMonth, currentYear)
})
nextButton.addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0
        currentYear++
    } else {
        currentMonth++
    }
    renderMonth(currentMonth, currentYear)
})

const renderMonth = (monthIndex, year) => {
    const numDaysInMonth = new Date(year, monthIndex + 1, 0).getDate()
    console.log(numDaysInMonth)
    const firstDate = new Date(year, monthIndex)
    console.log(firstDate)
    const firstDay = firstDate.getDay()
    console.log(firstDay)

    monthElement.innerText = `${monthIndexToName[monthIndex]} / ${year}`

    dateNumberElements.forEach((element, i) => {
        const dateNumber = (i + 1) - firstDay
        console.log(dateNumber)
        element.innerText = dateNumber > 0 && dateNumber <= numDaysInMonth ? dateNumber : '';
        const today = new Date();
        // console.log(today)
        if (today.getMonth() === monthIndex && today.getFullYear() === year && today.getDate() === (i + 1) - firstDay) {
            element.classList.add('today');
            element.addEventListener('click', function () {
                let info = document.createElement('div')
                info.classList.add('info')
                element.append(info)
                let infoText1 = document.createElement('p')
                infoText1.classList.add('text1')
                info.append(infoText1)
                let infoText2 = document.createElement('p')
                infoText1.classList.add('text1')
                info.append(infoText2)
                let infos = [...document.querySelectorAll('.info')]
                setTimeout(()=>info.remove(),3000)
                if(infos.length > 1){
                    info.remove()
                }
                function getTimeRemaining(endtime) {
                    var t = Date.parse(endtime) - Date.parse(new Date());
                    var minutes = Math.floor((t / 1000 / 60) % 60);
                    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                    return {
                        'total': t,
                        'hours': hours,
                        'minutes': minutes,
                    };
                }
                
                function initializeClock(id, endtime) {
                
                    function updateClock() {
                        let t = getTimeRemaining(endtime);
                        
                        infoText1.innerHTML = ('0' + t.hours).slice(-2);
                        infoText2.innerHTML = ('0' + t.minutes).slice(-2);

                        info.innerHTML = `${infoText1.innerHTML} : ${infoText2.innerHTML} untill next day`

                        if (t.total <= 0) {
                            clearInterval(timeinterval);
                        }
                    }
                
                    updateClock();
                    // var timeinterval = setInterval(updateClock, 1000);
                }
                let day = new Date()
                let nextDay = new Date(day)
                nextDay.setDate(day.getDate() + 1)
                nextDay.setHours(0)
                nextDay.setMinutes(0)
                nextDay.setSeconds(0)
                console.log(nextDay)
                var deadline = nextDay;
                initializeClock('countdown', deadline);
            })
        } else {
            element.classList.remove('today');
        }

    });


}
renderMonth(currentMonth, currentYear)