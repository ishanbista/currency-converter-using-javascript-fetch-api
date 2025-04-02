const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");

// Function to get country code from currency code
const getCountryCode = (currency) => {
    const currencyToCountry = {
        USD: "us", NPR: "np", EUR: "eu", GBP: "gb", JPY: "jp",
        INR: "in", AUD: "au", CAD: "ca", CNY: "cn", CHF: "ch"
    };
    return currencyToCountry[currency] || "us";
};

// Fetch currency list and populate dropdowns
fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then(res => res.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            fromCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
            toCurrency.innerHTML += `<option value="${currency}">${currency}</option>`;
        });
        fromCurrency.value = "USD";
        toCurrency.value = "NPR";
    });

// Function to update flag when currency changes
const updateFlag = (element, flagElement) => {
    flagElement.src = `https://flagcdn.com/w40/${getCountryCode(element.value)}.png`;
};

fromCurrency.addEventListener("change", () => updateFlag(fromCurrency, fromFlag));
toCurrency.addEventListener("change", () => updateFlag(toCurrency, toFlag));

// Function to convert currency
function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amt = amount.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[to];
            const convertedAmount = (amt * rate).toFixed(2);
            result.innerText = `${amt} ${from} = ${convertedAmount} ${to}`;
        })
        .catch(err => {
            result.innerText = "Error fetching exchange rate!";
            console.error(err);
        });
}
