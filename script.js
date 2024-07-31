// script.js
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productItems = document.getElementById('product-items');
    const saleProductSelect = document.getElementById('sale-product');
    const registerSaleButton = document.getElementById('register-sale');
    const totalSalesElement = document.getElementById('total-sales');
    
    let products = [];
    let totalSales = 0;

    document.getElementById('add-product').addEventListener('click', () => {
        const name = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const quantity = parseInt(document.getElementById('product-quantity').value);
        
        if (name && !isNaN(price) && !isNaN(quantity) && quantity > 0) {
            const product = { name, price, quantity };
            products.push(product);
            updateProductList();
            updateSaleProductSelect();
            productForm.reset();
        } else {
            alert('Por favor, complete todos los campos correctamente.');
        }
    });

    function updateProductList() {
        productItems.innerHTML = '';
        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price.toFixed(2)} - Cantidad: ${product.quantity}`;
            productItems.appendChild(li);
        });
    }

    function updateSaleProductSelect() {
        saleProductSelect.innerHTML = '';
        products.forEach((product, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = `${product.name} - $${product.price.toFixed(2)}`;
            saleProductSelect.appendChild(option);
        });
    }

    registerSaleButton.addEventListener('click', () => {
        const productIndex = parseInt(saleProductSelect.value);
        const saleQuantity = parseInt(document.getElementById('sale-quantity').value);
        
        if (!isNaN(productIndex) && !isNaN(saleQuantity) && saleQuantity > 0) {
            const product = products[productIndex];
            if (saleQuantity <= product.quantity) {
                const saleAmount = saleQuantity * product.price;
                totalSales += saleAmount;
                product.quantity -= saleQuantity;
                updateProductList();
                totalSalesElement.textContent = `Total Ventas: $${totalSales.toFixed(2)}`;
            } else {
                alert('No hay suficiente cantidad del producto.');
            }
        } else {
            alert('Por favor, complete todos los campos correctamente.');
        }
    });
});
