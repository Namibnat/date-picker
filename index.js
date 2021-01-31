/* Date picker js */

const moveBackMonth = document.querySelector('.date-picker-month-go-back');
const moveForwardMonth = document.querySelector('.date-picker-month-go-forward');
const dayNamesTable = document.querySelector('.date-picker-table');
const dayInputText = document.querySelector('.date-picker-space');
const datePickerBlock = document.querySelector('.date-picker-block');
const datePickerWrapper = document.querySelector('.date-picker-wrapper');

const monthNames = ['January', 'February', 'March', 'April',
				'May', 'June', 'July', 'August', 'September',
				'October', 'November', 'December']

let fillDays = [];

function fillMonthName(date) {
				const monthHolder = document.querySelector('.date-picker-month-holder');
				monthHolder.innerHTML = monthNames[date.getMonth()];
}

function fillYear(date) {
				const yearHolder = document.querySelector('.date-picker-year-holder');
				yearHolder.innerHTML = date.getFullYear();
}

function numDaysInMonth(date) {
				return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
}

function fillMonth(date) {
				let _date = new Date(date.getTime());
				let eachDayInMonth = [];
				const total = numDaysInMonth(_date);
				for (let i = 1; i <= total; i++) {
								_date.setDate(i);
								eachDayInMonth.push({
												day: i,
												month: 'current',
												weekday: _date.getDay(),
												dateValue: _date.getDate() + " " + (_date.getMonth() + 1) + " " + _date.getFullYear(),
								});
				}
				return eachDayInMonth; 
}

function fillToStartDate(date) {
				/**
				 * Add the days from the previous month
				 * until we have a Monday as our first date
				 */
				let _date = new Date(date.getTime());
				let daysInOldMonth = [];
				_date.setMonth(_date.getMonth() - 1)
				_date.setDate(numDaysInMonth(_date));
				while (_date.getDay() !== 0) {
								daysInOldMonth.unshift({
												day: _date.getDate(),
												month: 'previous',
												weekday: _date.getDay(),
								});
								_date.setDate(_date.getDate() - 1);
				}
				return daysInOldMonth;
}
function fillToEndDate(date) {
				/**
				 * Add the days from the previous month
				 * until we have a Monday as our first date
				 */
				let _date = new Date(date.getTime());
				let daysInNextMonth = [];
				_date.setMonth(_date.getMonth() + 1)
				_date.setDate(1);
				while (_date.getDay() !== 1) {
								daysInNextMonth.push({
												day: _date.getDate(),
												month: 'previous',
												weekday: _date.getDay(),
								});
								_date.setDate(_date.getDate() + 1);
				}
				return daysInNextMonth;
}

function fillInDays() {
				let tableNodes = dayNamesTable.querySelectorAll('.date-picker-table-rows');
				for (let node of tableNodes) {
								node.remove();
				}
				for (let dayItem of fillDays) {
								if (dayItem.weekday === 1) {
												dateRow = document.createElement('tr');
												dateRow.setAttribute('class', 'date-picker-table-rows');
												dayNamesTable.appendChild(dateRow);
								}
								dayNumberBlock = document.createElement('td');
								if (dayItem.month === 'current') {
												let anchorNode = document.createElement('a');
												anchorNode.innerHTML = dayItem.day;
												dayNumberBlock.appendChild(anchorNode);
												dayNumberBlock.setAttribute('class', 'date-picker-current');
								} else {
												dayNumberBlock.innerHTML = dayItem.day;
								}
								dateRow.appendChild(dayNumberBlock);
				}
}


function fillDatePicker(date) {
				/**
				 * Fill the contents of the date picker
				 * 
				 * Based on the month of the 'date' argument
				 */
				let _date = new Date(date.getTime());
				fillMonthName(_date);
				fillYear(_date);
				fillDays = [...fillToStartDate(_date), ...fillMonth(_date), ...fillToEndDate(_date)];
				fillInDays();
				document.querySelectorAll('.date-picker-current').forEach(item => {
								item.addEventListener('click', event => {
																const found = fillDays.find(element => element.day === parseInt(item.innerText));
																dayInputText.value = found.dateValue;
																				datePickerBlock.style.display = 'none';
								});
				});
}

let workingDate = new Date(Date.now());
fillDatePicker(workingDate);

dayInputText.addEventListener('focus', () => {
								datePickerBlock.style.display = 'block';
});

moveBackMonth.addEventListener('click', () => {
				workingDate.setDate(1);  // Ensure we don't overrun date on short months
				workingDate.setMonth(workingDate.getMonth() - 1);
				fillDatePicker(workingDate);
});

moveForwardMonth.addEventListener('click', () => {
				workingDate.setDate(1);  // Ensure we don't overrun date on short months
				workingDate.setMonth(workingDate.getMonth() + 1);
				fillDatePicker(workingDate);
});

