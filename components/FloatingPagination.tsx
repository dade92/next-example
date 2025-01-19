import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

export const FloatingPagination = ({ page, totalPages }) => {
    const router = useRouter();

    const handlePageChange = (newPage) => {
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
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px 20px',
                borderRadius: '20px',
                boxShadow: 3,
            }}
        >
            <Button
                variant="contained"
                onClick={() => handlePageChange(page > 1 ? page - 1 : page)}
                disabled={page <= 1}
                sx={{ marginRight: 2 }}
            >
                &lt;
            </Button>
            <span style={{ color: 'white', fontSize: '18px' }}>
        Page {page} of {totalPages}
      </span>
            <Button
                variant="contained"
                onClick={() => handlePageChange(page < totalPages ? page + 1 : page)}
                disabled={page >= totalPages}
                sx={{ marginLeft: 2 }}
            >
                &gt;
            </Button>
        </Box>
    );
}
