import { useState } from "react";
import Menu from "./Menu";

function Header() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <div className="flex p-2 relative my-4">
                <a href="/" className="mx-auto text-3xl cursor-pointer">MyFinances</a>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-3xl cursor-pointer mr-4">≡</button>
                {isMenuOpen && <Menu onClose={() => setIsMenuOpen(false)} />}
            </div >
            <span className="border border-gray-500" />
        </>
    )
}

export default Header;