const url = "https://amsys-3.vercel.app/api";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function getDatas()
{
	const response = await fetch(`${ url }/zQRInformation`);
	if ( !response.ok ) return;
	const data = await response.text();
	if ( data.length == 0 ) return;
	// console.log(data);
	const newData = data.split(',');
	const rows = document.getElementById("pageRows");
	rows.innerText = "";
	for ( let i = 0; i < letters.length; ++i ) {
		for ( let j = 0; j < newData.length; ++j ) {
			const ids = newData[j].split('-');
			document.getElementById('office').innerText = ids[ids.length-5];
			document.getElementById('subject').innerText = ids[ids.length-4];
			document.getElementById('schedule').innerText = ids[ids.length-2];
			document.getElementById('course').innerText = ids[ids.length-6].split('_')[0];
			const courseAndYear = ids[ids.length-6];
			if ( ids[0][0] != letters[i] || rows.textContent.includes(ids[0]) ) continue;
			rows.innerHTML += `
				<tr>
					<td>${ j + 1 }</td>
					<td>${ ids[0].replaceAll("_", " ") }</td>
					<td>${ courseAndYear }</td>
				</tr>
			`;
		}
	}
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
