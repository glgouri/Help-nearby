function showAdmin() {
  const container = document.getElementById("rightColumn");
  container.innerHTML = `
    <h2>Admin - Add Organization</h2>
    <form id="orgForm">
      <input type="text" id="orgName" placeholder="Organization Name" required><br><br>
      <select id="orgCategory" required>
        <option value="">Select Category</option>
        <option value="food">Food</option>
        <option value="clothes">Clothes</option>
        <option value="shelter">Shelter</option>
      </select><br><br>
      <input type="text" id="orgLocation" placeholder="Location" required><br><br>
      <input type="text" id="orgContact" placeholder="Contact Info" required><br><br>
      <button type="submit">Add Organization</button>
    </form>
  `;

  document.getElementById("orgForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const newOrg = {
      name: document.getElementById("orgName").value,
      category: document.getElementById("orgCategory").value,
      location: document.getElementById("orgLocation").value,
      contact: document.getElementById("orgContact").value,
    };

    let orgs = JSON.parse(localStorage.getItem("orgs")) || [];
    orgs.push(newOrg);
    localStorage.setItem("orgs", JSON.stringify(orgs));

    alert("Organization added!");
    e.target.reset();
  });
}

function showUser() {
  const container = document.getElementById("rightColumn");
  container.innerHTML = `
    <h2>User - Search Organizations</h2>
    <input type="text" id="searchLocation" placeholder="Search by location...">
    <select id="searchCategory">
      <option value="all">All</option>
      <option value="food">Food</option>
      <option value="clothes">Clothes</option>
      <option value="shelter">Shelter</option>
    </select>
    <button onclick="filterOrgs()">Search</button>

    <div id="orgList" style="margin-top: 20px;"></div>
  `;

  displayOrgs(JSON.parse(localStorage.getItem("orgs")) || []);
}

function filterOrgs() {
  const location = document.getElementById("searchLocation").value.toLowerCase();
  const category = document.getElementById("searchCategory").value;
  const allOrgs = JSON.parse(localStorage.getItem("orgs")) || [];

  const filtered = allOrgs.filter((org) => {
    const matchesLocation = org.location.toLowerCase().includes(location);
    const matchesCategory = category === "all" || org.category === category;
    return matchesLocation && matchesCategory;
  });

  displayOrgs(filtered);
}

function displayOrgs(orgs) {
  const list = document.getElementById("orgList");
  list.innerHTML = "";

  if (orgs.length === 0) {
    list.innerHTML = "<p>No organizations found.</p>";
    return;
  }

  orgs.forEach((org) => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
      <h3>${org.name}</h3>
      <p><strong>Category:</strong> ${org.category}</p>
      <p><strong>Location:</strong> ${org.location}</p>
      <p><strong>Contact:</strong> ${org.contact}</p>
      <button onclick="openDonateForm('${org.name}')">💸 Donate Money</button>
    `;
    list.appendChild(card);
  });
}

// 💳 Donation modal logic
function openDonateForm(orgName) {
  document.getElementById("donateOrgName").textContent = orgName;
  document.getElementById("donationAmount").value = "";
  document.getElementById("donationModal").style.display = "block";
}

function closeDonateForm() {
  document.getElementById("donationModal").style.display = "none";
}

function submitDonation() {
  const amount = document.getElementById("donationAmount").value;
  if (!amount || amount <= 0) {
    alert("Please enter a valid donation amount.");
    return;
  }
  alert("Thank you for your ₹" + amount + " donation! (Demo only)");
  closeDonateForm();
}
