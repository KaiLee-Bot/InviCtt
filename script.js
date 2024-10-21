document.getElementById("gmailForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const gmail = document.getElementById("gmail").value;

    fetch("/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ gmail }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("status").textContent = data.message;
    })
    .catch(error => {
        document.getElementById("status").textContent = "Erro ao enviar email.";
    });
});
