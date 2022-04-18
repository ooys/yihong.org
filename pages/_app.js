import "../styles/globals.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "../node_modules/nprogress/nprogress.css"; //styles of nprogress
import React, { useEffect } from "react";
import Head from "next/head";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Yihong Song</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
