import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    return (
        <Stack sx={{ minHeight: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                <CircularProgress color="secondary" />
            </Stack>
        </Stack>
    );
}