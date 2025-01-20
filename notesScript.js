const notesContainer = document.getElementById('notesContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let allNotes = [];
let currentPage = 1;
const notesPerPage = 9; // عرض 9 ملاحظات في كل صفحة (3 في كل صف)

function loadNotes() {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    allNotes = storedNotes;
    displayNotes();
}

function displayNotes() {
    const startIndex = (currentPage - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    const notesToDisplay = allNotes.slice(startIndex, endIndex);

    notesContainer.innerHTML = ''; // مسح الملاحظات القديمة

    // تقسيم الملاحظات إلى 3 صفوف من 3 ملاحظات
    const rows = [[], [], []];
    notesToDisplay.forEach((note, index) => {
        const rowIndex = Math.floor(index / 3);
        rows[rowIndex].push(note);
    });

    // عرض الملاحظات كستيكرات ملونة
    rows.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        row.forEach(note => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');
            noteDiv.style.backgroundColor = getRandomColor(); // تعيين لون عشوائي

            noteDiv.innerHTML = `
                <h3>${note.name} - ${note.grade}</h3>
                <p>${note.note}</p>
                ${note.image ? `<img src="${note.image}" alt="مرفق الصورة">` : ''}
            `;

            rowDiv.appendChild(noteDiv);
        });
        notesContainer.appendChild(rowDiv);
    });

    // التحكم في أزرار التصفح
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * notesPerPage >= allNotes.length;
}

// دالة للحصول على لون عشوائي
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// التعامل مع أزرار التصفح
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayNotes();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage * notesPerPage < allNotes.length) {
        currentPage++;
        displayNotes();
    }
});

// تحميل الملاحظات عند فتح الصفحة
window.onload = loadNotes;
