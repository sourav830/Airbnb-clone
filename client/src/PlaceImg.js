import React from "react";
import ImageHandler from "./ImageHandler";

export default function PlaceImg({ place, index = 0, className = null }) {
    if (!place.photos?.length) {
        return '';
    };

    if (!className) {
        className = ' object-cover';
    }

    return (
        <div>
            <ImageHandler className={className} src={place.photos[index]} alt="" />
        </div>
    )
}