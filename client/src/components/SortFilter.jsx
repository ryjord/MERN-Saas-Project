import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortFilter = ({ sort, setSort }) => {
  return (
    <Box display="flex" gap="1rem" mb="1rem">
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sort.field}
          label="Sort By"
          onChange={(e) => setSort({ ...sort, field: e.target.value })}
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Order</InputLabel>
        <Select
          value={sort.order}
          label="Order"
          onChange={(e) => setSort({ ...sort, order: e.target.value })}
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortFilter;