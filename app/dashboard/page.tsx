'use client'

import * as React from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    IconButton,
    Modal,
    ModalClose,
    Sheet,
    Typography
} from '@mui/joy'
import {FavoriteBorderOutlined, Home, Movie, StarOutlined} from "@mui/icons-material";
import Link from "next/link";

function generateCard(name: string, date: string, posterUrl: string, voteCount: number) {
    const transformedVotes =  Math.round(voteCount / 2)
    const stars =  Array.from({ length: transformedVotes }, (_, i) => i);

    return (
        <Card variant="outlined" sx={{width: 320}}>
            <div>
                <Typography level="h2" fontSize="md" sx={{mb: 0.5}}>
                    {name}
                </Typography>
                <Typography level="body2">Released: {date}</Typography>
                <IconButton
                    aria-label="star movie"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{position: 'absolute', top: '0.5rem', right: '0.5rem'}}
                >
                    <FavoriteBorderOutlined/>
                </IconButton>
            </div>
            <img
                src={'https://image.tmdb.org/t/p/original/' + posterUrl}
                srcSet={'https://image.tmdb.org/t/p/original/' + posterUrl}
                loading="lazy"
                alt=""
            />
            <CardContent orientation="horizontal">
                <div>
                    <Typography level="body3">Total Stars:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                        {stars.map((_, i) => (
                        <StarOutlined key={i}/>
                    ))}
                    </Typography>
                </div>
                <Button
                    variant="solid"
                    size="sm"
                    color="primary"
                    aria-label="Movie Details"
                    sx={{ml: 'auto', fontWeight: 600}}
                >
                    View Details
                </Button>
            </CardContent>
        </Card>
    )
}

export default function Page() {
    const [open, setOpen] = React.useState<boolean>(false);

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
                <IconButton
                    size="sm"
                    variant="outlined"
                    color="primary"
                    onClick={() => setOpen(true)}
                >
                    <Movie/>
                </IconButton>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            maxWidth: 500,
                            borderRadius: 'md',
                            p: 3,
                            boxShadow: 'lg',
                        }}
                    >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                            }}
                        />
                        <Typography id="modal-desc" textColor="text.tertiary">
                            Oops... this would do something one day 😅
                        </Typography>
                    </Sheet>
                </Modal>
            </Box>
            <br/>
            <Grid container spacing={8} justifyContent="center">
                {Array.from(Array(12)).map((_, index) => (
                    <Grid key={index}>
                        {generateCard('Test', '7/25/2023', 'iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg', 8)}
                    </Grid>
                ))}
            </Grid>
        </Sheet>
    )
}
