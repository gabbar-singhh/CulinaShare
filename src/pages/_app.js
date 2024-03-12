import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </UserProvider>
  );
}
