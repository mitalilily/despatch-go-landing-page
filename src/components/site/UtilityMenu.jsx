import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { Button, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { utilityLinks } from "../../data/navigation";
import Icon from "../landing/Icon";

export default function UtilityMenu({ buttonLabel = "Utilities", dark = false, fullWidth = false }) {
  const location = useLocation();
  const [anchorElement, setAnchorElement] = useState(null);
  const isOpen = Boolean(anchorElement);

  return (
    <>
      <Button
        endIcon={<ArrowDropDownRoundedIcon />}
        fullWidth={fullWidth}
        onClick={(event) => setAnchorElement(event.currentTarget)}
        sx={{
          borderRadius: "16px",
          border: dark ? "1px solid rgba(255,255,255,0.16)" : "1px solid rgba(17,28,45,0.08)",
          color: dark ? "#ffffff" : "#111c2d",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.5,
          textTransform: "none",
          backgroundColor: dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.75)",
          backdropFilter: "blur(12px)",
          "&:hover": {
            backgroundColor: dark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.92)",
          },
        }}
      >
        {buttonLabel}
      </Button>

      <Menu
        anchorEl={anchorElement}
        onClose={() => setAnchorElement(null)}
        open={isOpen}
        PaperProps={{
          sx: {
            borderRadius: "20px",
            mt: 1.5,
            minWidth: 280,
            border: "1px solid rgba(17,28,45,0.08)",
            boxShadow: "0 24px 48px -18px rgba(17,28,45,0.18)",
            p: 1,
          },
        }}
      >
        {utilityLinks.map((item) => (
          <MenuItem
            component={RouterLink}
            key={item.to}
            onClick={() => setAnchorElement(null)}
            selected={location.pathname === item.to}
            sx={{
              alignItems: "flex-start",
              borderRadius: "14px",
              gap: 1.5,
              py: 1.5,
            }}
            to={item.to}
          >
            <span className="mt-1 rounded-xl bg-surface-container p-2 text-primary">
              <Icon>{item.icon}</Icon>
            </span>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 700,
                fontSize: "0.98rem",
              }}
              secondary={item.description}
              secondaryTypographyProps={{
                sx: {
                  color: "rgba(17,28,45,0.68)",
                  fontSize: "0.82rem",
                  lineHeight: 1.45,
                  mt: 0.4,
                },
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
