import Page from "../components/Page";
import NProgress from "nprogress";
import Router from "next/router";

// adds loading progress bar to top of page
// import "nprogress/nprogress.css"; #default
import "../components/styles/nprogress.css";
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// special file to control components higher than page
// to access elements higher than the body
function MyApp({ Component, pageProps, apollo }) {
  console.log(apollo);
  return(
    // apollo provider connect all lower components to the api to access data
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// if any pages have getInitialProps on them, which they will because thats what withData adds to them then wait for it
MyApp.getInitialProps = async function ({ Component, ctx}) {
  let pageProps = {};
  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return {pageProps}
}

export default withData(MyApp)