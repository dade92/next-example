import {FC, useEffect, useState} from "react";
import {Box, IconButton, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
    onSearch: (query: string) => void;
}

export const Search: FC<Props> = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setSearchQuery("");
    }, [])

    return (
        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <TextField
                variant="outlined"
                placeholder="Search a movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    },
                }}
                fullWidth
                sx={{
                    "& .MuiInputBase-input": {
                        color: "gray",
                    },
                    "&:hover fieldset": {
                        borderColor: "darkgray",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "darkgray",
                    },
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                    },
                }}
            />
            <IconButton
                color="primary"
                onClick={() => {
                    onSearch(searchQuery);
                }}
                aria-label="search"
                sx={{
                    borderRadius: "16px",
                    height: "56px",
                    width: "56px",
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "primary.dark",
                    },
                }}
            >
                <SearchIcon/>
            </IconButton>
        </Box>
    );
};