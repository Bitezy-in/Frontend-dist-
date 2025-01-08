import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import "react-phone-input-2/lib/style.css";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
