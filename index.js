let userForm = document.getElementById("user-form");
const retriveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};
let userEntries = retriveEntries();
const displayEntries = () => {
  const entries = retriveEntries();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td>${entry.name}</td>`;
      const emailCell = `<td>${entry.email}</td>`;
      const passwordCell = `<td>${entry.password}</td>`;
      const dobCell = `<td>${entry.dob}</td>`;
      const acceptTermsCell = `<td>${entry.acceptTerms}</td>`;
      const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");
  const table = `<table></tr>
    <th>name</th>
    <th>email</th>
    <th>password</th>
    <th>dob</th>
    <th>accept terms?</th>
    </tr>${tableEntries}</table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};
const saveUserFrom = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  const entry = {
    name,
    email,
    password,
    dob,
    acceptTerms,
  };
  userEntries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};
userForm.addEventListener("submit", saveUserFrom);
displayEntries();
//birth day
function getAge(today, birthDate) {
  // var today = new Date();
  // var birthDate = new Date(DOB);

  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

let dateELE = document.getElementById("dob");

dateELE.addEventListener("change", () => {
  let [year, month, date] = document.getElementById("dob").value.split("-");

  let dob = new Date(year, month, date);
  let Today = new Date();

  age = getAge(Today, dob);

  dateELE.style.border = "2px solid rgba(0, 0, 0, 0.4)";
  if (age < 18 || age > 55) {
    dateELE.setCustomValidity("Your age is not lies between 18 and 55");
    dateELE.style.border = "2px solid red";
    return;
  } else {
    dateELE.setCustomValidity("");
  }
});

const email = document.getElementById("email");

email.addEventListener("input", () => validate(email));

function validate(ele) {
  if (ele.validity.typeMismatch) {
    ele.setCustomValidity("The Email is not in the right format!!!");
    ele.reportValidity();
  } else {
    ele.setCustomValidity("");
  }
}
