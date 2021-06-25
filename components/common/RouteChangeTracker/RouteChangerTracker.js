import React from 'react';
import { withRouter, useRouter } from 'next/router';
import ReactGA from 'react-ga';

const RouteChangeTracker = () => {
    const router = useRouter();
    ReactGA.initialize('UA-G-Y276SJCVEF');

    ReactGA.set({ page: router.pathname });
    ReactGA.pageview(router.pathname);

    return <div></div>;
};

export default withRouter(RouteChangeTracker);
