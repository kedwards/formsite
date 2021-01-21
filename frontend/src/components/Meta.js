import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To Gfatha's",
  description: "We sell the best console titles for cheap",
  keywords: "gaming, buy console games, cheap consoles",
};

export default Meta;
