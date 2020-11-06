const btn = document.getElementById("btnGet"); 
btn.addEventListener("click", changeContent);

function changeContent()
{
    let message1 = document.getElementById("midtermMessage1");
    let message2 = document.getElementById("midtermMessage2");

    let x = message2.innerHTML = message1.innerText + " Ricardo"
}