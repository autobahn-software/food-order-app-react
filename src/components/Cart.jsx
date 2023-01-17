import { Badge, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectCartItemAmountTotal } from "../features/order/order.slice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Cart({ onClick }){
    const cartItemCount = useSelector(selectCartItemAmountTotal);

    return (
        <Button variant="contained" color='secondary' onClick={onClick}>
            <Badge badgeContent={cartItemCount} color="success" showZero>
                <ShoppingCartIcon />
            </Badge>
        </Button>
    )
}