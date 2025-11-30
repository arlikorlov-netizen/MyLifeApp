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

// Запускаем приложение когда страница загрузилась
document.addEventListener('DOMContentLoaded', initApp);
