function checkInputs() {
	let emailInput = document.getElementById("regEmail");
	let passwordInput = document.getElementById("regPassword");
	let fullNameInput = document.getElementById("regFullName");
	let countryInput = document.getElementById("regCountry");
	let birthdateInput = document.getElementById("regBirthdate");
	let profiles = loadProfiles();

	for (let i = 0; i < profiles.length; i++) {
		if (emailInput.value == profiles[i].email) {
			document.getElementById("wrongReg").innerHTML = "This email is already registered, use another one.";
			return;
		}
	}
	console.log(emailInput.value);
	if (emailInput.value == "" || passwordInput.value == "" || fullNameInput.value == "" || countryInput.value == "" || birthdateInput.value == "") {
			document.getElementById("wrongReg").innerHTML = "Fill in all the empty input cells.";
			return;		
	}

	saveProfile();
}

function saveProfile() {
	let emailInput = document.getElementById("regEmail");
	let passwordInput = document.getElementById("regPassword");
	let fullNameInput = document.getElementById("regFullName");
	let countryInput = document.getElementById("regCountry");
	let birthdateInput = document.getElementById("regBirthdate");

	let obj = {
		"email": emailInput.value,
		"password": passwordInput.value,
		"fullName": fullNameInput.value,
		"country": countryInput.value,
		"birthdate": birthdateInput.value
	};
	addProfile(obj);

	window.location = "login.html";
}

function addProfile(profile) {
	let profiles = loadProfiles();
	profiles.push(profile);
	localStorage.setItem("profiles", JSON.stringify(profiles));
}

function loadProfiles() {
	let profiles = localStorage.getItem("profiles");
	if (profiles != null) {
		profiles = JSON.parse(profiles);
	} else {
		profiles = [];
	}
	return profiles;
}

function login() {
	let emailLog = document.getElementById("logEmail");
	let passwordLog = document.getElementById("logPassword");

	let profiles = loadProfiles();
	for (let i = 0; i < profiles.length; i++) {
		if (profiles[i].email == emailLog.value && profiles[i].password == passwordLog.value) {
			selectProfile(i);
			window.location = "profile.html";
			return;
		}
	}
	document.getElementById("wrongAnswer").innerHTML = "Wrong email or password";
}

function selectProfile(i) {
	let profiles = loadProfiles();
	let profile = profiles[i];
	localStorage.setItem("profile", JSON.stringify(profile));
}

function loadProfile() {
	let profile = localStorage.getItem("profile");
	if (profile != null) {
		profile = JSON.parse(profile);
		return profile;
	} else {
			window.location = "login.html";		
	}
}

function profileInfoDiv() {
	let profile = loadProfile();

	if (profile == null)
		window.location = "login.html";

	document.getElementById("profileBarName").innerHTML = "" + profile.fullName;
	document.getElementById("showProfileName").innerHTML = "Welcome " + profile.fullName;
	document.getElementById("profileInfoEmail").innerHTML = profile.email;
	document.getElementById("profileInfoFullName").innerHTML = profile.fullName;
	document.getElementById("profileInfoCountry").innerHTML = profile.country;
	document.getElementById("profileInfoBirthdate").innerHTML = profile.birthdate;
}

function logout() {
	localStorage.setItem("profile", null);
}
