
"use strict";

// Amino acid information database
const aminoAcids = [
    {
        name: "Alanine", three: "Ala", one: "A",
        formula: "C3H7NO2", mass: 89.09,
        category: "Nonpolar", categories: ["Nonpolar"],
        essential: "No",
        function: "Participates in protein formation and helps transport nitrogen between tissues."
    },
    {
        name: "Arginine", three: "Arg", one: "R",
        formula: "C6H14N4O2", mass: 174.20,
        category: "Basic", categories: ["Basic"],
        essential: "Conditionally essential",
        function: "Supports the urea cycle and serves as a precursor for nitric oxide."
    },
    {
        name: "Asparagine", three: "Asn", one: "N",
        formula: "C4H8N2O3", mass: 132.12,
        category: "Polar", categories: ["Polar"],
        essential: "No",
        function: "Participates in protein structure and is important in protein N-linked glycosylation."
    },
    {
        name: "Aspartic Acid", three: "Asp", one: "D",
        formula: "C4H7NO4", mass: 133.10,
        category: "Acidic", categories: ["Acidic", "Polar"],
        essential: "No",
        function: "Participates in metabolism and serves as a building block for proteins."
    },
    {
        name: "Cysteine", three: "Cys", one: "C",
        formula: "C3H7NO2S", mass: 121.16,
        category: "Polar", categories: ["Polar"],
        essential: "Conditionally essential",
        function: "Forms disulfide bonds that help stabilize protein structure."
    },
    {
        name: "Glutamic Acid", three: "Glu", one: "E",
        formula: "C5H9NO4", mass: 147.13,
        category: "Acidic", categories: ["Acidic", "Polar"],
        essential: "No",
        function: "Plays roles in nitrogen metabolism and acts as an excitatory neurotransmitter."
    },
    {
        name: "Glutamine", three: "Gln", one: "Q",
        formula: "C5H10N2O3", mass: 146.14,
        category: "Polar", categories: ["Polar"],
        essential: "Conditionally essential",
        function: "Transports nitrogen and supplies fuel and nitrogen for several cells and metabolic pathways."
    },
    {
        name: "Glycine", three: "Gly", one: "G",
        formula: "C2H5NO2", mass: 75.07,
        category: "Nonpolar", categories: ["Nonpolar"],
        essential: "No",
        function: "Its small side chain allows flexibility in proteins and is abundant in collagen."
    },
    {
        name: "Histidine", three: "His", one: "H",
        formula: "C6H9N3O2", mass: 155.15,
        category: "Basic", categories: ["Basic"],
        essential: "Yes",
        function: "Supports protein function and is the precursor of histamine."
    },
    {
        name: "Isoleucine", three: "Ile", one: "I",
        formula: "C6H13NO2", mass: 131.17,
        category: "Nonpolar", categories: ["Nonpolar"],
        essential: "Yes",
        function: "A branched-chain amino acid involved in muscle metabolism and energy production."
    },
    {
        name: "Leucine", three: "Leu", one: "L",
        formula: "C6H13NO2", mass: 131.17,
        category: "Nonpolar", categories: ["Nonpolar"],
        essential: "Yes",
        function: "A branched-chain amino acid involved in muscle protein synthesis."
    },
    {
        name: "Lysine", three: "Lys", one: "K",
        formula: "C6H14N2O2", mass: 146.19,
        category: "Basic", categories: ["Basic"],
        essential: "Yes",
        function: "Contributes to protein synthesis and collagen formation."
    },
    {
        name: "Methionine", three: "Met", one: "M",
        formula: "C5H11NO2S", mass: 149.21,
        category: "Nonpolar", categories: ["Nonpolar"],
        essential: "Yes",
        function: "A sulfur-containing amino acid and the usual initiating amino acid in protein synthesis."
    },
    {
        name: "Phenylalanine", three: "Phe", one: "F",
        formula: "C9H11NO2", mass: 165.19,
        category: "Aromatic", categories: ["Aromatic", "Nonpolar"],
        essential: "Yes",
        function: "An aromatic amino acid and precursor of tyrosine."
    },
    {
        name: "Proline", three: "Pro", one: "P",
        formula: "C5H9NO2", mass: 115.13,
        category: "Nonpolar", categories: ["Nonpolar"],
        essential: "No",
        function: "Its cyclic side chain influences protein folding and is important in collagen."
    },
    {
        name: "Serine", three: "Ser", one: "S",
        formula: "C3H7NO3", mass: 105.09,
        category: "Polar", categories: ["Polar"],
        essential: "No",
        function: "Participates in metabolism and occurs in the active sites of many enzymes."
    },
    {
        name: "Threonine", three: "Thr", one: "T",
        formula: "C4H9NO3", mass: 119.12,
        category: "Polar", categories: ["Polar"],
        essential: "Yes",
        function: "Contributes to protein structure and is important in mucin proteins."
    },
    {
        name: "Tryptophan", three: "Trp", one: "W",
        formula: "C11H12N2O2", mass: 204.23,
        category: "Aromatic", categories: ["Aromatic", "Nonpolar"],
        essential: "Yes",
        function: "An aromatic amino acid and precursor of serotonin, melatonin and niacin."
    },
    {
        name: "Tyrosine", three: "Tyr", one: "Y",
        formula: "C9H11NO3", mass: 181.19,
        category: "Aromatic", categories: ["Aromatic", "Polar"],
        essential: "Conditionally essential",
        function: "A precursor of catecholamines, thyroid hormones and melanin."
    },
    {
        name: "Valine", three: "Val", one: "V",
        formula: "C5H11NO2", mass: 117.15,
        category: "Nonpolar", categories: ["Nonpolar"],
        essential: "Yes",
        function: "A branched-chain amino acid involved in muscle metabolism and tissue repair."
    }
];

// Find HTML elements
const aminoGrid = document.getElementById("aminoGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.getElementById("filterButtons");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const detailModal = document.getElementById("detailModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

let activeFilter = "All";

// Display amino acid cards
function displayAminoAcids() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredAcids = aminoAcids.filter(acid => {
        const matchesSearch = [
            acid.name,
            acid.three,
            acid.one,
            acid.formula,
            acid.category
        ].some(value => value.toLowerCase().includes(searchTerm));

        const matchesFilter =
            activeFilter === "All" ||
            acid.categories.includes(activeFilter);

        return matchesSearch && matchesFilter;
    });

    aminoGrid.innerHTML = "";

    filteredAcids.forEach(acid => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "amino-card";
        card.setAttribute(
            "aria-label",
            `View details for ${acid.name}`
        );

        // Safe text insertion for database values
        const top = document.createElement("div");
        top.className = "card-top";

        const letter = document.createElement("span");
        letter.className = "letter-badge";
        letter.textContent = acid.one;

        const category = document.createElement("span");
        category.className = "category-badge";
        category.textContent = acid.category;

        top.append(letter, category);

        const heading = document.createElement("h3");
        heading.textContent = acid.name;

        const code = document.createElement("p");
        code.className = "three-letter";
        code.textContent = `${acid.three} · ${acid.one}`;

        const divider = document.createElement("hr");
        divider.className = "card-divider";

        const mass = createProperty("Molecular mass", `${acid.mass.toFixed(2)} Da`);
        const essential = createProperty("Essential", acid.essential);

        const view = document.createElement("span");
        view.className = "view-details";
        view.textContent = "View details →";

        card.append(top, heading, code, divider, mass, essential, view);

        card.addEventListener("click", () => showDetails(acid));
        aminoGrid.appendChild(card);
    });

    resultCount.textContent =
        `${filteredAcids.length} amino acid${filteredAcids.length !== 1 ? "s" : ""}`;

    noResults.hidden = filteredAcids.length !== 0;
}

// Build a small property row
function createProperty(label, value) {
    const row = document.createElement("div");
    row.className = "card-property";

    const labelElement = document.createElement("span");
    labelElement.textContent = label;

    const valueElement = document.createElement("strong");
    valueElement.textContent = value;

    row.append(labelElement, valueElement);
    return row;
}

// Display complete details in the popup
function showDetails(acid) {
    modalBody.replaceChildren();

    const header = document.createElement("div");
    header.className = "detail-header";

    const badge = document.createElement("span");
    badge.className = "letter-badge";
    badge.textContent = acid.one;

    const title = document.createElement("h2");
    title.id = "modalName";
    title.textContent = acid.name;

    const code = document.createElement("p");
    code.className = "detail-letter";
    code.textContent =
        `Three-letter code: ${acid.three} | One-letter code: ${acid.one}`;

    header.append(badge, title, code);

    const table = document.createElement("table");
    table.className = "detail-table";

    const properties = [
        ["Full name", acid.name],
        ["Three-letter code", acid.three],
        ["One-letter code", acid.one],
        ["Molecular formula", acid.formula],
        ["Molecular mass", `${acid.mass.toFixed(2)} g/mol`],
        ["Main category", acid.category],
        ["Other categories", acid.categories.join(", ")],
        ["Essential status", acid.essential]
    ];

    properties.forEach(([label, value]) => {
        const row = document.createElement("tr");
        const heading = document.createElement("td");
        const data = document.createElement("td");

        heading.textContent = label;
        data.textContent = value;

        row.append(heading, data);
        table.appendChild(row);
    });

    const description = document.createElement("div");
    description.className = "detail-description";

    const functionHeading = document.createElement("h3");
    functionHeading.textContent = "Biological function";

    const functionText = document.createElement("p");
    functionText.textContent = acid.function;

    description.append(functionHeading, functionText);
    modalBody.append(header, table, description);

    detailModal.hidden = false;
    closeModal.focus();
}

// Search as the user types
searchInput.addEventListener("input", displayAminoAcids);

// Change category filter
filterButtons.addEventListener("click", event => {
    const button = event.target.closest("button[data-filter]");

    if (!button) return;

    activeFilter = button.dataset.filter;

    filterButtons.querySelectorAll(".filter-btn").forEach(btn => {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
    });

    displayAminoAcids();
});

// Close popup
function hideDetails() {
    detailModal.hidden = true;
}

closeModal.addEventListener("click", hideDetails);

detailModal.addEventListener("click", event => {
    if (event.target === detailModal) {
        hideDetails();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !detailModal.hidden) {
        hideDetails();
    }
});

// Load all 20 amino acids when the website opens
displayAminoAcids();
