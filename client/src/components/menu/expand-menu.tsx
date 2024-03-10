import "./expand-menu.css";
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { leftSidebarLinks } from "../../data/left-sidebar-links";
import ToggleTheme from "../button/toggle-theme";
import AOS from "aos";
import "aos/dist/aos.css";

interface ExpandMenuProps {
    setExpand: React.Dispatch<React.SetStateAction<boolean>>
}

const ExpandMenu: React.FC<ExpandMenuProps> = ({ setExpand }) => {
    const location = useLocation();

    useEffect(() => {
        AOS.init();
    }, []);

    const getAnimationType = (id: number) => {
        if ([1, 3, 5].includes(id)) return "fade-left";
        if ([2, 4].includes(id)) return "fade-right";
        if (id === 6) return "fade-up";
        return "";
    };

    return (
        <div id='expand-menu'>
            <ul>
                {leftSidebarLinks.map(item => (
                    <li
                        key={item.id}
                        data-aos={getAnimationType(item.id)}
                        onClick={() => setExpand(false)}
                    >
                        <Link to={item.href}>
                            <item.icon />
                            <p className={`${location.pathname === item.href ? 'link-active' : ''} underline`}>{item.name}</p>
                        </Link>
                    </li>
                ))}
                <li data-aos={getAnimationType(6)} className='theme__wrapper'>
                    <ToggleTheme />
                </li>
            </ul>
        </div>
    )
}

export default ExpandMenu