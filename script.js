// 1. Elementlarni tanlab olamiz
const homeLink = document.getElementById('home-link');
const productsLink = document.getElementById('products-link');
const aboutLink = document.getElementById('about-link') || document.querySelector('a[href="#about"]');

const homeSection = document.getElementById('home-section');
const productsSection = document.getElementById('mahsulotlar');
const aboutSection = document.getElementById('about-section');
const orderSection = document.getElementById('buyurtma-bolimi');
const orderForm = document.getElementById('order-form');

// 2. Bo'limlarni boshqarish funksiyasi (Hamma bo'limni yashirib, faqat bittasini ochadi)
function showOnly(sectionToShow) {
    // Hamma bo'limni yashirish
    homeSection.style.display = 'none';
    productsSection.style.display = 'none';
    aboutSection.style.display = 'none';
    orderSection.style.display = 'none';

    // Kerakli bo'limni ko'rsatish
    sectionToShow.style.display = 'block';
    
    // Sahifani tepaga qaytarish
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 3. Menyu tugmalari ishlashi
homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOnly(homeSection);
});

productsLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOnly(productsSection);
});

aboutLink.addEventListener('click', (e) => {
    e.preventDefault();
    showOnly(aboutSection);
});

// 4. "Savatga qo'shish" tugmalari mantiqi
const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Buyurtma bo'limini ko'rsatamiz
        orderSection.style.display = 'block';
        
        // Sahifani formaga silliq tushiramiz
        orderSection.scrollIntoView({ behavior: 'smooth' });
        
        // Tanlangan mahsulot nomini formadagi select'ga o'rnatish
        const productName = button.parentElement.querySelector('h3').innerText;
        const productSelect = document.getElementById('product-select');
        
        // Agar select ichida bunday mahsulot bo'lsa, uni tanlaydi
        for (let i = 0; i < productSelect.options.length; i++) {
            if (productSelect.options[i].text.includes(productName)) {
                productSelect.selectedIndex = i;
                break;
            }
        }
    });
});

// 5. Telegramga buyurtma yuborish
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
                // Buyurtmadan keyin bosh sahifaga qaytarish (ixtiyoriy)
                showOnly(homeSection);
            } else {
                alert('Xatolik yuz berdi. Iltimos qaytadan urunib ko\'ring.');
            }
        })
        .catch(error => {
            console.error('Xato:', error);
            alert('Internet aloqasini tekshiring.');
        });
});