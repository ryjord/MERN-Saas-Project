// Imports
import React, { useState } from "react";
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery, TextField, InputAdornment, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import SortFilter from "components/SortFilter";

// Product component
const Product = ({_id, name, description, price, rating, category, supply, stat,}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card sx={{ backgroundImage: "none", backgroundColor: theme.palette.background.alt, borderRadius: "0.55rem",}}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="primary" size="small" onClick={() => setIsExpanded(!isExpanded)}>
          See More
        </Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.neutral[300], }}>
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

// product list component
const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "name", order: "asc" });

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? ( 
        <Box mt="20px" >
          <TextField label="Search Products" variant="outlined" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} sx={{ mb: "1rem" }} InputProps={{ endAdornment: ( <InputAdornment position="end"> 
          <IconButton> 
            <Search /> 
          </IconButton> 
          </InputAdornment> ),}} />
          <SortFilter sort={sort} setSort={setSort} />
        <Box display="grid" gridTemplateColumns="repeat(4, minmax(0, 1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },}} >
          {data
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.description.toLowerCase().includes(search.toLowerCase())
            )
            .sort((a, b) => {
              if (sort.field === "name") {
                return sort.order === "asc"
                  ? a.name.localeCompare(b.name)
                  : b.name.localeCompare(a.name);
              } else {
                return sort.order === "asc"
                  ? a[sort.field] - b[sort.field]
                  : b[sort.field] - a[sort.field];
                }}).map( ({ _id, name, description, price, rating, category, supply, stat, 
            }) => ( <Product key={_id} _id={_id} name={name} description={description} price={price} rating={rating} category={category} supply={supply} stat={stat}/>
            )
          )}
        </Box>
        </Box>
        ) : ( <>Loading...</>)}
    </Box>
  );
};

export default Products;