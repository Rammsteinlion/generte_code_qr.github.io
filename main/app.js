const inputGenerae = document.getElementById("input__codes");
const button__generate = document.getElementById("button__generate");
const button__download = document.getElementById("download__wr");
const qrCodeContainer = document.getElementById("qrcode");
const modal_componen = document.querySelector(".modal_componen")

const button_modal = document.querySelector(".button_modal")
const icon_close_modal = document.querySelector(".close__modal")

window.onload = () => {
  let textGenerate = "";
  inputGenerae.addEventListener("input", function () {
    textGenerate = inputGenerae.value;
  });

  button__generate.addEventListener("click", function () {
    if (textGenerate == "" || textGenerate.length <= 4) {
      modal_componen.classList.add('show')
      return;
    }

    // Limpiar el contenedor de QR antes de generar uno nuevo
    qrCodeContainer.innerHTML = "";

    new QRCode(qrCodeContainer, {
      text: textGenerate,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
    downloadQr();
  });

  button_modal.addEventListener("click", function(){
    modal_componen.classList.remove('show')

  })
  icon_close_modal.addEventListener("click", function(){
    modal_componen.classList.remove('show')
    
  })

  // ... (código anterior igual)

function downloadQr() {
  if (qrCodeContainer.innerHTML !== "") {
    button__download.style.display = "block";
    button__download.style.opacity = 1;

    button__download.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      const qrCodeImage = qrCodeContainer.querySelector("img");
      if (!qrCodeImage) return;

      const imageUrl = qrCodeImage.src;
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "qr_code_" + Date.now() + ".png"; // Nombre único

      // Compatibilidad con iOS/Android
      document.body.appendChild(link);
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.open(imageUrl, "_blank");
      } else {
        link.click();
      }
      document.body.removeChild(link);
    });
  }
}
};
