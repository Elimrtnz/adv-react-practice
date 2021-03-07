import Page from "../components/Page";
import NProgress from "nprogress";
import Router from "next/router";

// adds loading progress bar to top of page
// import "nprogress/nprogress.css"; #default
import "../components/styles/nprogress.css";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// special file to control components higher than page
// to access elements higher than the body
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
