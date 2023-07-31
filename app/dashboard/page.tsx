'use client'

import * as React from 'react'
import {
    Box,
    Button,
    Card,
    CardContent, CircularProgress,
    Grid,
    IconButton,
    Modal,
    ModalClose,
    Sheet, Tooltip,
    Typography
} from '@mui/joy'
import {FavoriteBorderOutlined, FavoriteOutlined, Home, Movie, StarOutlined} from "@mui/icons-material"
import Link from "next/link"
import {TmdbMovie} from "@/interafces/Movie"
import useSwr from 'swr'
import {ModeToggle} from "@/components/ModeToggle";

const apiKey = process.env.API_KEY
const fetcher = (url: string) => fetch(`${url}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`).then((res) => res.json())

interface MovieCardProps {
    name: string;
    date: string;
    posterUrl: string;
    voteCount: number;
}

function MovieCard({name, date, posterUrl, voteCount}: MovieCardProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const transformedVotes = Math.round(voteCount / 2)
    const stars = Array.from({length: transformedVotes}, (_, i) => i)
    const [favorite, setFavorite] = React.useState(false)
    const handleClick = () => {
        setFavorite(!favorite)
    }

    return (
        <Card variant="outlined" sx={{width: 320}}>
            <div>
                <Typography level="h2" fontSize="md" sx={{mb: 0.5}}>
                    {name}
                </Typography>
                <Typography level="body2">Released: {date}</Typography>
                <Tooltip
                    title="Favorite Movie"
                    color="primary"
                    placement="top"
                    variant="outlined"
                >
                    <IconButton
                        aria-label="star movie"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{position: 'absolute', top: '0.5rem', right: '0.5rem'}}
                        onClick={handleClick}
                    >
                        {favorite ? <FavoriteOutlined/> : <FavoriteBorderOutlined/>}
                    </IconButton>
                </Tooltip>
            </div>
            <img
                src={'https://image.tmdb.org/t/p/original/' + posterUrl}
                srcSet={'https://image.tmdb.org/t/p/original/' + posterUrl}
                loading="lazy"
                alt=""
                style={{ borderRadius: '8px' }}
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
                    onClick={() => setOpen(true)}
                >
                    View Details
                </Button>
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
                            This would give you the rundown on the movie 🍿
                        </Typography>
                    </Sheet>
                </Modal>
            </CardContent>
        </Card>
    )
}

export default function Page() {
    const [open, setOpen] = React.useState<boolean>(false)
    const {data, error, isLoading} = useSwr('https://api.themoviedb.org/3/movie/popular', fetcher)

    if (isLoading) {
        return (
            <Sheet
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress/>
                <h1>Loading...</h1>
            </Sheet>
        )
    }
    if (!data) return null

    const movies: TmdbMovie[] = data.results.map((movie: any) => ({
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
    }));

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
                <ModeToggle/>
            </Box>
            <br/>
            <Grid container spacing={8} justifyContent="center">
                {movies.map((movie: TmdbMovie, index: number) => (
                    <Grid key={index}>
                        <MovieCard
                            name={movie.title}
                            date={movie.release_date}
                            posterUrl={movie.poster_path}
                            voteCount={movie.vote_average}
                        />
                    </Grid>
                ))}
            </Grid>
        </Sheet>
    )
}
