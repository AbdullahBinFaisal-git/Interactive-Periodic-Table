// ---------- Data ----------
const PERIODIC_TABLE_DATA = [
    { name: "Hydrogen", symbol: "H", number: 1, mass: 1.008, category: "nonmetal", xpos: 1, ypos: 1, description: "Lightest element." },
    { name: "Helium", symbol: "He", number: 2, mass: 4.0026, category: "noble-gas", xpos: 18, ypos: 1, description: "Inert noble gas." },
    // (rest of elements unchanged)
];

// ---------- Category Names ----------
const CATEGORY_MAP = {
    "alkali-metal": "Alkali Metals",
    "alkaline-earth-metal": "Alkaline Earth Metals",
    "transition-metal": "Transition Metals",
    "post-transition-metal": "Post-Transition Metals",
    "metalloid": "Metalloids",
    "nonmetal": "Other Nonmetals",
    "halogen": "Halogens",
    "noble-gas": "Noble Gases",
    "lanthanide": "Lanthanides",
    "actinide": "Actinides"
};

// ---------- DOM ----------
const table = document.getElementById("periodicTable");
const tooltip = document.getElementById("elementTooltip");
const modal = document.getElementById("elementModal");
const darkToggle = document.getElementById("darkModeToggle");

// ---------- Render ----------
function renderTable() {
    PERIODIC_TABLE_DATA.forEach(el => {
        const tile = document.createElement("div");
        tile.className = `element-tile category-${el.category}`;
        tile.style.gridColumn = el.xpos;
        tile.style.gridRow = el.ypos;

        tile.innerHTML = `
            <span class="atomic-number">${el.number}</span>
            <span class="symbol">${el.symbol}</span>
            <span class="name">${el.name}</span>
        `;

        tile.addEventListener("mousemove", e => showTooltip(e, el));
        tile.addEventListener("mouseleave", hideTooltip);
        tile.addEventListener("click", () => showModal(el));

        table.appendChild(tile);
    });
}

// ---------- Tooltip ----------
function showTooltip(e, el) {
    tooltip.style.left = e.clientX + 15 + "px";
    tooltip.style.top = e.clientY + "px";
    tooltip.innerHTML = `<strong>${el.name}</strong><br>Mass: ${el.mass}`;
    tooltip.style.opacity = 1;
}

function hideTooltip() {
    tooltip.style.opacity = 0;
}

// ---------- Modal ----------
function showModal(el) {
    modal.style.display = "block";
    document.getElementById("modalName").textContent = el.name;
    document.getElementById("modalNumber").textContent = el.number;
    document.getElementById("modalSymbol").textContent = el.symbol;
    document.getElementById("modalMass").textContent = el.mass;
    document.getElementById("modalCategory").textContent = CATEGORY_MAP[el.category];
    document.getElementById("modalDescription").textContent = el.description;
}

document.querySelector(".close-button").onclick = () => modal.style.display = "none";

// ---------- Dark Mode ----------
darkToggle.onclick = () => {
    document.body.classList.toggle("dark-mode");
    darkToggle.textContent =
        document.body.classList.contains("dark-mode")
            ? "Disable Dark Mode"
            : "Enable Dark Mode";
};

// ---------- Init ----------
document.addEventListener("DOMContentLoaded", renderTable);

