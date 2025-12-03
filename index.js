$("#submit-btn").on("click", async () => {
    const url = $("#basic-url").val().trim();

    if (!url) {
        return alert("Please enter a URL");
    }

    const res = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (data.error) {
        alert(`Error: ${data.error}`);
    }
    else {
        alert(`QR Code created: ${data.filename}`);
    }
});