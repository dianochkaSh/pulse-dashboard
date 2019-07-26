import React, { useEffect } from "react";

import * as $ from 'jquery';
import logo from "../assets/static/images/logo.png";

const SideBar = () => {

  // TODO: Replace this jQuery with an actual React NavLinks
  useEffect(() => {
    // Sidebar Activity Class
    const sidebarLinks = $('.sidebar').find('.sidebar-link');

    sidebarLinks
      .each((index, el) => {
        $(el).removeClass('active');
      })
      .filter(function () {
        const href = $(this).attr('href');
        const pattern = href[0] === '/' ? href.substr(1) : href;
        return pattern === (window.location.pathname).substr(1);
      })
      .addClass('active');
  });

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        {/* ### $Sidebar Header ### */}
        <div className="sidebar-logo">
          <div className="peers ai-c fxw-nw">
            <div className="peer peer-greed">
              <a className="sidebar-link td-n" href="/">
                <div className="row" style={{height: '65px'}}>
                  <div className="peers ai-c fxw-nw">
                    <div className="peer">
                      <div className="col-md-3 my-auto peer">
                        <img className="logo-icon-holder" src={logo} alt="Logo" />
                      </div>
                    </div>
                    <div className="col-md-9 my-auto peer peer-greed">
                      <h5 className="lh-1 mB-0 logo-text c-blue-500">North Dakota</h5>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="peer">
              <div className="mobile-toggle sidebar-toggle">
                <a href="#" className="td-n">
                  <i className="ti-arrow-circle-left" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* ### $Sidebar Menu ### */}
        <ul className="sidebar-menu scrollable pos-r">
          <li className="nav-item mT-30 active">
            <a className="sidebar-link" href="snapshots">
              <span className="icon-holder">
                <i className="c-blue-500 ti-dashboard" />
              </span>
              <span className="title">Snapshots</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="sidebar-link" href="revocations">
              <span className="icon-holder">
                <i className="c-brown-500 ti-unlink" />
              </span>
              <span className="title">Revocations</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="sidebar-link" href="reincarcerations">
              <span className="icon-holder">
                <i className="c-red-500 ti-reload" />
              </span>
              <span className="title">Reincarcerations</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="sidebar-link" href="program-evaluation">
              <span className="icon-holder">
                <i className="c-orange-500 ti-ruler-alt" />
              </span>
              <span className="title">Program Evaluation</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;