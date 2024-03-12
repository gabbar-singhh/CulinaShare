import React from "react";
import Head from "next/head";

const about = () => {
  return (
    <React.Fragment>
      <Head>
        <title>{`About CulinaShare`}</title>
        <meta
          name="description"
          content="CulinaShare - Where Every Recipe Tells a Story!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <h1>about us page it is</h1>
    </React.Fragment>
  );
};

export default about;
