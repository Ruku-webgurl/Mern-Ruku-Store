import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter, FaPinterestP } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiHeart } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-16 bg-white border-t border-pink-100 text-gray-700">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-black text-base shadow-sm shadow-pink-200">
                R
              </div>
              <span className="text-xl font-extrabold tracking-tight text-gray-900 group-hover:text-pink-600 transition-colors">
                RUKU<span className="text-pink-500">.</span> Store
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-6">
              Your trusted destination for curated fashion, smart daily gadgets,
              and premium lifestyle essentials. Quality products delivered with
              care.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="#instagram"
                className="w-8 h-8 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="#facebook"
                className="w-8 h-8 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Facebook"
              >
                <FaFacebookF size={13} />
              </a>
              <a
                href="#twitter"
                className="w-8 h-8 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Twitter"
              >
                <FaTwitter size={13} />
              </a>
              <a
                href="#pinterest"
                className="w-8 h-8 rounded-full bg-pink-50 text-pink-500 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-label="Pinterest"
              >
                <FaPinterestP size={13} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Explore Store
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-pink-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-pink-600 transition-colors">
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link to="/favorite" className="hover:text-pink-600 transition-colors">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-pink-600 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/user-orders" className="hover:text-pink-600 transition-colors">
                  Order History
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-500">
              <li>
                <Link to="/shop" className="hover:text-pink-600 transition-colors">
                  Shipping & Delivery Info
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-pink-600 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-pink-600 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-pink-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-pink-600 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-500">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="text-pink-500 mt-0.5 shrink-0" size={16} />
                <span>Ruku Store Headquarters, Central Avenue</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="text-pink-500 shrink-0" size={16} />
                <a
                  href="mailto:support@rukustore.com"
                  className="hover:text-pink-600 transition-colors"
                >
                  support@rukustore.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="text-pink-500 shrink-0" size={16} />
                <span>+1 (800) 555-RUKU</span>
              </li>
              <li className="text-xs text-pink-700 bg-pink-50 p-2.5 rounded-xl border border-pink-100 font-medium">
                Customer Helpdesk: Mon - Sat (9:00 AM - 7:00 PM)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© {new Date().getFullYear()} RUKU Store. Crafted with</span>
            <FiHeart className="text-pink-500 fill-pink-500 inline" size={12} />
            <span>for everyday living.</span>
          </p>

          <div className="flex items-center gap-3 text-gray-400">
            <span className="font-semibold text-[11px] text-gray-500">Guaranteed Secure Checkout</span>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
              <span className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded border border-pink-200">
                PayPal
              </span>
              <span className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded border border-pink-200">
                Cards
              </span>
              <span className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded border border-pink-200">
                SSL 256
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

