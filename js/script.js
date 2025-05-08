// Nhập các danh sách từ vựng từ các tệp khác nhau
import { vocabList } from './vocabList.js';
import { vocabList2 } from './vocabList2.js';
import { vocabList3 } from './vocabList3.js';
import { vocabList4 } from './vocabList4.js';
import { vocabList5 } from './vocabList5.js';

// Gộp tất cả danh sách từ vựng lại thành một mảng duy nhất
const combinedVocabList = [...vocabList, ...vocabList2, ...vocabList3, ...vocabList4, ...vocabList5];

// Biến điều khiển số trang hiện tại
let currentPage = 1;

// Số lượng từ vựng mỗi trang
const itemsPerPage = 50;

// Danh sách từ vựng sau khi lọc tìm kiếm (mặc định = toàn bộ)
let filteredList = combinedVocabList;

/**
 * Hàm hiển thị bảng từ vựng theo trang
 * @param {number} page - số trang hiện tại
 * @param {Array} data - mảng dữ liệu từ vựng (có thể là đã lọc)
 */
function renderTablePage(page, data) {
    const tbody = document.getElementById("vocabBody");
    tbody.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = data.slice(start, end); // Lấy danh sách từ cho trang hiện tại

    // Tạo dòng bảng từ từng từ vựng
    pageItems.forEach(([stt, hira, kanji, hanviet, nghia]) => {
        const row = `
            <tr>
                <td>${stt}.</td>
                <td class="hiragana" data-kanji="${kanji}">${hira}</td>
                <td>${hanviet}</td>
                <td>${nghia}</td>
            </tr>`;
        tbody.insertAdjacentHTML("beforeend", row);
    });

    // Sự kiện click để đổi giữa Hiragana và Kanji
    document.querySelectorAll('.hiragana').forEach(cell => {
        cell.addEventListener('click', function () {
            const currentText = cell.innerText;
            const kanjiText = cell.getAttribute('data-kanji');
            cell.innerText = kanjiText;
            cell.setAttribute('data-kanji', currentText); // Đảo lại để chuyển đổi 2 chiều
        });
    });

    // Áp dụng hiệu ứng trong suốt cho bảng
    const table = document.querySelector('table');
    table.style.background = 'rgba(255, 255, 255, 0.7)'; // Đảm bảo bảng có độ trong suốt

    // Gọi hàm vẽ phân trang
    renderPagination(data.length, page);
}

/**
 * Hàm hiển thị các nút phân trang
 * @param {number} totalItems - tổng số từ vựng
 * @param {number} currentPage - trang hiện tại
 */
function renderPagination(totalItems, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = '';

    if (totalPages <= 1) return; // Không cần phân trang nếu chỉ có 1 trang

    // Nút quay lại trang trước
    if (currentPage > 1) {
        paginationDiv.innerHTML += `<button data-page="${currentPage - 1}">« Trước</button>`;
    }

    // Tạo các nút trang
    for (let i = 1; i <= totalPages; i++) {
        const active = i === currentPage ? 'style="font-weight:bold;"' : '';
        paginationDiv.innerHTML += `<button data-page="${i}" ${active}>${i}</button>`;
    }

    // Nút tới trang sau
    if (currentPage < totalPages) {
        paginationDiv.innerHTML += `<button data-page="${currentPage + 1}">Sau »</button>`;
    }

    // Gắn sự kiện cho các nút trang
    paginationDiv.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            currentPage = parseInt(btn.getAttribute('data-page'));
            renderTablePage(currentPage, filteredList);
        });
    });
}

// Gọi khi trang đã tải xong
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');

    // Sự kiện tìm kiếm theo từ khóa nhập vào
    searchInput.addEventListener('input', function () {
        const keyword = this.value.toLowerCase();

        // Lọc danh sách từ vựng chứa từ khóa
        filteredList = combinedVocabList.filter(item =>
            item.join(' ').toLowerCase().includes(keyword)
        );

        currentPage = 1; // Quay lại trang đầu sau khi lọc
        renderTablePage(currentPage, filteredList);
    });

    // Hiển thị bảng lần đầu với toàn bộ danh sách
    renderTablePage(currentPage, combinedVocabList);
});
