import { Backdrop, CircularProgress } from "@mui/material";


export default function BackDropLoader({ open }){
    return (
        <Backdrop
            sx={{ color: '#fff' }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}