import React from "react";
export default function ImageHandler({ src, ...rest }) {
    src = src && src.includes('https://') ? src : 'http://127.0.0.1:4000/uploads/' + src;
    return (
        <img {...rest} src={src} alt={''} />
    )
}