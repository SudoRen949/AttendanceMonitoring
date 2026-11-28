const url = "https://amsys-3.vercel.app/api";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // used for alphabetical ordering

async function getDatas()
{
	const response = await fetch(`${ url }/zQRInformation`);
	if ( !response.ok ) return;
	const data = await response.text();
	if ( data.length == 0 ) return;
	// student lists
	const newData = data.split(',');
	const rows = document.getElementById("page-rows");
	rows.innerText = "";
	document.getElementById('office').innerText = newData[newData.length-3];
	document.getElementById('subject').innerText = newData[newData.length-2] + ` ${newData[newData.length-1].split('|')[newData[newData.length-1].split('|').length-1]}`;
	newData[newData.length-1].split('|').forEach((a, i) => {
		if ( i % 2 != 0 || i == 6 ) return;
		document.getElementById('schedule').innerText += `${a},`;
	});
	// document.getElementById('course').innerText = newData[newData.length-5].split('_')[0];
	document.getElementById('building').innerText = newData[newData.length-1].split('|')[1].split(' ')[1].replaceAll('_','-');
	for ( let i = 0; i < letters.length; ++i ) {
		for ( let j = 0; j < newData.length-5; ++j ) {
			const ids = newData[j].split('-');
			if (ids[0][0] != letters[i] || rows.textContent.includes(ids[0]) ) continue;
			// adds cells for the index no, student name, and the course & year
			rows.innerHTML += `
				<tr id="s-${ j + 1 }">
					<td>${ j + 1 }</td>
					<td>${ ids[0].replaceAll("_", " ") }</td>
					<td>${ newData[newData.length-5] }</td>
				</tr>
			`;
			// adds empty cells for the attendance markings
			for ( let k = 0; k < 10; ++k ) {
				document.getElementById(`s-${j+1}`).innerHTML += `<td id="a-${j+1}${k+1}"></td>`;
			}
		}
	}
	// date rows
	const dateRow = document.getElementById("dateRow");
	const dateResponse = await fetch(`${ url }/zAttendance`);
	if ( !dateResponse.ok ) return;
	const dateData = await dateResponse.json();
	if ( Object.keys(dateData).length == 0 ) return;
	const allDateList = Object.keys(dateData);
	let dateCounter = 0, dateList = [];
	// adds the 10 latest dates
	for ( let i = allDateList.length; i >= 0; --i ) {
		if ( dateCounter < 10 ) dateList.unshift(allDateList[i]);
		else break;
		dateCounter++;
	}
	// and put it to the cells
	dateList.forEach((date, index) => {
		if ( date == undefined ) return;
		const dateRowValue = document.getElementById(`date-${index}`);
		dateRowValue.innerText = date;
	});
}

getDatas();

// function addBlankRows(elementId, count) {
// 	const tbody = document.getElementById(elementId);
// 	for (let i = 0; i < count; i++) {
// 		const row = document.createElement("tr");
// 		for (let column = 0; column < 13; column++) {
// 			row.appendChild(document.createElement("td"));
// 		}
// 		tbody.appendChild(row);
// 	}
// }

// addBlankRows("page-rows", 20);
// addBlankRows("page-two-rows", 17);
