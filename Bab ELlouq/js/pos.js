document.addEventListener('DOMContentLoaded', () => {

    const posForm = document.getElementById('posForm');
    const inventoryList = document.getElementById('inventoryList');
    const emptyState = document.getElementById('emptyState');
    const clearBtn = document.getElementById('clearInventory');

    let products = JSON.parse(localStorage.getItem('babElloq_products'));
    if (!products || products.length === 0) {
        products = typeof initialProducts !== 'undefined' ? initialProducts : [];
        if (products.length > 0) localStorage.setItem('babElloq_products', JSON.stringify(products));
    }

    // Map categories to Arabic strings
    const categoryNameObj = {
        'smartwatch': 'ساعات ذكية',
        'headphones': 'سماعات',
        'accessories': 'شواحن و وصلات',
        'other': 'أخرى'
    };

    function saveProducts() {
        localStorage.setItem('babElloq_products', JSON.stringify(products));
    }

    function renderProducts() {
        inventoryList.innerHTML = '';
        if (products.length === 0) {
            emptyState.style.display = 'block';
            document.querySelector('.table-container').style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            document.querySelector('.table-container').style.display = 'block';

            products.forEach((product, index) => {
                const tr = document.createElement('tr');
                const catText = categoryNameObj[product.category] || 'غير محدد';
                tr.innerHTML = `
                    <td><strong>${product.name}</strong></td>
                    <td><span class="badge">${catText}</span></td>
                    <td>${Number(product.price).toLocaleString()} ج.م</td>
                    <td>${product.stock}</td>
                    <td>
                        <button class="btn-danger" onclick="deleteProduct(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                inventoryList.appendChild(tr);
            });
        }
    }

    // Add Product
    posForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('productName').value;
        const category = document.getElementById('productCategory').value;
        const price = document.getElementById('productPrice').value;
        const stock = document.getElementById('productStock').value;

        const newProduct = {
            id: Date.now(),
            name,
            category,
            price,
            stock
        };

        products.push(newProduct);
        saveProducts();
        renderProducts();

        // Reset form
        posForm.reset();

        // Focus back to first input
        document.getElementById('productName').focus();
    });

    // Delete Product
    window.deleteProduct = (index) => {
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            products.splice(index, 1);
            saveProducts();
            renderProducts();
        }
    };

    // Clear entire inventory
    clearBtn.addEventListener('click', () => {
        if (products.length > 0 && confirm('تحذير: سيتم مسح جميع المنتجات من المخزون. هل توافق؟')) {
            products = [];
            saveProducts();
            renderProducts();
        }
    });

    // Initial Render
    renderProducts();
});
