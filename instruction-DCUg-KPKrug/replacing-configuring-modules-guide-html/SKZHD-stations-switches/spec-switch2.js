let allSections = []; // Глобальная переменная для хранения данных

// Функция для загрузки данных из файлов
async function loadData() {
    try {
        const files = [
            'data.json', 'data0.json', 'data1.json', 'data2.json', 'data3.json',
            'data4.json', 'data5.json', 'data6.json', 'data7.json', 'data8.json',
            'data9.json', 'data10.json', 'data11.json', 'data12.json', 'data13.json', 'data14.json'
        ];
        
        const responses = await Promise.all(
            files.map(file => 
                fetch(file).then(response => {
                    if (!response.ok) {
                        console.warn(`Не удалось загрузить ${file}: ${response.status}`);
                        return []; // Пропускаем файл
                    }
                    return response.json();
                }).catch(error => {
                    console.warn(`Ошибка при загрузке ${file}:`, error);
                    return []; // Пропускаем файл
                })
            )
        );
        
        // Объединяем все участки
        allSections = responses.flat();
        console.log('Загруженные данные (allSections):', allSections);
        
        // Проверяем структуру каждого участка
        allSections.forEach((section, index) => {
            console.log(`Участок ${index}:`, section);
            if (!section.section || !Array.isArray(section.items)) {
                console.warn(`Некорректная структура участка ${index}:`, section);
            } else {
                console.log(`Участок "${section.section}" содержит ${section.items.length} станций`);
                section.items.forEach((item, itemIndex) => {
                    console.log(`Станция ${itemIndex} в "${section.section}":`, item);
                });
            }
        });
    } catch (error) {
        console.error('Общая ошибка загрузки:', error);
        alert('Ошибка загрузки данных. Проверьте консоль разработчика.');
    }
}

// Функция для отображения участков в указанном контейнере
function renderSections(containerId, filter = '') {
    console.log(`Рендеринг для ${containerId} с фильтром: "${filter}"`);
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Контейнер ${containerId} не найден`);
        return;
    }
    container.innerHTML = ''; // Очищаем
    
    allSections.forEach(section => {
        if (!section.section || !Array.isArray(section.items)) {
            console.warn(`Пропущен участок с некорректной структурой:`, section);
            return;
        }
        
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section';
        sectionDiv.id = 'section-' + section.section.replace(/\s+/g, '-') + '-' + containerId;
        
        const header = document.createElement('h2');
        header.textContent = section.section;
        sectionDiv.appendChild(header);
        
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
            if (!item.num || !item.name || !item.code1 || !item.code2) {
                console.warn(`Некорректная станция в "${section.section}":`, item);
                return;
            }
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="td-num">${item.num}</td>
                <td class="td-name">${item.name}</td>
                <td class="td-code1">${item.code1}</td>
                <td class="td-code2">${item.code2}</td>
            `;
            // Если есть фильтр, скрываем строки, не соответствующие ему
            if (filter && !item.name.toLowerCase().includes(filter)) {
                row.style.display = 'none';
            }
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        
        // Если есть фильтр, скрываем участок, если нет видимых строк
        if (filter) {
            const visibleRows = Array.from(tbody.getElementsByTagName('tr')).filter(row => row.style.display !== 'none').length;
            sectionDiv.style.display = visibleRows === 0 ? 'none' : 'block';
        }
        
        if (tbody.children.length > 0) {
            sectionDiv.appendChild(table);
            container.appendChild(sectionDiv);
            console.log(`Добавлен участок "${section.section}" в ${containerId} с ${tbody.children.length} строками`);
        } else {
            console.log(`Участок "${section.section}" не добавлен, так как нет строк`);
        }
    });
}

// Функция поиска
function searchSections() {
    let filter = document.getElementById("searchInput").value.toLowerCase();
    console.log('Поиск с фильтром:', filter);
    renderSections('sectionsContainerSearch', filter);
}

// Показать режим поиска
function showSearchMode() {
    console.log('Переключение в режим поиска');
    document.getElementById('menu').style.display = 'none';
    document.getElementById('searchContainer').style.display = 'block';
    document.getElementById('fullListContainer').style.display = 'none';
    document.getElementById('searchInput').value = '';
    document.getElementById('sectionsContainerSearch').innerHTML = '';
}

// Показать полный список
function showFullList() {
    console.log('Переключение в режим полного списка');
    document.getElementById('menu').style.display = 'none';
    document.getElementById('searchContainer').style.display = 'none';
    document.getElementById('fullListContainer').style.display = 'block';
    renderSections('sectionsContainerFull');
}

// Вернуться к меню
function backToMenu() {
    console.log('Возврат к меню');
    document.getElementById('menu').style.display = 'block';
    document.getElementById('searchContainer').style.display = 'none';
    document.getElementById('fullListContainer').style.display = 'none';
    document.getElementById('sectionsContainerSearch').innerHTML = '';
    document.getElementById('sectionsContainerFull').innerHTML = '';
}

// Загружаем данные при загрузке страницы
window.onload = loadData;
