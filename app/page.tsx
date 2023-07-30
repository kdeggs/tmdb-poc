'use client'

import Link from 'next/link'
import {Button, Sheet, Typography} from "@mui/joy";

export default function Home() {
    return (
        <main>
            <Link href="/dashboard">
                <Sheet
                    sx={{
                        display: 'flex',
                        flexFlow: 'row nowrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            alignItems: 'center',
                            width: 300,
                            mx: 'auto',
                            my: 4,
                            py: 3,
                            px: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            borderRadius: 'sm',
                            boxShadow: 'md',
                        }}
                    >
                        <div>
                            <Typography level="h5" component="h1">
                                <strong>Welcome to the site 👋</strong>
                            </Typography>
                        </div>
                        <div>
                            <Button
                                size="md"
                                sx={(theme) => ({
                                    background: `linear-gradient(-45deg, ${theme.vars.palette.primary[800]}, ${theme.vars.palette.primary[500]})`,
                                    fontWeight: 'lg', // short-hand syntax, same as `theme.fontWeight.lg`
                                    '&:hover': {
                                        background: `linear-gradient(-45deg, ${theme.vars.palette.primary[900]}, ${theme.vars.palette.primary[600]})`,
                                    },
                                })}
                            >
                                View the Dashboard
                            </Button>
                        </div>
                    </Sheet>
                </Sheet>
            </Link>
        </main>
    )
}
