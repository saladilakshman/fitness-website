import { useContext } from "react";
import { Gymstate } from "../App";
import { Paper, Box, Stack, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars, react/prop-types
export const Layout = ({ Id, gifurl, name, muscles }) => {
  const { isMobile, appStyles } = useContext(Gymstate);
  const navigate = useNavigate();
  return (
    <>
      <Paper sx={{ ...appStyles.paper, maxWidth: 'auto' }} onClick={() => {
        navigate(`/${Id}`)
        document.documentElement.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }}>
        <Box
          component="img"
          alt=""
          src={gifurl}
          sx={{
            minWidth: '100%',
            height: '100%',
          }}
          loading="lazy"
        />
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            paddingInlineStart: 2,
          }}
          spacing={2}
        >
          <Chip
            label={muscles[0]}
            size="small"
            sx={appStyles.gymbutton}
            id="gym-element"
          />
          <Chip
            label={muscles[1]}
            size="small"
            sx={{
              ...appStyles.gymbutton,
              display: muscles[1] ? "" : "none",
              backgroundColor: '#fdaaaa'
            }}
          />
        </Stack>
        <Typography variant={isMobile ? "body2" : "h6"} sx={appStyles.gymtext}>
          {name}
        </Typography>
      </Paper>
    </>
  );
};
