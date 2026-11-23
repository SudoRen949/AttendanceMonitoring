const url = "https://amsys-3.vercel.app/api";

async function getDatas()
{
	const response = await fetch(`${ url }/zQRInformation`);
	if ( response.status != 200 ) return;
	const data = await response.text();
	if ( data ) {
		const newData = data.split(',');
		newData.sort((a,b) => {
			const nameA = a.split('-')[0];
			const nameB = b.split('-')[0];
			const nameLetterA = nameA[0];
			const nameLetterB = nameB[0];
			return nameLetterA.localeCompare(nameLetterB, undefined, { sensitivity: 'base' });
		});
		const list = document.getElementById("studentsList");
		for ( let i = 0; i < newData.length; ++i ) {
			const ids = newData[i].split('-');
			if ( list.innerHTML.includes(ids[0]) ) continue;
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

document.getElementById("dateToday").innerText = new Date().toDateString();

getDatas();
