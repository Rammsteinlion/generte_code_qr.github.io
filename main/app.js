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

  function downloadQr() {
    if (qrCodeContainer.innerHTML != "") {
      button__download.style.display = "block";
      button__download.style.opacity = 1;

      // Agregar evento para descargar la imagen
      button__download.addEventListener("click", function () {
        const qrCodeImage = qrCodeContainer.querySelector("img");
        const imageUrl = qrCodeImage.src; 

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const newWidth = 300;
        const newHeight = 300;

        canvas.width = newWidth;
        canvas.height = newHeight;

        const img = new Image();
        img.onload = function () {
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          const newImageUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = newImageUrl;
          link.download = "qr_code.png";
          link.click(); 
        };
        img.src = imageUrl;
      });
    }
  }
};
