const url = "https://amsys-3.vercel.app/api";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

async function getDatas()
{
	const response = await fetch(`${ url }/zQRInformation`);
	if ( response.status != 200 ) return;
	const data = await response.text();
	if ( data ) {
		const newData = data.split(',');
		const list = document.getElementById("studentsList");
		for ( let i = 0; i < letters.length; ++i ) {
			for ( let j = 0; j < newData.length; ++j ) {
				const ids = newData[j].split('-');
				if ( ids[0][0] == letters[i] && !list.innerHTML.includes(ids[0]) ) {
					list.innerHTML += `
						<tr>
							<td>${ ids[0] }</td>
							<td>${ ids[1] }</td>
							<td>${ ids[2] }</td>
							<td>${ ids[3] }</td>
							<td>${ ids[5] }</td>
							<td>${ ids[7] }</td>
						</tr>
					`;
				}
			}
		}
	}
}

// document.getElementById("dateToday").innerText = new Date().toDateString();

// getDatas();

function addBlankRows(elementId, count) {
	const tbody = document.getElementById(elementId);
	for (let i = 0; i < count; i++) {
		const row = document.createElement("tr");
		for (let column = 0; column < 13; column++) {
			row.appendChild(document.createElement("td"));
		}
		tbody.appendChild(row);
	}
}

addBlankRows("page-rows", 18);
// addBlankRows("page-two-rows", 17);
