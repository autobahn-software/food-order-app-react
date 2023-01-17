import { AppBar, Toolbar, Typography } from "@mui/material"
import { Container } from "@mui/system"
import Cart from "../Cart"
import { OrderSummaryDialog } from "../dialog/OrderSummaryDialog"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { resetOrderStatus } from "../../features/order/order.slice"


export const Navbar = () => {
    const dispatch = useDispatch();
    const [showOrderSummary, setShowOrderSummary] = useState(false);
    const closeDialog = () => {
        setShowOrderSummary(false);
        dispatch(resetOrderStatus());
    }
    return (
        <>
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        React Meals
                    </Typography>
                    <Cart onClick={() => setShowOrderSummary(true)} />
                </Toolbar>
            </Container>
        </AppBar>
        <OrderSummaryDialog open={showOrderSummary} handleClose={closeDialog} />
        </>
    )
}