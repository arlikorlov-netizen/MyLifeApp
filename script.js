// MyLife App - Главный JavaScript файл
// ======================================

console.log("MyLife App загружен!");

// Текущий активный раздел
let currentSection = null;

// Функция для переключения между разделами
function showSection(sectionName) {
    console.log("Переключаемся на раздел:", sectionName);
    
    // Закрываем боковую панель при выборе раздела
    toggleSidebar();
    
    // Здесь будет логика переключения между экранами
    // Пока просто покажем уведомление
    alert(`Скоро здесь будет раздел: ${sectionName}`);
    
    // Сохраняем текущий раздел
    currentSection = sectionName;
}

// Функция для бокового меню
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Блокируем прокрутку тела когда меню открыто
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
}

// Тестовая функция
function testFunction() {
    alert("JavaScript работает! 🎉");
    console.log("Кнопка нажата!");
}

// Функция инициализации при загрузке страницы
function initApp() {
    console.log("Приложение инициализировано");
    
    // Закрываем боковую панель при клике на оверлей
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', toggleSidebar);
    }
    
    // Здесь будем загружать данные, настраивать интерфейс
}
// Функция для тестирования базы данных
async function testDatabase() {
    const output = document.getElementById('test-output');
    output.style.display = 'block';
    output.innerHTML = 'Тестируем базу данных... ⏳';
    
    try {
        // Инициализируем базу
        await testDB.init();
        output.innerHTML += '<br>✅ База инициализирована';
        
        // Добавляем тестовые привычки
        const habits = await testDB.addTestHabits();
        output.innerHTML += `<br>✅ Добавлено ${habits.length} тестовых привычек`;
        
        // Показываем результат
        output.innerHTML += '<br><br><strong>Сохранённые привычки:</strong>';
        habits.forEach(habit => {
            output.innerHTML += `<br>• ${habit.name} (ID: ${habit.id})`;
        });
        
        output.innerHTML += '<br><br>🎉 База данных работает!';
        
    } catch (error) {
        output.innerHTML += `<br>❌ Ошибка: ${error.message}`;
    }
}
// Запускаем приложение когда страница загрузилась
document.addEventListener('DOMContentLoaded', initApp);
 

// Функция для тестирования базы данных
async function testDatabase() {
    const output = document.getElementById('test-output');
    output.style.display = 'block';
    output.innerHTML = 'Тестируем базу данных... ⏳';
    
    try {
        // Инициализируем базу
        await testDB.init();
        output.innerHTML += '<br>✅ База инициализирована';
        
        // Добавляем тестовые привычки
        const habits = await testDB.addTestHabits();
        output.innerHTML += `<br>✅ Добавлено ${habits.length} тестовых привычек`;
        
        // Показываем результат
        output.innerHTML += '<br><br><strong>Сохранённые привычки:</strong>';
        habits.forEach(habit => {
            output.innerHTML += `<br>• ${habit.name} (ID: ${habit.id})`;
        });
        
        output.innerHTML += '<br><br>🎉 База данных работает!';
        
    } catch (error) {
        output.innerHTML += `<br>❌ Ошибка: ${error.message}`;
    }
}
// Простой тест IndexedDB
async function testDatabase() {
    const output = document.getElementById('test-output');
    output.innerHTML = 'Тестируем базу данных... ⏳';
    
    try {
        // Используем Promise для работы с IndexedDB
        const db = await new Promise((resolve, reject) => {
            const request = indexedDB.open('MyLifeApp_SimpleTest', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('habits')) {
                    db.createObjectStore('habits', { 
                        keyPath: 'id', 
                        autoIncrement: true 
                    });
                }
            };
        });
        
        output.innerHTML += '<br>✅ База открыта успешно';
        
        // Добавляем тестовую привычку
        const habitId = await new Promise((resolve, reject) => {
            const transaction = db.transaction(['habits'], 'readwrite');
            const store = transaction.objectStore('habits');
            
            const habit = {
                name: 'Тестовая привычка ' + new Date().getTime(),
                createdAt: new Date().toISOString(),
                completed: false
            };
            
            const request = store.add(habit);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
        
        output.innerHTML += `<br>✅ Привычка добавлена (ID: ${habitId})`;
        
        // Читаем все привычки
        const allHabits = await new Promise((resolve, reject) => {
            const transaction = db.transaction(['habits'], 'readonly');
            const store = transaction.objectStore('habits');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
        
        output.innerHTML += `<br>✅ Всего привычек: ${allHabits.length}`;
        output.innerHTML += '<br><br>🎉 База данных работает!';
        
        db.close();
        
    } catch (error) {
        output.innerHTML += `<br>❌ Ошибка: ${error.message}`;
        console.error('Ошибка теста:', error);
    }
}