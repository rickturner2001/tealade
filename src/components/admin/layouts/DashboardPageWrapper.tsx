import { Fragment, useState } from "react";
import Dashboard from "../Dashboard";
import type { SideMenuSection } from "../../../types";

const DashboardPageWrapper = ({
  children,
  noContext,
}: {
  children: JSX.Element;
  noContext?: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] =
    useState<SideMenuSection>("imported products");

  return (
    <Dashboard
      currentSection={currentSection}
      setCurrentSection={setCurrentSection}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      title="Import list"
    >
      <Fragment>
        {!noContext && <ContextMenu />}
        {children}
      </Fragment>
    </Dashboard>
  );
};

const ContextMenu = () => {
  return (
    <div className="w-full bg-gradient-to-r from-blue-700 to-blue-500/80 py-6 "></div>
  );
};

export default DashboardPageWrapper;
