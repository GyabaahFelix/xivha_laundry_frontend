import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div className="flex items-center space-x-4">
            <img
              src="/images/xivhalogo.png" // Assuming your logo is named xivhalogo.png
              alt="Xivha World Logo"
              className="h-32 w-32 object-contain rounded-full" // Making the logo round and bigger
            />
            <div className="text-white">
              <h2 className="text-2xl font-bold">Xivha World</h2>
              <p className="text-sm">Innovating Your Digital Experience</p>
            </div>
          </div>

          {/* About Xivha World */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Xivha World</h3>
            <p className="text-sm">
              Xivha World is a leading IT solutions provider specializing in
              innovative web and mobile applications that help businesses
              streamline operations and improve customer engagement.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:contact@xivhaworld.com"
                  className="text-indigo-400"
                >
                  contact@xivhaworld.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+233123456789" className="text-indigo-400">
                  +233 123 456 789
                </a>
              </li>
              <li>Address: 123 Tech Street, Accra, Ghana</li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Payment Methods</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <i className="fab fa-cc-visa text-indigo-500 text-2xl mr-2"></i>
                <span>Credit & Debit Cards</span>
              </div>
              <div className="flex items-center">
                <i className="fab fa-mobile-alt text-indigo-500 text-2xl mr-2"></i>
                <span>Mobile Money (MTN, Vodafone Cash)</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-university text-indigo-500 text-2xl mr-2"></i>
                <span>Bank Transfers</span>
              </div>
              <div className="flex items-center">
                <i className="fab fa-cc-paypal text-indigo-500 text-2xl mr-2"></i>
                <span>PayPal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Info and Social Links */}
        <div className="mt-8 border-t pt-6 text-center text-sm">
          <div className="space-x-6">
            <a
              href="/privacy-policy"
              className="text-gray-400 hover:text-indigo-400"
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="text-gray-400 hover:text-indigo-400"
            >
              Terms of Service
            </a>
          </div>
          <div className="mt-4">
            <p>
              &copy; {new Date().getFullYear()} Xivha World. All rights
              reserved.
            </p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center space-x-6">
          <a
            href="https://facebook.com/xivhaworld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-facebook-f text-white text-2xl"></i>
          </a>
          <a
            href="https://twitter.com/xivhaworld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter text-white text-2xl"></i>
          </a>
          <a
            href="https://linkedin.com/company/xivhaworld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin-in text-white text-2xl"></i>
          </a>
          <a
            href="https://instagram.com/xivhaworld"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram text-white text-2xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
