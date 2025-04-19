const userForm = document.getElementById("user-form");

const setMinMaxDOB = () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    document.getElementById("dob").setAttribute("min", minDate.toISOString().split("T")[0]);
    document.getElementById("dob").setAttribute("max", maxDate.toISOString().split("T")[0]);
};

setMinMaxDOB();


const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();
    const tableRows = entries.map((entry) => {
        return `
      <tr class="even:bg-gray-100">
        <td class="border px-4 py-2">${entry.name}</td>
        <td class="border px-4 py-2">${entry.email}</td>
        <td class="border px-4 py-2">${entry.password}</td>
        <td class="border px-4 py-2">${entry.dob}</td>
        <td class="border px-4 py-2">${entry.acceptedTermsAndconditions ? "True" : "False"}</td>
      </tr>
    `;
    }).join("");

    const table = `
    <table class="w-full table-auto text-sm border-collapse border border-gray-300">
      <thead class="bg-indigo-100">
        <tr>
          <th class="border px-4 py-2 text-left">Name</th>
          <th class="border px-4 py-2 text-left">Email</th>
          <th class="border px-4 py-2 text-left">Password</th>
          <th class="border px-4 py-2 text-left">DOB</th>
          <th class="border px-4 py-2 text-left">Terms</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

    document.getElementById("user-entries").innerHTML = table;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;

    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    const isBirthdayPassed = m > 0 || (m === 0 && today.getDate() >= birthDate.getDate());
    const actualAge = isBirthdayPassed ? age : age - 1;

    if (actualAge < 18 || actualAge > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    const entry = { name, email, password, dob, acceptedTermsAndconditions };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
    userForm.reset();
};


userForm.addEventListener("submit", saveUserForm);
displayEntries();
