import React, { useState } from 'react';
import clsx from 'clsx';
import { graphql } from 'gatsby';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import { Helmet } from 'react-helmet';
import Img from 'gatsby-image';
import Logo from '../components/Logo';
import { Image } from '../types';

type Props = {
    data: {
        logo: { childImageSharp: { fixed: Image } };
        clipboard: { childImageSharp: { fixed: Image } };
    };
};

const DEFAULT_ERROR_MSG = 'Unable to add your email address. Please try again.';

function trimMessage(msg: string) {
    let finalMessage = msg;
    if (finalMessage.includes('<')) {
        finalMessage = finalMessage.slice(0, finalMessage.indexOf('<'));
    }
    if (finalMessage.includes('(')) {
        finalMessage = finalMessage.slice(0, finalMessage.indexOf('('));
    }
    return finalMessage;
}

export default function Home({ data }: Props) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        const { email } = (e.target as unknown) as Record<
            string,
            HTMLInputElement
        >;
        try {
            const response = await addToMailchimp(email.value);
            setSubmitted(true);
            if (response.result === 'error') {
                setError(trimMessage(response.msg) || DEFAULT_ERROR_MSG);
            } else {
                setSubmitted(true);
            }
        } catch {
            setError(DEFAULT_ERROR_MSG);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Helmet>
                <title>HostyHosting - Coming Soon</title>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Helmet>

            <div className="relative bg-white overflow-hidden">
                <div className="hidden lg:block lg:absolute lg:inset-0">
                    <svg
                        className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
                        width="640"
                        height="784"
                        fill="none"
                        viewBox="0 0 640 784"
                    >
                        <defs>
                            <pattern
                                id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                                x="118"
                                y="0"
                                width="20"
                                height="20"
                                patternUnits="userSpaceOnUse"
                            >
                                <rect
                                    x="0"
                                    y="0"
                                    width="4"
                                    height="4"
                                    className="text-gray-200"
                                    fill="currentColor"
                                />
                            </pattern>
                        </defs>
                        <rect
                            y="72"
                            width="640"
                            height="640"
                            className="text-gray-50"
                            fill="currentColor"
                        />
                        <rect
                            x="118"
                            width="404"
                            height="784"
                            fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
                        />
                    </svg>
                </div>
                <div className="relative pt-6 pb-16 md:pb-20 lg:pb-24 xl:pb-32">
                    <nav className="relative max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-6">
                        <div className="flex items-center flex-1">
                            <div className="flex items-center justify-between w-full md:w-auto">
                                <a href="/">
                                    <Logo
                                        image={data.logo.childImageSharp.fixed}
                                    />
                                </a>
                            </div>
                        </div>
                    </nav>

                    <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-20 xl:mt-24">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                                <div className="text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base">
                                    Coming soon
                                </div>
                                <h2 className="mt-1 text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
                                    Easily deploy{' '}
                                    <br className="hidden md:inline" />
                                    <span className="text-indigo-600">
                                        docker containers{' '}
                                    </span>
                                    <br className="hidden md:inline" />
                                    with no hassle
                                </h2>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                    Easily deploy and manage your applications.
                                    Stop paying extra for horizontal scaling,
                                    and easily vertically scale your containers.
                                    <br />
                                    <br />
                                    With <strong>HostyHosting</strong>, you pay
                                    for the resources you use, starting at just{' '}
                                    <strong>$2.50/mo</strong>.
                                </p>
                                <div className="mt-5 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                    <p className="text-base font-medium text-gray-900">
                                        Sign up to get notified when it’s ready.
                                    </p>
                                    {!submitted ? (
                                        <form
                                            onSubmit={handleSubmit}
                                            className="mt-3 sm:flex"
                                        >
                                            <div className="sm:flex-1">
                                                <input
                                                    aria-label="Email"
                                                    className={clsx(
                                                        'appearance-none block w-full px-3 py-3 border border-gray-300 text-base leading-6 rounded-md placeholder-gray-500 shadow-sm transition duration-150 ease-in-out',
                                                        {
                                                            'focus:outline-none focus:placeholder-gray-400 focus:shadow-outline focus:border-blue-300': !loading,
                                                            'bg-gray-100': loading,
                                                            'border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red': !!error,
                                                        },
                                                    )}
                                                    placeholder="Enter your email"
                                                    name="email"
                                                    disabled={loading}
                                                />

                                                {error && (
                                                    <div className="mt-2 text-sm text-red-600">
                                                        {error}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className={clsx(
                                                        'mt-3 w-full px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white shadow-sm focus:outline-none  transition duration-150 ease-in-out sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto',
                                                        {
                                                            'focus:shadow-outline active:bg-gray-900 hover:bg-gray-700 bg-gray-800': !loading,
                                                            'bg-gray-500 cursor-default': loading,
                                                        },
                                                    )}
                                                    disabled={loading}
                                                >
                                                    Notify me
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <p className="text-lg font-medium text-green-600 mt-8 text-center">
                                            We will notify you when we launch!
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                                <svg
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                                    width="640"
                                    height="784"
                                    fill="none"
                                    viewBox="0 0 640 784"
                                >
                                    <defs>
                                        <pattern
                                            id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                                            x="118"
                                            y="0"
                                            width="20"
                                            height="20"
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <rect
                                                x="0"
                                                y="0"
                                                width="4"
                                                height="4"
                                                className="text-gray-200"
                                                fill="currentColor"
                                            />
                                        </pattern>
                                    </defs>
                                    <rect
                                        y="72"
                                        width="640"
                                        height="640"
                                        className="text-gray-50"
                                        fill="currentColor"
                                    />
                                    <rect
                                        x="118"
                                        width="404"
                                        height="784"
                                        fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                                    />
                                </svg>
                                <div className="relative mx-auto w-full lg:max-w-md flex justify-center">
                                    <Img
                                        fixed={
                                            data.clipboard.childImageSharp.fixed
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const query = graphql`
    query {
        logo: file(relativePath: { eq: "logo.png" }) {
            childImageSharp {
                fixed(height: 64) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        clipboard: file(relativePath: { eq: "clipboard.png" }) {
            childImageSharp {
                fixed(height: 400) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`;
