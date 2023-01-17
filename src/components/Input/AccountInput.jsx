import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Typography } from "@mui/material"
import { Box } from "@mui/system"
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { APP_CONSTANTS } from "../../App.constants";
import { useEffect } from "react";


const schema = yup.object({
    count: yup.number().nullable().min(1, 'amount > 0').max(APP_CONSTANTS.amountLimitPerItem, 'Max order per item reached')
})

export const AccountInputForm = ({ amount, onAddToCart }) => {
    const {
        watch,
        register,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            count: 0
        },
        resolver: yupResolver(schema),
    });
    const count = watch('count');

    const onCountChange = (e) => {
        const { value } = e.target;
        setValue('count', value ? parseInt(value) : null, { shouldValidate: true });
    }

    useEffect(() => {
        if (!amount) return;
        setValue('count', amount, { shouldValidate: true })
    }, [amount, setValue])

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Input
                name='count'
                value={count}
                type='number'
                {...register('count', { onChange: onCountChange })}
            />
            <Button variant="outlined" disabled={!isValid} onClick={() => onAddToCart(count)}>ADD</Button>
            {errors.count && <Typography variant="span" color='error'>{errors.count.message}</Typography>}
        </Box>
    )
}