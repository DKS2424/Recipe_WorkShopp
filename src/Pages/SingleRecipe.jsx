import {
    Box,
    Chip,
    Divider,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";

export default function SingleRecipe() {
    const [imageIndex, setImageIndex] = useState(0)
    const { id } = useParams(); // Fetching the recipe ID from the URL params
    const [recipeInfo, setRecipeInfo] = useState(null); // State for recipe details
    const [error, setError] = useState(false); // State for error handling
    console.log(recipeInfo)
    // Fetch the recipe details from API when the component is mounted
    useEffect(() => {
        axios
            .get(`https://dummyjson.com/recipes/${id}`) // Fetching recipe by ID
            .then((response) => {
                setRecipeInfo(response.data); // Set the fetched recipe data to state
            })
            .catch((error) => {
                console.error("Error fetching recipe:", error); // Log errors
                setError(true); // Set error state
            });
    }, [id]); // Add `id` to dependency array to refetch if it changes

    // Show error message if the API call fails
    if (error) {
        return <Typography color="error">Failed to load recipe data.</Typography>;
    }

    // Show a loading state while the API call is in progress
    if (!recipeInfo) {
        return <Typography>Loading...</Typography>;
    }

    // Main UI for the recipe
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                {/* Left Column: Recipe Image */}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={1}
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            padding: 2,

                        }}
                    >
                        <img
                            src={recipeInfo.image}
                            alt={recipeInfo.name}
                            style={{
                                width: "100%",
                                // maxHeight: "500px",
                                objectFit: "contain",
                            }}
                        />
                    </Paper>
                </Grid>


                {/* Right Column: Recipe Details */}
                <Grid item xs={12} md={5}>
                    <Paper elevation={0} sx={{ height: "100vh", padding: 2 }}>
                        {/* Recipe Title */}
                        <Box>
                            <Typography
                                variant="h5"
                                color="text.primary"
                                sx={{ fontWeight: "bolder" }}
                            >
                                {recipeInfo.name || "No Title Available"}
                            </Typography>
                        </Box>

                        {/* Recipe Rating and Tags */}
                        <Box
                            sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
                        >
                            <Chip
                                size="small"
                                label={recipeInfo.rating || "N/A"}
                                color={
                                    recipeInfo.rating > 4.5
                                        ? "success"
                                        : recipeInfo.rating > 4
                                            ? "warning"
                                            : "error"
                                }
                                icon={<StarRateIcon sx={{ fontSize: "16px" }} />}
                                sx={{ borderRadius: "10px" }}
                            />

                        </Box>

                        {/* Recipe Category */}
                        <Box
                            sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
                        >
                            <Typography
                                variant="body1"
                                mt={1}
                                fontWeight={"bolder"}
                                color="text.secondary"
                            >
                                ingredients: {recipeInfo.ingredients
                                    || "Unknown"}
                            </Typography>
                        </Box>

                        {/* Recipe Description */}
                        <Box>
                            <Typography variant="body1" mt={2} color="text.secondary">
                                {recipeInfo.
                                    instructions || "No description available."}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* Recipe Details Table */}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Prep Time</TableCell>
                                        <TableCell>
                                            {recipeInfo.prepTimeMinutes
                                                ? `${recipeInfo.prepTimeMinutes} mins`
                                                : "N/A"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Cook Time</TableCell>
                                        <TableCell>
                                            {recipeInfo.cookTimeMinutes
                                                ? `${recipeInfo.cookTimeMinutes} mins`
                                                : "N/A"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Servings</TableCell>
                                        <TableCell>{recipeInfo.servings || "N/A"}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody></TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>

    );
}
