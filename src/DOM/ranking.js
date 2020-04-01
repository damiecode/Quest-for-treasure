/* eslint-disable prefer-destructuring */
export default function ranking(ranks) {
  const table = document.createElement('table');
  table.classList.add('table', 'is-bordered');
  table.id = 'table';

  const tableRow = document.createElement('tr');
  tableRow.innerHTML = `
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Score</th>
    </tr>
  `;

  const tableBody = document.createElement('tbody');
  tableBody.id = 'table';

  table.append(tableRow, tableBody);

  tableBody.innerHTML = '';
  let count = 11;
  for (let i = 10; i > 0; i -= 1) {
    count -= 1;
    const row = tableBody.insertRow(0);
    row.setAttribute('data-index', `${i}`);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerHTML = count;
    cell2.innerHTML = ranks[0];
    cell3.innerHTML = ranks[1];
  }
}