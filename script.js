// الحصول على النموذج وعناصر الصفحة
const noteForm = document.getElementById('noteForm');
const notesContainer = document.getElementById('notesContainer');

// دالة لإضافة ملاحظة جديدة
function addNoteToPage(name, grade, note, imageURL) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    // تعيين لون عشوائي لكل ملاحظة
    const randomColor = getRandomColor();
    noteDiv.style.backgroundColor = randomColor;

    // إضافة المحتويات للملاحظة
    noteDiv.innerHTML = `
        <h3>${name} - ${grade}</h3>
        <p>${note}</p>
        ${imageURL ? `<img src="${imageURL}" alt="مرفق الصورة">` : ''}
    `;

    // إضافة الملاحظة إلى صفحة الملاحظات
    notesContainer.appendChild(noteDiv);
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

// التعامل مع إرسال النموذج
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();  // منع إرسال النموذج بشكل تقليدي

    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    const note = document.getElementById('note').value;
    const image = document.getElementById('image').files[0];

    // رفع الصورة إلى موقع أو تخزينها مؤقتاً
    const imageURL = image ? URL.createObjectURL(image) : '';

    // تخزين الملاحظة في localStorage (إضافة الملاحظة في البداية)
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.unshift({ name, grade, note, image: imageURL }); // استخدام unshift لإضافة الملاحظة في البداية
    localStorage.setItem('notes', JSON.stringify(notes));

    // إضافة الملاحظة إلى الصفحة
    addNoteToPage(name, grade, note, imageURL);

    // إعادة تعيين النموذج بعد الإرسال
    noteForm.reset();
});
