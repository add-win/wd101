document.addEventListener("DOMContentLoaded", () => {
  setMinMaxDOB();
  displayEntries();
  document.getElementById("user-form").addEventListener("submit", saveUserForm);
});

function setMinMaxDOB() {
  const today = new Date();
  const min = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
  const max = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const dobInput = document.getElementById("dob");
  dobInput.min = min.toISOString().split("T")[0];
  dobInput.max = max.toISOString().split("T")[0];
}

function retrieveEntries() {
  return JSON.parse(localStorage.getItem("user-entries") || "[]");
}

function displayEntries() {
  const entries = retrieveEntries();
  const table = `
    <table class="w-full border border-gray-300 text-sm text-left">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-4 py-2">Name</th>
          <th class="border px-4 py-2">Email</th>
          <th class="border px-4 py-2">Password</th>
          <th class="border px-4 py-2">Dob</th>
          <th class="border px-4 py-2">Accepted terms?</th>
        </tr>
      </thead>
      <tbody>
        ${entries.map(entry => `
          <tr>
            <td class="border px-4 py-2">${entry.name}</td>
            <td class="border px-4 py-2">${entry.email}</td>
            <td class="border px-4 py-2">${entry.password}</td>
            <td class="border px-4 py-2">${entry.dob}</td>
            <td class="border px-4 py-2">${entry.acceptedTermsAndconditions ? "Yes" : "No"}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
  document.getElementById("user-entries").innerHTML = table;
}

function saveUserForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;

  // Age check
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = { name, email, password, dob, acceptedTermsAndconditions };
  const entries = retrieveEntries();
  entries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(entries));

  displayEntries();
  document.getElementById("user-form").reset();
}
