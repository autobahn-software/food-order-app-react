import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { updateItemToCart } from "../../features/order/order.saga";
import { selectValidationError } from "../../features/order/order.slice";

export default function OrderItemCard({ orderItem }) {
    const { id, name, price, amount } = orderItem;
    const dispatch = useDispatch();
    const error = useSelector(selectValidationError);

    return (
        <>
            <Card sx={{ display: 'flex', margin: '10px 0' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {name} x {amount}
                        </Typography>
                        <Typography component="div" variant="h6" color='danger'>
                            ${price}
                        </Typography>
                        
                    </CardContent>
                    <Box>
                    <Button variant="outline" onClick={() => dispatch(updateItemToCart({id, count: amount + 1}))}>Add</Button>
                    <Button variant="outline" onClick={() => dispatch(updateItemToCart({id, count: amount - 1}))}>Subtract</Button>
                    </Box>
                    {error && error.id === id && <Typography variant="span" color='error'>{error.message}</Typography>}
                </Box>
            </Card>
        </>
    )
}