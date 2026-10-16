      async function loadData() {
            try {
                
                const response1 = await fetch('data1.json');
                if (!response1.ok) throw new Error('Ошибка загрузки data1.json: ' + response1.status);
                const data1 = await response1.json();
                
                
                const response2 = await fetch('data2.json');
                if (!response2.ok) throw new Error('Ошибка загрузки data2.json: ' + response2.status);
                const data2 = await response2.json();
                
                const allSections = [...data1, ...data2];
                
                const container = document.getElementById('sectionsContainer');
                container.innerHTML = '';
                
                allSections.forEach(section => {
                    const sectionDiv = document.createElement('div');
                    sectionDiv.className = 'section';
                    sectionDiv.id = 'section-' + section.section.replace(/\s+/g, '-');
                    
                    const header = document.createElement('h2');
                    header.textContent = section.section;
                    sectionDiv.appendChild(header);
                    
                    const table = document.createElement('table');
                    const thead = document.createElement('thead');
                    thead.innerHTML = `
                        <tr>
                            <th class="th-name">Название</th>
                            <th class="th-num">Номер</th>
                            <th class="th-code1">Код 1</th>
                            <th class="th-code2">Код 2</th>
                        </tr>
                    `;
                    table.appendChild(thead);
                    
                    const tbody = document.createElement('tbody');
                    section.items.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td class="td-name">${item.name}</td>
                            <td class="td-num">${item.num}</td>
                            <td class="td-code1">${item.code1}</td>
                            <td class="td-code2">${item.code2}</td>
                        `;
                        tbody.appendChild(row);
                    });
                    table.appendChild(tbody);
                    
                    sectionDiv.appendChild(table);
                    container.appendChild(sectionDiv);
                });
            } catch (error) {
                console.error('Ошибка:', error);
                alert(error.message);
            }
        }

        function searchSections() {
            let filter = document.getElementById("searchInput").value.toLowerCase();
            
            let sections = document.querySelectorAll('.section');
            
            sections.forEach(section => {
                let table = section.querySelector('table');
                let rows = table.getElementsByTagName('tr');
                let visibleRows = 0;
                
                for (let i = 1; i < rows.length; i++) {
                    let td = rows[i].getElementsByTagName('td')[0];
                    if (td) {
                        let txtValue = td.textContent || td.innerText;
                        if (txtValue.toLowerCase().indexOf(filter) > -1) {
                            rows[i].style.display = "";
                            visibleRows++;
                        } else {
                            rows[i].style.display = "none";
                        }
                    }
                }
                
                section.style.display = visibleRows === 0 ? "none" : "block";
            });
        }

        window.onload = loadData;
