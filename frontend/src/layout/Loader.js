import React, { Component } from 'react';
import '../assets/scss/loader.scss'
const Loader = (props: any) => {
    return <div className="spinner-cls d-flex justify-content-center align-items-center">
        <div className="text-center clearfix">
            <div className="row">
                <div className="col-lg-12">
                    <div className="spinner-border avatar-lg text-primary m-2" role="status"></div>
                </div>
            </div>
            <h3 className="text-white">Processing request ...</h3>
        </div>
    </div>
}
export default Loader