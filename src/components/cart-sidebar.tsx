import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";
import { Cart, CartProps } from "./cart";


export const CartSidebar:React.FC<CartProps> = ({ isOpen, toggleSidebar, orderItems, displayedItems }) => {
    return (
        <div>
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl cursor-pointer" onClick={toggleSidebar} />
            <Cart isOpen={isOpen} toggleSidebar={toggleSidebar} orderItems={orderItems} displayedItems={displayedItems} />
            <div
                className={`fixed inset-0 bg-black ${
                    isOpen ? "opacity-20 pointer-events-auto" : "opacity-0 pointer-events-none"
                } transition-opacity duration-300 ease-in-out z-30`}
                onClick={toggleSidebar}
            />
        </div>
    );
};
