import "@/styles/globals.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Theme>
      <Component {...pageProps} />;
    </Theme>
    </Provider>
  );
}
