// src/components/SEO.jsx

import { Helmet } from "react-helmet-async";

const SEO = ({
    title,
    description,
    canonical,
}) => {
    return (
        <Helmet>

            {/* ==============================
          PAGE TITLE
      ============================== */}
            <title>{title}</title>


            {/* ==============================
          META DESCRIPTION
      ============================== */}
            <meta
                name="description"
                content={description}
            />


            {/* ==============================
          CANONICAL
      ============================== */}
            {canonical && (
                <link
                    rel="canonical"
                    href={canonical}
                />
            )}


            {/* ==============================
          OPEN GRAPH
      ============================== */}

            <meta
                property="og:type"
                content="website"
            />

            <meta
                property="og:site_name"
                content="ScrollFuel"
            />

            <meta
                property="og:title"
                content={title}
            />

            <meta
                property="og:description"
                content={description}
            />

            {canonical && (
                <meta
                    property="og:url"
                    content={canonical}
                />
            )}

            <meta
                property="og:image"
                content="https://scrollfuel.in/assets/logo1.png"
            />

            <meta
                property="og:locale"
                content="en_IN"
            />


            {/* ==============================
          TWITTER
      ============================== */}

            <meta
                name="twitter:card"
                content="summary_large_image"
            />

            <meta
                name="twitter:title"
                content={title}
            />

            <meta
                name="twitter:description"
                content={description}
            />

            <meta
                name="twitter:image"
                content="https://scrollfuel.in/assets/logo1.png"
            />

        </Helmet>
    );
};

export default SEO;