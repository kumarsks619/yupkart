import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keyword" content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To YupKart',
    description: 'Buy best quality products at cheapest price',
    keywords:
        'electronics, buy electronics, cheap electronics, cheap accessories, accessories, clothings, footwear, quality products',
}

export default Meta
