import React, { Component, Suspense } from "react";
import { connect } from 'react-redux';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import Loader from '../layout/Loader';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
// const Footer = React.lazy(() => import("./Footer"));


// loading
const loading = () => <div className="text-center">Loading...</div>

class NonAuthLayout extends Component {
    render() {
        const children = this.props.children || null;
        return (
            <Suspense fallback={<Loader />}>
                <Header />
                {children}
                <Footer />
            </Suspense>
        );
    }
}

export default connect()(NonAuthLayout);