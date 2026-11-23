const url = "https://amsys-3.vercel.app/api";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// let namesList = [];

async function getDatas()
{
	const response = await fetch(`${ url }/zQRInformation`);
	if ( response.status != 200 ) return;
	const data = await response.text();
	if ( data ) {
		const newData = data.split(',');
		// newData.sort((a,b) => {
		// 	const nameA = a.split('-')[0];
		// 	const nameB = b.split('-')[0];
		// 	return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
		// });
		const list = document.getElementById("studentsList");
		for ( let i = 0; i < letters.length; ++i ) {
			for ( let j = 0; j < newData.length; ++j ) {
				const ids = newData[j].split('-');
				if ( list.innerHTML.includes(ids[0]) ) continue;
				if ( ids[0][0] == letters[i] ) {
					// namesList.push(newData[j]);
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
		// for ( let i = 0; i < namesList.length; ++i ) {
		// 	const ids = newData[i].split('-');
		// 	if ( list.innerHTML.includes(ids[0]) ) continue;
		// 	list.innerHTML += `
		// 		<tr>
		// 			<td>${ ids[0] }</td>
		// 			<td>${ ids[1] }</td>
		// 			<td>${ ids[2] }</td>
		// 			<td>${ ids[3] }</td>
		// 			<td>${ ids[5] }</td>
		// 			<td>${ ids[7] }</td>
		// 		</tr>
		// 	`;
		// }
	}
}

document.getElementById("dateToday").innerText = new Date().toDateString();

getDatas();
