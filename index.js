// ----------------- UI Elements -----------------
let searchbtn = document.querySelector("#search-btn");
let searchbar = document.querySelector(".search-bar-container");
let formbtn = document.querySelector("#login-btn");
let loginform = document.querySelector('.login-form-container');
let formclose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');
let videoSlider = document.querySelector('#video-slider');
// ================== GLOBAL CONFIG ==================
const backendURL = "https://pawan-tour-travels-backend-1.onrender.com/api";


// ----------------- Scroll Behavior -----------------
window.onscroll = () => {
    searchbtn.classList.remove('fa-times');
    searchbar.classList.remove('active');
};

// ----------------- Menu Toggle -----------------
menu.addEventListener("click", () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

// ----------------- Search Toggle -----------------
searchbtn.addEventListener("click", () => {
    searchbtn.classList.toggle('fa-times');
    searchbar.classList.toggle('active');
});

// ----------------- Login Form Toggle -----------------
formbtn.addEventListener("click", () => {
    loginform.classList.add('active');
});
formclose.addEventListener("click", () => {
    loginform.classList.remove('active');
});

// ----------------- Video Button Click -----------------
videoBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');

        let src = btn.getAttribute('data-src');
        videoSlider.pause();
        videoSlider.src = src;
        videoSlider.load();
        videoSlider.muted = true;
        videoSlider.play();
    });
});

// ----------------- Review Slider -----------------
var  reviewSwiper = new Swiper(".review-photos-swiper", {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    }
});

// ----------------- Booking Form Submit -----------------
const bookingForm = document.querySelector('#booking-form');

function showToast(msg) {
    const t = document.createElement("div");
    t.innerText = msg;
    t.style.cssText = "position:fixed;bottom:20px;right:20px;background:#222;color:#fff;padding:12px 18px;border-radius:6px;z-index:9999;";
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            place: bookingForm.place.value.trim(),
            guests: Number(bookingForm.guests.value),
            arrival: bookingForm.arrival.value,
            leaving: bookingForm.leaving.value
        };

        // Validation
        if (!formData.place || !formData.guests || !formData.arrival || !formData.leaving) {
            showToast("All fields are required!");
            return;
        }
        if (new Date(formData.leaving) <= new Date(formData.arrival)) {
            showToast("Leaving date must be after arrival date");
            return;
        }

        try {
            const res = await fetch(`${backendURL}/booking`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                showToast(data.message || "Booking saved successfully!");
                // WhatsApp message
                const msg = encodeURIComponent(
`🚕 *New Booking Request*
📍 Place: ${formData.place}
👥 Guests: ${formData.guests}
📅 Arrival: ${formData.arrival}
📅 Leaving: ${formData.leaving}
📞 Please confirm booking`
                );
                window.open(`https://wa.me/918340606361?text=${msg}`, "_blank");
                bookingForm.reset();
            } else {
                showToast(data.message || "Error saving booking");
            }
        } catch (err) {
            console.error(err);
            showToast("Server error! Try again later.");
        }
    });
}

// ----------------- Contact Form Submit -----------------
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: contactForm.name.value.trim(),
            email: contactForm.email.value.trim(),
            phone: contactForm.phone.value.trim(),
            subject: contactForm.subject.value.trim(),
            message: contactForm.message.value.trim()
        };

        if (!formData.name || !formData.phone) {
            alert("Name and Phone are required!");
            return;
        }

        try {
            const res = await fetch(`${backendURL}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (res.ok) {
                alert(data.message || "Contact saved successfully!");
                const msg = encodeURIComponent(
`📩 New Contact Enquiry
👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
📝 Subject: ${formData.subject}
💬 Message: ${formData.message}`
                );
                window.open(`https://wa.me/918340606361?text=${msg}`, "_blank");
                contactForm.reset();
            } else {
                alert(data.message || "Error saving contact");
            }
        } catch (err) {
            console.error(err);
            alert("Server error! Try again later.");
        }
    });
}



// Show popup on page load
window.onload = function () {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "flex";
};


// Close popup when user clicks on X
const closeBtn = document.getElementById("closeBtn");
if (closeBtn) {
  closeBtn.onclick = function () {
    document.getElementById("popup").style.display = "none";
  };
}

// Example function when user clicks "Request Now"
function requestCallback() {
  alert("Thank you! We will contact you shortly.");
  document.getElementById('popup').style.display = 'none';
}
// WhatsApp number
const whatsappNumber = "918340606361";

//<script>


// Packages data (NO PRICE)
const packages = [
  {
    name: "Bodh Gaya",
    location: "Where the Buddha attained enlightenment",
    img: "rishu-bhosale-URPvbncq-4M-unsplash.jpg"
  },
  {
    name: "Nalanda",
    location: "Historic Buddhist University",
    img: "raju-kumar-di04090zyto-unsplash.jpg"
  },
  {
    name: "Rajgir",
    location: "Vishwa Shanti Stupa & Hot Springs",
    img: "gaurav-yadav-zCC4s0No0tU-unsplash.jpg"
  },
  {
    name: "Sasaram",
    location: "Tomb of Sher Shah Suri",
    img: "mohammad-dilshad-0Khd6pEcFw4-unsplash.jpg"
  },
  {
    name: "Varanasi",
    location: "Kashi Vishwanath Temple & Ganga Aarti",
    img: "martijn-vonk-wloNuC7qKf8-unsplash.jpg"
  },
  {
    name: "Ayodhya",
    location: "Shri Ram Janmabhoomi Temple",
    img: "karan-suthar-Id45_z8-EiU-unsplash.jpg"
  }
];

// WhatsApp link generator
function createWhatsAppLink(packageName) {
  const message = encodeURIComponent(
    `Hello! I want to enquire about the ${packageName} travel package. Please share details.`
  );
  return `https://wa.me/${whatsappNumber}?text=${message}`;
}

// Render packages
function renderPackages() {
  const container = document.getElementById("packages-container");
  container.innerHTML = "";

  packages.forEach(pkg => {
    const box = document.createElement("div");
    box.className = "box";

    box.innerHTML = `
      <img src="${pkg.img}" alt="${pkg.name}">
      <div class="content">
        <h3><i class="fas fa-map-marker-alt"></i> ${pkg.name}</h3>
        <p>${pkg.location}</p>

        <p class="note">
          Custom tour packages available on request.
        </p>

        <a href="${createWhatsAppLink(pkg.name)}" 
           class="btn" 
           target="_blank">
           Get Quote on WhatsApp
        </a>
      </div>
    `;

    container.appendChild(box);
  });
}

// Init
renderPackages();




var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
document.getElementById("search-bar").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    let query = this.value.toLowerCase().trim();

    if (query.includes("home")) {
      document.querySelector("#home").scrollIntoView({ behavior: "smooth" });
    } 
    else if (query.includes("book")) {
      document.querySelector("#book").scrollIntoView({ behavior: "smooth" });
    } 
    else if (query.includes("package")) {
      document.querySelector("#packages").scrollIntoView({ behavior: "smooth" });
    } 
    else if (query.includes("service")) {
      document.querySelector("#services").scrollIntoView({ behavior: "smooth" });
    } 
    else if (query.includes("gallery")) {
      document.querySelector("#gallery").scrollIntoView({ behavior: "smooth" });
    } 
    else if (query.includes("review")) {
      document.querySelector("#review").scrollIntoView({ behavior: "smooth" });
    } 
    else if (query.includes("contact")) {
      document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    } 
    else {
      alert("No matching section found");
    }

    this.value = "";
  }
});
// Packages data for Patna → listed cities
// Bihar airports list
const biharAirports = ["Gaya", "Patna", "Bhagalpur", "Aurangabad"];

// Packages data for Patna → listed cities
const pawanPackages = [];

// Cities list
const cities = [
  "Gaya","Muzaffarpur","Siwan","Darbhanga","Buxar","Ara",
  "Sitamarhi","Bhagalpur","BiharSharif","Hajipur","Aurangabad",
  "Varanasi","Ayodhya"
];

// Categories
const categories = ["airport","oneway","roundtrip"];

// Generate packages dynamically
let id = 1;
cities.forEach(city => {
  categories.forEach(cat => {
    // Airport Taxi only if city has airport
    if(cat === "airport" && !biharAirports.includes(city)) return;
    pawanPackages.push({
      id: id++,
      name: `Patna → ${city} ${cat === "airport" ? "Airport Taxi" : cat === "oneway" ? "One Way Trip" : "Round Trip"}`,
      category: cat,
      city: city
    });
  });
});

// Grab DOM elements
const packagesContainer = document.getElementById("pawan-packages-container");
const categoryBtns = document.querySelectorAll(".pawan-city-packages .category-buttons button");
const cityBtns = document.querySelectorAll(".pawan-city-packages .city-buttons button");

let selectedCategory = "";
let selectedCity = "";

// Display packages without price
function displayPackages(filteredPackages) {
  packagesContainer.innerHTML = "";
  if(filteredPackages.length === 0) {
    packagesContainer.innerHTML = "<p>No packages found for selected category/city.</p>";
    return;
  }

  filteredPackages.forEach(pkg => {
    const div = document.createElement("div");
    div.className = "box";
    div.innerHTML = `<h3>${pkg.name}</h3>`;
    packagesContainer.appendChild(div);
  });
}

// Initial display: all packages
displayPackages(pawanPackages);

// Category button click
categoryBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
    filterPackages();
  });
});

// City button click
cityBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    cityBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCity = btn.dataset.city;
    filterPackages();
  });
});

// Filter function
function filterPackages() {
  const filtered = pawanPackages.filter(pkg => {
    return (!selectedCategory || pkg.category === selectedCategory) &&
           (!selectedCity || pkg.city === selectedCity);
  });

  displayPackages(filtered);
}
/* =========================================
   FINAL PRODUCTION READY FUNCTIONS
   (NO PRICE ESTIMATION)
   ========================================= */
/* ================================
   MONGODB + WHATSAPP (FINAL)
   ================================ */

/* Toast */
function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.cssText = `
    position:fixed;
    bottom:20px;
    right:20px;
    background:#222;
    color:#fff;
    padding:12px 18px;
    border-radius:6px;
    z-index:9999;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* Date Validation */
function validateDates(arrival, leaving) {
  if (new Date(leaving) <= new Date(arrival)) {
    showToast("❌ Leaving date must be after arrival date");
    return false;
  }
  return true;
}

/* WhatsApp Sender */
function sendBookingToWhatsApp(data) {
  const msg = encodeURIComponent(
`🚕 *New Booking Request*
📍 Place: ${data.place}
👥 Guests: ${data.guests}
📅 Arrival: ${data.arrival}
📅 Leaving: ${data.leaving}
📞 Please confirm booking`
  );
  window.open(`https://wa.me/918340606361?text=${msg}`, "_blank");
}
