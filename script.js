const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event listener untuk tombol hitung kecepatan
document.getElementById('startButton').addEventListener('click', function() {
    const particleCount = parseInt(document.getElementById('particleCount').value);
    const pressure = parseFloat(document.getElementById('pressure').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const windSpeed = parseFloat(document.getElementById('windSpeed').value);

    // Hitung kecepatan partikel
    const particleSpeed = calculateParticleSpeed(particleCount, pressure, temperature, windSpeed);
    
    // Tampilkan hasil
    document.getElementById('result').innerText = `Kecepatan rata-rata partikel: ${particleSpeed.toFixed(2)} m/s`;

    // Simulasi pergerakan partikel menggunakan metode Euler
    simulateParticleMovement(particleSpeed);
});

// Fungsi untuk menghitung kecepatan partikel
function calculateParticleSpeed(particleCount, pressure, temperature, windSpeed) {
    const gasConstant = 287.05; // J/(kg·K) untuk udara
    const absoluteTemperature = temperature + 273.15; // Konversi ke Kelvin

    // Menggunakan rumus kecepatan partikel
    const speed = (pressure / (gasConstant * absoluteTemperature)) + windSpeed;

    return speed;
}

// Fungsi untuk mensimulasikan pergerakan partikel menggunakan metode Euler
function simulateParticleMovement(initialSpeed) {
    const timeStep = 0.1; // Interval waktu untuk metode Euler
    let position = 0; // Posisi awal
    let speed = initialSpeed; // Kecepatan awal

    // Bersihkan kanvas sebelum menggambar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(); // Gambar latar belakang

    // Simulasi selama 10 detik
    let totalTime = 10; // Total waktu simulasi
    let time = 0; // Waktu saat ini

    const interval = setInterval(() => {
        if (time >= totalTime) {
            clearInterval(interval); // Hentikan simulasi setelah 10 detik
            return;
        }

        // Update posisi menggunakan metode Euler
        position += speed * timeStep;

        // Gambar posisi partikel di kanvas
        drawParticle(position);

        // Update waktu
        time += timeStep;
    }, timeStep * 1000); // Konversi ke milidetik
}

// Fungsi untuk menggambar partikel
function drawParticle(position) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + position, canvas.height / 2, 5, 0, Math.PI * 2);
    ctx.fill();
}

// Fungsi untuk menggambar latar belakang (Tata Surya)
function drawBackground() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gambar Matahari
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.fill();

    // Gambar planet (contoh)
    ctx.fillStyle = 'blue'; // Planet Biru
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + 100, canvas.height / 2, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'red'; // Planet Merah
    ctx.beginPath();
    ctx.arc(canvas.width / 2 - 150, canvas.height / 2, 30, 0, Math.PI * 2);
    ctx.fill();
}

// Gambar latar belakang saat halaman dimuat
drawBackground();

// Mengatur ukuran kanvas saat jendela diubah ukurannya
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground(); // Gambar ulang latar belakang saat ukuran kanvas berubah
});