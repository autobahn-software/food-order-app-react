import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import BackDropLoader from "../../components/backdrop/Backdrop";
import MenuItemCard from "../../components/card/MenuItemCard";
import { selectMenuOrderInfo } from "../order/order.slice";
import { fetchMenusForUser } from "./menu.saga";
import { selectIsMenuLoading } from "./menu.slice";


export const Menu = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsMenuLoading);
    const menuItems = useSelector(selectMenuOrderInfo);

    useEffect(() => {
        dispatch(fetchMenusForUser());
    }, [dispatch])

    const RenderMenuItems = ({menuItems}) => menuItems.map((prop, key) => (<MenuItemCard menuItem={prop} key={key.toString()} />))
    return (
       <>
        { isLoading ? <BackDropLoader open={isLoading} /> : <RenderMenuItems menuItems={menuItems} />}
       </>
    )
}