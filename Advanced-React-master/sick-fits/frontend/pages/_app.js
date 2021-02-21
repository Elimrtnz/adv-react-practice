import Page from "../components/Page";

// special file to control components higher than page
// to access elements higher than the body
export default function MyApp({ Component, pageProps }) {
    return (
        <Component {...pageProps} />
    );
}