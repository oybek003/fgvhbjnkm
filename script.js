const button = document.querySelector("#button");
const main = document.getElementById("main");

button.addEventListener("click", () => {
    fetch("https://ipinfo.io/json?token=0ba1295081c52d")
        .then((response) => response.json())
        .then((jsonResponse) => {
            console.log("IP ma'lumotlari:", jsonResponse);

            const { country, city, loc, ip } = jsonResponse;

            let lat = "Noma'lum";
            let lon = "Noma'lum";
            let mapHTML = "<p style='color:red;'>Koordinatalar topilmadi!</p>";

            if (loc) {
                [lat, lon] = loc.split(","); // Оставляем точные координаты
                mapHTML = `
                    <iframe 
                        width="100%" 
                        height="400px" 
                        frameborder="0" 
                        style="border:0" 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=${lon},${lat},${lon},${lat}&layer=mapnik&marker=${lat},${lon}" 
                        allowfullscreen>
                    </iframe>
                `;
            }

            main.innerHTML = `
                <p><strong>IP Manzil:</strong> ${ip}</p>
                <p><strong>Mamlakat:</strong> ${country}</p>
                <p><strong>Shahar:</strong> ${city}</p>
                <p><strong>Koordinatalar:</strong> ${lat} (kenglik), ${lon} (uzunlik)</p>
                ${mapHTML}
            `;
        })
        .catch((error) => {
            console.error("IP orqali aniqlashda xatolik:", error);
            main.innerHTML = `<p style="color:red;">Xatolik: ${error.message}</p>`;
        });
});
