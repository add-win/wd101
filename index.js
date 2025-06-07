document.addEventListener("DOMContentLoaded", () => {
    setMinMaxDOB();
    displayEntries();
    document.getElementById("user-form").addEventListener("submit", saveUserForm);
});

const setMinMaxDOB = () => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    const dobField = document.getElementById("dob");
    dobField.min = minDate.toISOString().split("T")[0];
    dobField.max = maxDate.toISOString().split("T")[0];
};

const retrieveEntries = () => {
    const entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};

const displayEntries = () => {
    const entries = retrieveEntries();
    const table = `
        <table class="w-full border text-sm text-left text-gray-700">
            <thead class="bg-indigo-100 text-indigo-800">
                <tr>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">DOB</th>
                    <th class="px-4 py-2">Accepted Terms?</th>
                </tr>
            </thead>
            <tbody>
                ${entries.map(entry => `
                    <tr class="border-t">
                        <td class="px-4 py-2">${entry.name}</td>
                        <td class="px-4 py-2">${entry.email}</td>
                        <td class="px-4 py-2">${entry.password}</td>
                        <td class="px-4 py-2">${entry.dob}</td>
                        <td class="px-4 py-2">${entry.acceptedTermsAndconditions ? "Yes" : "No"}</td>
                    </tr>`).join('')}
            </tbody>
        </table>
    `;
    document.getElementById("user-entries").innerHTML = table;
};

const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55 years.");
        return;
    }

    if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        alert("Please enter a valid email address.");
        return;
    }

    const newEntry = { name, email, password, dob, acceptedTermsAndconditions };
    const entries = retrieveEntries();
    entries.push(newEntry);
    localStorage.setItem("user-entries", JSON.stringify(entries));

    displayEntries();
    document.getElementById("user-form").reset();
};
