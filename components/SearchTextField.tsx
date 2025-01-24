import {FC} from "react";
import {InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
    searchQuery: string;
    onChange: (text: string) => void;
}

export const SearchTextField: FC<Props> = ({searchQuery, onChange}) =>
    <TextField
        variant="outlined"
        placeholder="Search a movie"
        value={searchQuery}
        onChange={(e) => onChange(e.target.value)}
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
            "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
            },
        }}
    />