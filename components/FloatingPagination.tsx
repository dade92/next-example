import {Box, Button, Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {FC} from "react";

interface Props {
    page: number;
    totalPages: number;
}

export const FloatingPagination: FC<Props> = ({page, totalPages}) => {
    const router = useRouter();

    const handlePageChange = (newPage: number) => {
        router.push(`/mflix?page=${newPage}`);
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                padding: '10px 20px',
                borderRadius: '20px',
                boxShadow: 3,
            }}
        >
            <Button
                variant="contained"
                onClick={() => handlePageChange(page > 1 ? page - 1 : page)}
                disabled={page <= 1}
                sx={{marginRight: 2}}
            >
                &lt;
            </Button>
            <Typography sx={{color: 'white'}}>Page {page} of {totalPages}</Typography>
            <Button
                variant="contained"
                onClick={() => handlePageChange(page < totalPages ? page + 1 : page)}
                disabled={page >= totalPages}
                sx={{marginLeft: 2}}
            >
                &gt;
            </Button>
        </Box>
    );
}
