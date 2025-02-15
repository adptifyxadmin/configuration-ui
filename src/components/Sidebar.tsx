import React, { Fragment, useState } from "react";
import {
    List,
    ListItem,
    ListItemText,
    Collapse,
    Divider,
    TextField,
    InputAdornment,
    IconButton,
    ExpandLess,
    ExpandMore,
    Close,
} from "../shared/utils/muiImports";
import { SidebarMenuProps } from "./types/Sidebar.types";
import { Link } from "react-router-dom";

const Sidebar: React.FC<SidebarMenuProps> = ({ menuItems }) => {
    // Initialize all categories to be expanded by default
    const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>(
        menuItems.reduce<{ [key: string]: boolean }>((acc, { category }) => {
            acc[category] = true; // Set each category to true (expanded) by default
            return acc;
        }, {}) // Type the accumulator as { [key: string]: boolean }
    );
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Toggles the state of the clicked category
    const handleClick = (category: string) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],  // Toggle the category's open state
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Filter the menu items based on the search term
    const filteredMenuItems = menuItems
        .map(({ category, icon: Icon, items }) => {
            const filteredItems = items.filter(({ text }) =>
                text.toLowerCase().includes(searchTerm)
            );
            return {
                category,
                icon: Icon,
                items: filteredItems,
            };
        })
        .filter(({ items }) => items.length > 0 || searchTerm === "");

    // Clear the search term
    const handleClearSearch = () => {
        setSearchTerm("");
    };

    return (
        <>
            <TextField
                label="Search Menu"
                variant="outlined"
                fullWidth
                margin="dense"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchTerm && (
                                <IconButton onClick={handleClearSearch} edge="end">
                                    <Close />
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
            />
            <List>
                {filteredMenuItems.map(({ category, icon: Icon, items }) => (
                    <Fragment key={category}>
                        <ListItem
                            button
                            onClick={() => handleClick(category)}  // Toggle the clicked category
                            sx={{
                                "& .MuiListItemText-primary": {
                                    fontWeight: "bold",
                                    fontSize: "0.850rem",
                                },
                            }}
                        >
                            {Icon && <Icon sx={{ mr: 2 }} />}
                            <ListItemText primary={category} />
                            {openCategories[category] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse
                            in={openCategories[category] || false}  // Ensure the category is collapsed by default if undefined
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {items.map(({ text, to }) => (
                                    <ListItem
                                        button
                                        component={Link}
                                        to={to}
                                        key={text}
                                        sx={{
                                            "& .MuiListItemText-primary": {
                                                fontSize: "0.850rem",
                                            },
                                        }}
                                    >
                                        <ListItemText primary={text} sx={{ pl: 4 }} />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider sx={{ my: 2 }} />
                    </Fragment>
                ))}
            </List>
        </>
    );
};

export default Sidebar;
