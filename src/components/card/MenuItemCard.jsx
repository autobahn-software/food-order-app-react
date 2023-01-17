import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AccountInputForm } from "../Input/AccountInput";
import { useDispatch, useSelector } from "react-redux";
import { updateItemToCart } from "../../features/order/order.saga";
import { selectValidationError } from "../../features/order/order.slice";

export default function MenuItemCard({ menuItem }) {
    const { id, name, description, price, amount } = menuItem;
    const dispatch = useDispatch();
    const error = useSelector(selectValidationError);

    return (
        <>
            <Card sx={{ display: 'flex', margin: '10px 0' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {description}
                        </Typography>
                        <Typography component="div" variant="h6">
                            ${price}
                        </Typography>
                    </CardContent>
                    <AccountInputForm amount={amount} onAddToCart={(count) => dispatch(updateItemToCart({ id, count }))} />
                    {error && error.id === id && <Typography variant="span" color='error'>{error.message}</Typography>}
                </Box>
            </Card>
        </>
    )
}