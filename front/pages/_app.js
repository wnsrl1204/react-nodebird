import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "antd/dist/antd.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import wrapper from "../store/configureStore";

const MyApp = ({ Component }) => (
  <>
    <Head>
      <title>NodeBird</title>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
    <Component />
  </>
);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(MyApp);
