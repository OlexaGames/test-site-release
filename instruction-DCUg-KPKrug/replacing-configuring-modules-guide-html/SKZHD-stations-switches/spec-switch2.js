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
                    if (!response.ok) throw new Error(`Ошибка загрузки ${file}: ${response.status}`);
                    return response.json();
                })
            )
        );
        
        // Объединяем все участки
        allSections = responses.flat();
    } catch (error) {
        console.error('Ошибка:', error);
        alert(error.message);
    }
}

// Функция для отображения участков в указанном контейнере
function renderSections(containerId, filter = '') {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Очищаем
    
    allSections.forEach(section => {
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
        
        container.appendChild(sectionDiv);
    });
}

// Функция поиска
function searchSections() {
    let filter = document.getElementById("searchInput").value.toLowerCase();
    renderSections('sectionsContainerSearch', filter); // Перерисовываем с фильтром
}

// Показать режим поиска
function showSearchMode() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('searchContainer').style.display = 'block';
    document.getElementById('fullListContainer').style.display = 'none';
    document.getElementById('searchInput').value = ''; // Очистить поиск
    document.getElementById('sectionsContainerSearch').innerHTML = ''; // Изначально пусто
}

// Показать полный список
function showFullList() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('searchContainer').style.display = 'none';
    document.getElementById('fullListContainer').style.display = 'block';
    renderSections('sectionsContainerFull'); // Отобразить все без фильтра
}

// Вернуться к меню
function backToMenu() {
    document.getElementById('menu').style.display = 'block';
    document.getElementById('searchContainer').style.display = 'none';
    document.getElementById('fullListContainer').style.display = 'none';
    document.getElementById('sectionsContainerSearch').innerHTML = '';
    document.getElementById('sectionsContainerFull').innerHTML = '';
}

// Загружаем данные при загрузке страницы
window.onload = loadData;
