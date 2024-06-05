// Récupère les éléments nécessaires pour l'ajout de catégories et de produits
var categories = [];
var productForm = document.getElementById('productForm');
var categoryForm = document.getElementById('categoryForm');
var categoriesList = document.getElementById('categoriesList');
var categoryProducts = document.getElementById('categoryProducts');

// Fonction pour afficher les catégories et les produits
function displayCategories() {
    categoriesList.innerHTML = ''; // Effacer la liste des catégories
    categoryProducts.innerHTML = ''; // Effacer les produits affichés

    categories.forEach(function(category, categoryIndex) {
        var categoryOption = document.createElement('option');
        categoryOption.value = categoryIndex;
        categoryOption.textContent = category.name;
        categoriesList.appendChild(categoryOption);

        var categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = '<h3>' + category.name + '</h3>';

        category.products.forEach(function(product, productIndex) {
            var productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = '<h2>' + product.name + '</h2><p>' + product.price + '</p>';
            var productCheckbox = document.createElement('input');
            productCheckbox.type = 'checkbox';
            productCheckbox.className = 'product-checkbox';
            productElement.appendChild(productCheckbox);
            categoryDiv.appendChild(productElement);
        });

        categoryProducts.appendChild(categoryDiv);
    });
}

// Gestionnaire d'événements pour le formulaire d'ajout de catégorie
categoryForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var categoryName = document.getElementById('categoryName').value;
    categories.push({ name: categoryName, products: [] });
    displayCategories();
});

// Gestionnaire d'événements pour le formulaire d'ajout de produit
productForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var productName = document.getElementById('productName').value;
    var productPrice = document.getElementById('productPrice').value;
    var productImage = document.getElementById('productImage').files[0];
    var selectedCategoryIndex = categoriesList.selectedIndex;
    var selectedCategory = categories[selectedCategoryIndex];
    selectedCategory.products.push({ name: productName, price: productPrice, image: productImage });
    displayCategories();
});

// Gestionnaire d'événements pour le clic sur le bouton d'achat
var buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', function() {
    var selectedProducts = [];
    var productCheckboxes = document.querySelectorAll('.product-checkbox');
    productCheckboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedProducts.push(checkbox.parentElement.querySelector('h2').textContent);
        }
    });
    console.log('Produits sélectionnés :', selectedProducts);
});

// Afficher les catégories et les produits initiaux
displayCategories();
