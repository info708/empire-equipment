document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("emailInput");
  const continueBtn = document.getElementById("continueBtn");
  const welcome = document.getElementById("welcomeScreen");
  const scan = document.getElementById("scanScreen");
  const video = document.getElementById("cameraPreview");
  const container = document.getElementById("videoContainer");

  let stream = null;

  async function startCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false
      });
      video.srcObject = stream;
      container.style.display = "flex";
    } catch (err) {
      alert("Camera access denied or unavailable: " + err.message);
    }
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      stream = null;
    }
    container.style.display = "none";
  }

  async function initCameraAuto() {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      await startCamera();
    } catch (err) {
      console.warn("Waiting for user to grant permission...");
    }
  }

  continueBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();
    if (!email) {
      alert("Enter your email first.");
      return;
    }
    localStorage.setItem("empireEmail", email);
    welcome.style.display = "none";
    scan.style.display = "block";
    initCameraAuto(); // Auto camera after Continue
  });

  document.getElementById("startScan").addEventListener("click", startCamera);
  document.getElementById("stopScan").addEventListener("click", stopCamera);

  // Auto-skip welcome if returning user
  const savedEmail = localStorage.getItem("empireEmail");
  if (savedEmail) {
    welcome.style.display = "none";
    scan.style.display = "block";
    initCameraAuto();
  }
});
