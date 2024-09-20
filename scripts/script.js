 
 // Initialize cart
 const cart = [];

   
 const addToCartButtons = document.querySelectorAll('.add-to-cart');

 
 const cartIcon = document.getElementById('cartIcon');

 
 function toggleCart() {
     const cartModal = document.getElementById('cartModal');
     cartModal.classList.toggle('hidden');
     displayCartItems();
 }

 // Add click event listeners to each button
 addToCartButtons.forEach(button => {
     button.addEventListener('click', function(event) {
         event.preventDefault(); // Prevent the default link behavior

         
         const productId = this.getAttribute('data-product-id');
         const productName = this.getAttribute('data-product-name');
         const productPrice = parseFloat(this.getAttribute('data-product-price'));

        
         const existingItem = cart.find(item => item.id === productId);

         if (existingItem) {
             
             existingItem.quantity += 1;
         } else {
             // If item does not exist, add new item
             cart.push({
                 id: productId,
                 name: productName,
                 price: productPrice,
                 quantity: 1
             });
         }

         
         const originalText = this.textContent;
         this.textContent = 'ADDED TO CART!';

         
         setTimeout(() => {
             this.textContent = originalText;
         }, 1000);

         displayCartItems();
     });
 });

 // Add click event listener to cart icon
 cartIcon.addEventListener('click', function(event) {
     event.preventDefault(); 
     toggleCart(); 
 });

 // Function to display cart items
 function displayCartItems() {
     const cartItemsContainer = document.getElementById('cartItems');
     const cartItemCount = document.getElementById('cartItemCount');
     const cartTotal = document.getElementById('cartTotal');
     cartItemsContainer.innerHTML = ''; 

     if (cart.length === 0) {
         cartItemsContainer.innerHTML = '<p class="text-gray-800">Your cart is empty.</p>';
         cartItemCount.textContent = '0 Items';
         cartTotal.textContent = 'Total: ₱0.00';
     } else {
         let total = 0;
         cartItemCount.textContent = `${cart.reduce((acc, item) => acc + item.quantity, 0)} Items`;
         
         cart.forEach((item, index) => {
             const listItem = document.createElement('div');
             listItem.classList.add('flex', 'items-center', 'justify-between', 'gap-4');
             listItem.innerHTML = `
                 <div class="flex items-center">
                     <img src="images/prod${item.id}.jpg" class="w-16 h-16 p-2 shrink-0 bg-gray-200 rounded-md" />
                     <div class="ml-4">
                         <p class="text-sm text-gray-800">${item.name} (${item.quantity})</p>
                         <p class="text-gray-500 text-xs mt-1">Quantity: ${item.quantity}</p>
                     </div>
                 </div>
                 <div class="flex items-center">
                     <span class="text-base font-bold text-gray-800 mr-4">₱${(item.price * item.quantity).toFixed(2)}</span>
                     <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] fill-red-500 inline cursor-pointer" viewBox="0 0 24 24" onclick="removeItem(${index}); return false;">
                         <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                     </svg>
                 </div>
             `;
             cartItemsContainer.appendChild(listItem);
             
             // Update the total
             total += item.price * item.quantity;
         });

         cartTotal.textContent = `Total: ₱${total.toFixed(2)}`;
     }
 }

 // Function to remove item from the cart
 function removeItem(index) {
     cart.splice(index, 1); 
     displayCartItems(); 
 }

 // Checkout button click event
 document.getElementById('checkoutButton').addEventListener('click', () => {
     if (cart.length === 0) {
         alert('Your cart is empty!');
     } else {
 
         alert('Proceeding to checkout...');
     }
 });

// Filter

document.addEventListener('DOMContentLoaded', () => {
    const sizeFilters = document.querySelectorAll('input[name="size"]');
    const colorFilters = document.querySelectorAll('input[name="color"]');
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const priceMinInput = document.querySelector('input[placeholder="Min"]');
    const priceMaxInput = document.querySelector('input[placeholder="Max"]');
    const products = document.querySelectorAll('#product');
    const applyFiltersButton = document.getElementById('apply-filters');

    function filterProducts() {
        const selectedSizes = Array.from(sizeFilters).filter(input => input.checked).map(input => input.id);
        const selectedColors = Array.from(colorFilters).filter(input => input.checked).map(input => input.id);
        const selectedCategories = Array.from(categoryFilters).filter(input => input.checked).map(input => input.id);
        const minPrice = parseFloat(priceMinInput.value) || 0;
        const maxPrice = parseFloat(priceMaxInput.value) || Infinity;

        products.forEach(product => {
            const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(product.dataset.size);
            const colorMatch = selectedColors.length === 0 || selectedColors.includes(product.dataset.color);
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.dataset.category);
            const productPrice = parseFloat(product.dataset.price) || 0;
            const priceMatch = productPrice >= minPrice && productPrice <= maxPrice;

            if (sizeMatch && colorMatch && categoryMatch && priceMatch) {
                product.style.display = '';
            } else {
                product.style.display = 'none'; 
            }
        });
    }

    // Add event listener to the "Apply Filters" button
    applyFiltersButton.addEventListener('click', filterProducts);


    
   
});


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const products = document.querySelectorAll('.bg-white'); 

    console.log('Search input and products initialized'); 
    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.toLowerCase().trim();
        console.log('Search input:', searchText); 

        products.forEach(product => {
            const productNameElement = product.querySelector('.product-name');

            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase();
                console.log('Checking product:', productName); 
                
                if (productName.includes(searchText)) {
                    product.style.display = ''; 
                    console.log('Showing product:', productName); 
                } else {
                    product.style.display = 'none'; 
                    console.log('Hiding product:', productName);
                }
            } else {
                // If no .product-name element is found, do not hide the product
                console.log('Product name element not found, not hiding product');
            }
        });
    });
});


// Rating
document.querySelectorAll('.product').forEach(product => {
    const ratingStars = product.querySelectorAll('.rating .fa-bed');

    ratingStars.forEach(star => {
        star.addEventListener('mouseover', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingStars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('hovered');
                } else {
                    s.classList.remove('hovered');
                }
            });
        });

        star.addEventListener('mouseout', () => {
            ratingStars.forEach(s => s.classList.remove('hovered'));
        });

        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            ratingStars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= value) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });
});


  













