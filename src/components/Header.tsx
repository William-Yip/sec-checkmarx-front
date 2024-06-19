import { Button, Grid } from "@mui/material";

function Header() {
  return (
    <Grid
      container
      height="110px"
      alignItems="center"
      justifyContent="space-between"
      textAlign="start"
      p={2}
    >
    <Grid item xs={12} sm={12} md={12} lg={12}>
        <img
          style={{ height: "24px", width: "120px" }}
          src="https://checkmarx.com/wp-content/uploads/2024/01/logo.svg"
        />
      </Grid>

    </Grid>
  );
}

export default Header;
