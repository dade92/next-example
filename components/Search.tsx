import {FC, useState} from "react";
import {Box, IconButton} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {SearchTextField} from "./SearchTextField";

interface Props {
    onSearch: (query: string) => void;
}

export const Search: FC<Props> = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
            <SearchTextField searchQuery={searchQuery} onChange={(text: string) => setSearchQuery(text)}/>
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