// Elementlarni tanlab olamiz
const homeLink = document.getElementById('home-link');
const productsLink = document.getElementById('products-link');

const homeSection = document.getElementById('home-section');
const productsSection = document.getElementById('mahsulotlar');

// Mahsulotlar tugmasi bosilganda: Bosh sahifa yo'qoladi, Mahsulotlar chiqadi
productsLink.addEventListener('click', function(e) {
    e.preventDefault(); // Sahifa sakrab ketmasligi uchun
    homeSection.style.display = 'none';
    productsSection.style.display = 'block';
});

// Bosh sahifa tugmasi bosilganda: Mahsulotlar yo'qoladi, Bosh sahifa chiqadi
homeLink.addEventListener('click', function(e) {
    e.preventDefault();
    productsSection.style.display = 'none';
    homeSection.style.display = 'block';
});
const orderForm = document.getElementById('order-form');

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Ma'lumotlarni yig'ish
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const product = document.getElementById('product-select').value;
    const qty = document.getElementById('product-quantity').value;

    // Telegram Bot ma'lumotlari
    const token = '8781059992:AAE5t7u61m9dZdDzUTAAl4PUyUQqyu2bhSc';
    const chatId = '6081391678';
    
    const message = `🍫 YANGI BUYURTMA!\n\n👤 Mijoz: ${name}\n📞 Tel: ${phone}\n📍 Manzil: ${address}\n📦 Mahsulot: ${product}\n🔢 Soni: ${qty} dona`;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                alert('Buyurtmangiz qabul qilindi! Saidakbar tez orada siz bilan bog\'lanadi.');
                orderForm.reset();
            } else {
                alert('Xatolik yuz berdi. Iltimos qaytadan urunib ko\'ring.');
            }
        })
        .catch(error => console.log('Xato:', error));
});
// Barcha "Savatga qo'shish" tugmalarini tanlab olamiz
const addButtons = document.querySelectorAll('.add-to-cart');
const orderSection = document.getElementById('buyurtma-bolimi');

addButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Formani ko'rsatamiz
        orderSection.style.display = 'block';
        
        // Sahifani formaga silliq tushiramiz
        orderSection.scrollIntoView({ behavior: 'smooth' });
        
        // Qaysi mahsulot bosilganini bilish (ixtiyoriy rivojlantirish uchun)
        const productName = button.parentElement.querySelector('h3').innerText;
        document.getElementById('product-select').value = productName;
    });
});