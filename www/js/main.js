document.addEventListener("DOMContentLoaded", async ()=>{
  const emailInput = document.getElementById("emailInput");
  const continueBtn = document.getElementById("continueBtn");
  const welcome = document.getElementById("welcomeScreen");
  const scan = document.getElementById("scanScreen");
  const result = document.getElementById("result");

  const savedEmail = localStorage.getItem("empireEmail");
  if(savedEmail){
    welcome.style.display="none";
    scan.style.display="block";
    startCamera();
  }

  continueBtn.addEventListener("click", ()=>{
    const email = emailInput.value.trim();
    if(!email){ alert("Enter your email"); return; }
    localStorage.setItem("empireEmail", email);
    welcome.style.display="none";
    scan.style.display="block";
    startCamera();
  });

  let stream = null;

  async function startCamera(){
    const video = document.getElementById("cameraPreview");
    const container = document.getElementById("videoContainer");
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });
      video.srcObject = stream;
      container.style.display = "flex";
      result.textContent = "Camera ready";
    } catch(err) {
      alert("Camera permission required. Please enable camera in settings.");
    }
  }

  function stopCamera(){
    if(stream){ stream.getTracks().forEach(t=>t.stop()); stream=null; }
    document.getElementById("videoContainer").style.display="none";
  }

  document.getElementById("stopScan").addEventListener("click", stopCamera);
});
