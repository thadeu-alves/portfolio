const shareBtn = document.getElementById("shareBtn");
const modal = document.getElementById("shareModal");
const closeModal = document.querySelector(".close-modal");
const copyLinkBtn = document.getElementById("copyLinkBtn");
const profileLink = document.getElementById("profileLink");
const qrCodeCanvas = document.getElementById("qrCode");
const pix = document.querySelector(".pix-link");

const currentUrl = window.location.href;

pix.addEventListener("click", async (e) => {
    e.preventDefault();
    const chavePix =
        "00020101021126580014br.gov.bcb.pix01360617bb9d-2d17-41f6-807e-c48266dccbc25204000053039865802BR5917THADEU ALVES LIMA6012SERRA GRANDE62070503***63043DC2";

    try {
        await navigator.clipboard.writeText(chavePix);
        console.log(pix.innerHTML);
        const text = pix.innerHTML;
        pix.innerHTML = `
            <li class="special">
                Copiado!!
            </li>
        `;
        setTimeout(() => {
            pix.innerHTML = text;
        }, 1000);
    } catch (err) {
        console.log(err);
    }
});

shareBtn.addEventListener("click", () => {
    modal.style.display = "block";
    generateQRCode();
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

copyLinkBtn.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(currentUrl);

        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML =
            '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyLinkBtn.innerHTML = originalText;
        }, 2000);
    } catch (err) {
        profileLink.select();
        document.execCommand("copy");

        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML =
            '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyLinkBtn.innerHTML = originalText;
        }, 2000);
    }
});

function generateQRCode() {
    profileLink.value = currentUrl;

    const context = qrCodeCanvas.getContext("2d");
    context.clearRect(
        0,
        0,
        qrCodeCanvas.width,
        qrCodeCanvas.height
    );

    QRCode.toCanvas(
        qrCodeCanvas,
        currentUrl,
        {
            width: 200,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
        },
        function (error) {
            if (error) console.error(error);
        }
    );
}
