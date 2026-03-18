function getFormData(){

const first = document.getElementById("firstName").value.trim();
const last = document.getElementById("lastName").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const reason = document.getElementById("reason").value.trim();

if(!first || !last || !email || !phone || !reason){
alert("Please fill all fields before contacting.");
return null;
}

return {
first,
last,
email,
phone,
reason
};

}



/* WHATSAPP */

function sendWhatsApp(){

const data = getFormData();
if(!data) return;

const message = encodeURIComponent(
`New Contact Request

Name: ${data.first} ${data.last}
Email: ${data.email}
Phone: ${data.phone}

Reason:
${data.reason}`
);

const phoneNumber = "919726462787";

const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;

window.open(whatsappURL,"_blank");

}



/* EMAIL */

function sendEmail(){

const data = getFormData();
if(!data) return;

const subject = "New Contact Request";

const body = `Name: ${data.first} ${data.last}

Email: ${data.email}

Phone: ${data.phone}

Reason:
${data.reason}`;

const emailAddress = "ronak.dagliya@gmail.com";

const mailtoLink =
`mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

window.location.href = mailtoLink;

}