import * as React from 'react'
import {Box, IconButton, Sheet} from '@mui/joy'
import {Home, Movie} from "@mui/icons-material";
import Link from "next/link";

export default function page() {
    return (
        <Sheet>
            <Box
                component="header"
                className="Header"
                sx={[
                    {
                        p: 2,
                        gap: 2,
                        bgcolor: 'background.surface',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        top: 0,
                        zIndex: 1100,
                    },
                ]}
            >
                <Link href="/">
                    <IconButton
                        size="sm"
                        variant="outlined"
                        color="primary"
                    >
                        <Home/>
                    </IconButton>
                </Link>
                <Link href="/dashboard">
                    <IconButton
                        size="sm"
                        variant="outlined"
                        color="primary"
                    >
                        <Movie/>
                    </IconButton>
                </Link>
            </Box>

        </Sheet>
    )
}
