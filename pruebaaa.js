class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const productCard = document.createElement('div');
        productCard.className = 'card product-card';
        productCard.innerHTML = `
            <div class="card-body">
                <strong>Product Name:</strong> ${product.name} <br>
                <strong>Product Price:</strong> ${product.price} <br>
                <strong>Product Year:</strong> ${product.year} <br>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </div>
        `;
        productList.appendChild(productCard);
    }

    deleteProduct(element, productName) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
            this.showMessage(`Product "${productName}" removed successfully`, "success");
        }
    }

    showMessage(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const app = document.getElementById('App');
        container.insertBefore(div, app);

        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearForm() {
        document.getElementById("product-form").reset();
    }
}

const ui = new UI(); // Crear una única instancia de UI

document.getElementById("product-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const year = document.getElementById("year").value;

    if (name && price && year) {
        const product = new Product(name, price, year);
        ui.addProduct(product);
        ui.showMessage("Product added successfully", "success");
        ui.clearForm();
    } else {
        ui.showMessage("Please fill out all fields", "danger");
    }
});

document.getElementById("product-list").addEventListener("click", function (event) {
    ui.deleteProduct(event.target, event.target.parentElement.firstChild.textContent);
});

