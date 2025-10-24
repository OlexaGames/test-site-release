      async function loadData() {
            try {
                  // Для загрузки файлов
                const response = await fetch('data.json');
                if (!response.ok) throw new Error('Ошибка загрузки data.json: ' + response.status);
                const data = await response.json();
                
                const response0 = await fetch('data0.json');
                if (!response0.ok) throw new Error('Ошибка загрузки data0.json: ' + response0.status);
                const data0 = await response0.json();

                const response1 = await fetch('data1.json');
                if (!response1.ok) throw new Error('Ошибка загрузки data1.json: ' + response1.status);
                const data1 = await response1.json();

                const response2 = await fetch('data2.json');
                if (!response2.ok) throw new Error('Ошибка загрузки data2.json: ' + response2.status);
                const data2 = await response2.json();

                const response3 = await fetch('data3.json');
                if (!response3.ok) throw new Error('Ошибка загрузки data3.json: ' + response3.status);
                const data3 = await response3.json();

                const response4 = await fetch('data4.json');
                if (!response4.ok) throw new Error('Ошибка загрузки data4.json: ' + response4.status);
                const data4 = await response4.json();
                  
                const response5 = await fetch('data5.json');
                if (!response5.ok) throw new Error('Ошибка загрузки data5.json: ' + response5.status);
                const data5 = await response5.json();
                  
                const response6 = await fetch('data6.json');
                if (!response6.ok) throw new Error('Ошибка загрузки data6.json: ' + response6.status);
                const data6 = await response6.json();

                const response7 = await fetch('data7.json');
                if (!response7.ok) throw new Error('Ошибка загрузки data7.json: ' + response7.status);
                const data7 = await response7.json();                  

                const response8 = await fetch('data8.json');
                if (!response8.ok) throw new Error('Ошибка загрузки data8.json: ' + response8.status);
                const data8 = await response8.json();

                const response9 = await fetch('data9.json');
                if (!response9.ok) throw new Error('Ошибка загрузки data9.json: ' + response9.status);
                const data9 = await response9.json();

                const response10 = await fetch('data10.json');
                if (!response10.ok) throw new Error('Ошибка загрузки data10.json: ' + response10.status);
                const data10 = await response10.json();

                const response11 = await fetch('data11.json');
                if (!response11.ok) throw new Error('Ошибка загрузки data11.json: ' + response11.status);
                const data11 = await response11.json();

                const response12 = await fetch('data12.json');
                if (!response12.ok) throw new Error('Ошибка загрузки data12.json: ' + response12.status);
                const data12 = await response12.json();

                const response13 = await fetch('data13.json');
                if (!response13.ok) throw new Error('Ошибка загрузки data13.json: ' + response13.status);
                const data13 = await response13.json();

                const response14 = await fetch('data14.json');
                if (!response14.ok) throw new Error('Ошибка загрузки data14.json: ' + response14.status);
                const data14 = await response14.json();
                  
                // Объединяем все участки
                const allSections = [...data, ...data0, ...data1, ...data2,
                                          ...data3, ...data4, ...data5, ...data6,
                                          ...data7, ...data8, ...data9, ...data10,
                                          ...data11, ...data12, ...data13, ...data14];
                
                // Получаем контейнер
                const container = document.getElementById('sectionsContainer');
                container.innerHTML = ''; // Очищаем
                
                // Для каждого участка создаём блок
                allSections.forEach(section => {
                    // Создаём div для участка
                    const sectionDiv = document.createElement('div');
                    sectionDiv.className = 'section';
                    sectionDiv.id = 'section-' + section.section.replace(/\s+/g, '-');
                    
                    // Заголовок
                    const header = document.createElement('h2');
                    header.textContent = section.section;
                    sectionDiv.appendChild(header);
                    
                    // Таблица
                    const table = document.createElement('table');
                    const thead = document.createElement('thead');
                    thead.innerHTML = `
                        <tr>
                            <th class="th-num">№</th>
                            <th class="th-name">Название станции</th>
                            <th class="th-code1">Код станции</th>
                            <th class="th-code2">Код участка</th>
                        </tr>
                    `;
                    table.appendChild(thead);
                    
                    const tbody = document.createElement('tbody');
                    section.items.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td class="td-num">${item.num}</td>
                            <td class="td-name">${item.name}</td>
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

        // Функция поиска
        function searchSections() {
            let filter = document.getElementById("searchInput").value.toLowerCase();
            
            // Получаем все section div'ы
            let sections = document.querySelectorAll('.section');
            
            sections.forEach(section => {
                let table = section.querySelector('table');
                let rows = table.getElementsByTagName('tr');
                let visibleRows = 0;
                
                // Фильтруем строки (начиная с 1, чтобы пропустить thead)
                for (let i = 1; i < rows.length; i++) {
                    let td = rows[i].getElementsByTagName('td')[1]; // Первая колонка — "name"
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
                
                // Если нет видимых строк — скрываем весь участок
                section.style.display = visibleRows === 0 ? "none" : "block";
            });
        }

        // Загружаем данные при загрузке страницы
        window.onload = loadData;
