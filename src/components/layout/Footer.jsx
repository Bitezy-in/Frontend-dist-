import { Linkedin, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 py-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <img
                        src="/bitezy_logo.png"
                        alt="Bitezy Logo"
                        className="mb-2 w-[70%]"
                    />
                    <p className="text-sm">© 2024 Bitezy Limited</p>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Company</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-gray-900">
                                About Us
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover:text-gray-900">
                                Team
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Contact us</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-gray-900">
                                Help & Support
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-900">
                                Partner With Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-900">
                                Ride With Us
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Available in:</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Sricity</li>
                        <li>Tada</li>
                        <li>Soon to come near you as well :)</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-gray-900">
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-900">
                                Cookie Policy
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-900">
                                Privacy Policy
                            </a>
                        </li>
                    </ul>

                    <h3 className="font-semibold mt-6 mb-4">Social Links</h3>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <Instagram size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <Facebook size={20} />
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900"
                        >
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
