


const cards = document.getElementById("cards");
const template = document.getElementById("cardTemplate");

function addRow(tbody, data = {}) {
  const tr = document.createElement("tr");
  const fields = ["responsibility","collaborator","thinking","property"];
  fields.forEach(key => {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.dataset.rowField = key;
    input.value = data[key] || "";
    const placeholders = {
      responsibility:"Ej. Mostrar información del curso",
      collaborator:"Ej. Departamento",
      thinking:"Ej. Conozco mi descripción",
      property:"Ej. Descripción"
    };
    input.placeholder = placeholders[key];
    td.appendChild(input); tr.appendChild(td);
  });
  const action = document.createElement("td");
  action.className = "no-print";
  const del = document.createElement("button");
  del.className = "row-delete"; del.textContent = "×"; del.title = "Eliminar fila";
  del.onclick = () => tr.remove();
  action.appendChild(del); tr.appendChild(action);
  tbody.appendChild(tr);
}

function addCard(data = {}) {
  const card = template.content.firstElementChild.cloneNode(true);
  card.querySelector('[data-field="className"]').value = data.className || "";
  card.querySelector('[data-field="superclasses"]').value = data.superclasses || "";
  card.querySelector('[data-field="subclasses"]').value = data.subclasses || "";
  const tbody = card.querySelector("tbody");
  const rows = data.rows?.length ? data.rows : [{},{},{},{}];
  rows.forEach(r => addRow(tbody, r));
  card.querySelector(".add-row").onclick = () => addRow(tbody);
  card.querySelector(".delete-card").onclick = () => {
    if (cards.children.length === 1) return alert("Debe existir al menos una tarjeta CRC.");
    card.remove();
  };
  cards.appendChild(card);
}

function getData() {
  return [...document.querySelectorAll(".crc-card")].map(card => ({
    className: card.querySelector('[data-field="className"]').value,
    superclasses: card.querySelector('[data-field="superclasses"]').value,
    subclasses: card.querySelector('[data-field="subclasses"]').value,
    rows: [...card.querySelectorAll("tbody tr")].map(tr => {
      const o = {};
      tr.querySelectorAll("[data-row-field]").forEach(i => o[i.dataset.rowField] = i.value);
      return o;
    })
  }));
}

document.getElementById("addCard").onclick = () => addCard();
document.getElementById("newCard").onclick = () => addCard();
document.getElementById("printPdf").onclick = () => window.print();

document.getElementById("saveFile").onclick = () => {
  const payload = {format:"CRC-Template-v1", savedAt:new Date().toISOString(), cards:getData()};
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "tarjetas-crc.json"; a.click();
  URL.revokeObjectURL(a.href);
};

document.getElementById("loadFile").addEventListener("change", async e => {
  const file = e.target.files[0]; if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    if (!Array.isArray(payload.cards)) throw new Error();
    cards.innerHTML = ""; payload.cards.forEach(addCard);
  } catch { alert("El archivo no contiene datos válidos de la plantilla CRC."); }
  e.target.value = "";
});

addCard();