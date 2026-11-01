const form = document.querySelector("#kontakt");
const wynik = document.querySelector("#wynik");

const inputImie = document.querySelector("#imie");
const inputEmail = document.querySelector("#email");
const inputWiadomosc = document.querySelector("#wiadomosc");

const errorImie = document.querySelector("#error-imie");
const errorEmail = document.querySelector("#error-email");
const errorWiadomosc = document.querySelector("#error-wiadomosc");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Czyszczenie poprzednich błędów
    errorImie.textContent = "";
    errorEmail.textContent = "";
    errorWiadomosc.textContent = "";
    wynik.textContent = "";

    inputImie.classList.remove("error-input");
    inputEmail.classList.remove("error-input");
    inputWiadomosc.classList.remove("error-input");

    let czyJestBledow = false;

    // Sprawdzanie imienia
    if (inputImie.value.trim() === "") {
        errorImie.textContent = "Pole imię jest wymagane!";
        inputImie.classList.add("error-input");
        czyJestBledow = true;
    }

    // Sprawdzanie e-maila
    if (!inputEmail.value.includes("@")) {
        errorEmail.textContent = "Wpisz poprawny adres e-mail (musi zawierać @)!";
        inputEmail.classList.add("error-input");
        czyJestBledow = true;
    }

    // Sprawdzanie wiadomości
    if (inputWiadomosc.value.trim().length < 10) {
        errorWiadomosc.textContent = "Wiadomość musi mieć co najmniej 10 znaków!";
        inputWiadomosc.classList.add("error-input");
        czyJestBledow = true;
    }

    // Jeśli są błędy, zatrzymujemy wysyłanie
    if (czyJestBledow) {
        return;
    }

    // Wysłanie danych, jeśli wszystko spoko
    try {
        const response = await fetch("zapis.php", {
            method: "POST",
            body: new FormData(form)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Wystąpił błąd.");
        }

        wynik.textContent = data.message;
        wynik.className = "success";
        form.reset();

    } catch (error) {
        wynik.textContent = error.message;
        wynik.className = "error";
    }
});