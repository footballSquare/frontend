import HomeBtn from "./ui/HomeBtn";
import NavigationBtn from "./ui/NavigationBtn";
import SignBtns from "./ui/SignBtns";
import { useState } from "react";
import useNavigationBtns from "./model/useNavigationBtns";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navigationBtns] = useNavigationBtns();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <HomeBtn />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationBtns.map((item) => (
                <NavigationBtn
                  key={item.text}
                  text={item.text}
                  navigationHandler={item.handler}
                />
              ))}
            </div>
            {/* Desktop Sign Buttons */}
            <div className="hidden lg:flex items-center">
              <SignBtns />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-4">
              <SignBtns />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 shadow-2xl">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navigationBtns.map((item) => (
                <button
                  key={item.text}
                  onClick={() => {
                    item.handler();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200 font-medium"
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Nav;
