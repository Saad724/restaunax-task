'use client';
import { Button, ButtonOwnProps, SxProps, useTheme } from '@mui/material';
import React from 'react';
import './PrimaryButton.scss';

interface PrimaryButtonInterface {
    children: any;
    variant?: 'text' | 'outlined' | 'contained';
    secondaryBtn?: boolean;
    onClick?: (e?: any) => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    disabled?: boolean;
    sx?: SxProps;
    color?: ButtonOwnProps["color"];
    smallBtn?: boolean;
    rounded?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonInterface> = ({
    children,
    className,
    variant = 'contained',
    onClick,
    type,
    startIcon,
    endIcon,
    disabled,
    color = 'primary',
    smallBtn = false,
    secondaryBtn,
    sx,
    rounded = true
}) => {
    const theme = useTheme();
    return (
        <Button
            type={type}
            disabled={disabled}
            color={color}
            variant={variant}
            className={`primary-button ${smallBtn && 'small-btn'} ${className} ${secondaryBtn ? (theme.palette.mode === 'dark' ? 'dark-secondary-btn' : 'secondary-btn') : ''} ${rounded ? 'rounded-btn' : ''} ${variant === "contained" ? 'contained-btn' : ''}`}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            sx={sx}
            disableElevation
        >
            {children}
        </Button>
    );
};

export default PrimaryButton;
