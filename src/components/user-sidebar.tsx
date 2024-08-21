import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Sidebar } from "./sidebar";
import { faUser } from "@fortawesome/free-solid-svg-icons";

interface UserSidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void; 
}

export const UserSidebar:React.FC<UserSidebarProps> = ({ isOpen, toggleSidebar }) => {
    return (
        <div>
            <FontAwesomeIcon icon={faUser} className="text-xl cursor-pointer" onClick={toggleSidebar} />
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div
                className={`fixed inset-0 bg-black ${
                    isOpen ? "opacity-20 pointer-events-auto" : "opacity-0 pointer-events-none"
                } transition-opacity duration-300 ease-in-out z-30`}
                onClick={toggleSidebar}
            />
        </div>
    );
};
