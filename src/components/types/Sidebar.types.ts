
import { SvgIconComponent, MeetingRoom, Inventory2, AssignmentInd, AttachMoney } from "@mui/icons-material";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface MenuCategory {
    category: string;
    items: MenuItem[];
    icon?: SvgIconComponent;
}

export interface SidebarMenuProps {
    menuItems: MenuCategory[];
    icon?: SvgIconComponent; 
}

interface MenuItem {
    text: string;
    to: string;
    icon?: SvgIconComponent; 
}


export const menuItems: MenuCategory[] = [    
    {
        category: "Services",
        icon: HealthAndSafetyIcon,
        items: [
            { text: "Treatments", to: "/treatments" }            
        ],
    },
    {
        category: "Facility Management",
        icon: MeetingRoom,
        items: [
            { text: "Rooms", to: "/rooms" },
            { text: "Room Types", to: "/roomtypes" },
            { text: "Equipments", to: "/equipments" },
        ],
    },
    {
        category: "Inventory & Supplies",
        icon: Inventory2,
        items: [
            { text: "Medicines", to: "/medicines" },
            { text: "Consumabales", to: "/consumabales" },
            { text: "Vendors", to: "/vendors" },
        ],
    },
    {
        category: "Financial Management",
        icon: AttachMoney,
        items: []
    },
    {
        category: "Patient Management",
        icon: AssignmentInd,
        items: []
    }
];
