let backendURL;

if (window.location.hostname === "localhost") {
  backendURL = "http://localhost:5000";
} else {
  backendURL = "https://yumfood-backend-438o.onrender.com";
}

export default backendURL;
