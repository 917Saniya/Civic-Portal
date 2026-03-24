import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function PortalLayout({ title, actions, children }) {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="portal-shell">
      <Navbar onToggleSidebar={() => setOpenSidebar((prev) => !prev)} />
      <div className="portal-content-wrap">
        <Sidebar open={openSidebar} onClose={() => setOpenSidebar(false)} />
        <main className="portal-main">
          <div className="page-header">
            <h1>{title}</h1>
            {actions && <div>{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export default PortalLayout;
