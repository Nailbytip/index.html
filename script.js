document.getElementById("year").textContent = new Date().getFullYear();

const updated = new Date().toLocaleDateString(undefined, { year:"numeric", month:"short", day:"numeric" });
document.getElementById("updatedPill").textContent = `Updated: ${updated}`;
