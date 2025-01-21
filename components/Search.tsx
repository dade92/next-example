import {FC, useState} from "react";
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



export const Search: FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", searchQuery);
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
                variant="outlined"
                placeholder="Search a movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
                fullWidth
            />
            <IconButton
                color="primary"
                onClick={handleSearch}
                aria-label="search"
                sx={{
                    borderRadius: "8px",
                    height: "56px",
                    width: "56px",
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "primary.dark",
                    },
                }}
            >
                <SearchIcon />
            </IconButton>
        </Box>
    );
};