import { vocabList } from './vocabList.js';  // Import vocabList.js
import { vocabList2 } from './vocabList2.js';  // Import vocabList2.js
import { vocabList3 } from './vocabList3.js';  // Import vocabList3.js
import { vocabList4 } from './vocabList4.js';  // Import vocabList4.js
import { vocabList5 } from './vocabList5.js';  // Import vocabList5.js

// Kết hợp cả ５ danh sách từ vựng
const combinedVocabList = [...vocabList, ...vocabList2, ...vocabList3, ...vocabList4, ...vocabList5];


function renderTable() {
    const tbody = document.getElementById("vocabBody");
    combinedVocabList.forEach(([stt, hira, kanji, hanviet, nghia]) => {
        const row = `<tr>
            <td>${stt}.</td>
            <td class="hiragana" data-kanji="${kanji}">${hira}</td>
            <td>${hanviet}</td>
            <td>${nghia}</td>
        </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
    });

    // Gắn sự kiện click đổi Hiragana ↔ Kanji
    const hiraganaCells = document.querySelectorAll('.hiragana');
    hiraganaCells.forEach(cell => {
        cell.addEventListener('click', function() {
            const currentText = cell.innerText;
            const kanjiText = cell.getAttribute('data-kanji');
            cell.innerText = kanjiText;
            cell.setAttribute('data-kanji', currentText); // Đảo ngược để click đổi lại
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderTable();

    document.getElementById('searchInput').addEventListener('keyup', function() {
        let keyword = this.value.toLowerCase();
        let rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(function(row) {
            let text = row.innerText.toLowerCase();
            row.style.display = text.includes(keyword) ? '' : 'none';
        });
    });
});
