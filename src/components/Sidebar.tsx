import React, { Fragment, useState, useEffect, useMemo } from "react";
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
import { Link, useLocation } from "react-router-dom";

const Sidebar: React.FC<SidebarMenuProps> = ({ menuItems }) => {
    const location = useLocation();

    const [openCategories, setOpenCategories] = useState<{ [key: string]: boolean }>(
        menuItems.reduce<{ [key: string]: boolean }>((acc, { category }) => {
            acc[category] = true;
            return acc;
        }, {})
    );

    const [searchTerm, setSearchTerm] = useState<string>("");

    // Expand categories based on search term
    useEffect(() => {
        if (searchTerm) {
            const expanded = menuItems.reduce<{ [key: string]: boolean }>((acc, { category, items }) => {
                acc[category] = items.some(({ text }) =>
                    text.toLowerCase().includes(searchTerm)
                );
                return acc;
            }, {});
            setOpenCategories(expanded);
        }
    }, [searchTerm, menuItems]);

    const handleClick = (category: string) => {
        setOpenCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleClearSearch = () => {
        setSearchTerm("");
    };

    const filteredMenuItems = useMemo(() => {
        return menuItems
            .map(({ category, icon: Icon, items }) => {
                const filteredItems = items.filter(({ text }) =>
                    text.toLowerCase().includes(searchTerm)
                );
                return { category, icon: Icon, items: filteredItems };
            })
            .filter(({ items }) => items.length > 0 || searchTerm === "");
    }, [menuItems, searchTerm]);

    const isActive = (path: string) => location.pathname === path;

    return (
        <div style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto", paddingRight: 8 }}>
            <TextField
                label="Search Menu"
                variant="outlined"
                fullWidth
                size="small"
                margin="dense"
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchTerm && (
                                <IconButton onClick={handleClearSearch} edge="end" size="small">
                                    <Close fontSize="small" />
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
                sx={{ mb: 1 }}
            />

            <List disablePadding>
                {filteredMenuItems.map(({ category, icon: Icon, items }) => (
                    <Fragment key={category}>
                        <ListItem
                            button
                            onClick={() => handleClick(category)}
                            sx={{
                                bgcolor: "background.paper",
                                py: 1,
                                px: 2,
                                "&:hover": {
                                    bgcolor: "action.hover",
                                },
                            }}
                        >
                            {Icon && <Icon sx={{ mr: 2, color: "primary.main" }} />}
                            <ListItemText
                                primary={category}
                                primaryTypographyProps={{
                                    fontWeight: "bold",
                                    fontSize: "0.90rem",
                                    color: "text.primary",
                                }}
                            />
                            {openCategories[category] ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>

                        <Collapse in={openCategories[category]} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {items.map(({ text, to }) => (
                                    <ListItem
                                        button
                                        component={Link}
                                        to={to}
                                        key={`${category}-${text}`}
                                        sx={{
                                            pl: 5,
                                            py: 1,
                                            bgcolor: isActive(to) ? "action.selected" : "inherit",
                                            "&:hover": {
                                                bgcolor: "action.hover",
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={text}
                                            primaryTypographyProps={{
                                                fontSize: "0.85rem",
                                                color: isActive(to) ? "primary.main" : "text.secondary",
                                                fontWeight: isActive(to) ? "bold" : "normal",
                                            }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                        <Divider sx={{ my: 1 }} />
                    </Fragment>
                ))}
            </List>
        </div>
    );
};

export default Sidebar;
