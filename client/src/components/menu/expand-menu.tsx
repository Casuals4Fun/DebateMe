import "./expand-menu.css";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavStore } from "../../store/useNavStore";
import { leftSidebarLinks } from "../../data/left-sidebar-links";
import AOS from "aos";
import "aos/dist/aos.css";

const ExpandMenu = () => {
    const location = useLocation();
    const { setExpand } = useNavStore();

    useEffect(() => {
        AOS.init();
    }, []);

    const getAnimationType = (id: number) => {
        if ([1, 3, 5].includes(id)) return "fade-left";
        if ([2, 4, 6].includes(id)) return "fade-right";
        // if (id === 5) return "fade-up";
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
            </ul>
        </div>
    )
}

export default ExpandMenu