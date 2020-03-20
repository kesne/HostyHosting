import React from 'react';
import Img from 'gatsby-image';
import { Image } from '../types';

type Props = {
    image: Image;
};

export default function Logo({ image }: Props) {
    return (
        <div className="flex items-center">
            <Img fixed={image} />
            <span className="ml-2 text-indigo-600 font-bold text-xl">HostyHosting</span>
        </div>
    );
}
