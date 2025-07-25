const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

fetch('products.json')
    .then(response => response.json())
    .then(products => {
        const grid = document.getElementById('product-grid');

        products.forEach(product =>{
            const card = document.createElement('div');
            card.className = 'product-card';

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" />
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">${formatRupiah(product.price)}</p>
                    <p class="rating">⭐ ${product.rating} • ${product.sold || '0'} terjual</p>
                    <p class="brand">${product.brand}</p>
                    ${product.label ? `<span class="label">${product.label}</span>` : ''}
                </div>
            `;
            grid.appendChild(card);
        })
    })
    .catch(error => {
    console.error('Gagal memuat data produk:', error);
});

function formatRupiah(number) {
  return 'Rp' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}