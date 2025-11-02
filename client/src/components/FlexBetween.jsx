
// style component for flex between
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const FlexBetween = styled(Box)(({ justify = "space-between", align = "center", gap = 0 }) => ({
  display: "flex",
  justifyContent: justify,
  alignItems: align,
  gap: gap,
}));

export default FlexBetween;