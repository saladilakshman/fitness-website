import { Layout } from "./layout";
import Loader from "./loader";
import { useGetSimilarExercisesQuery } from "../services/apiservices";
import { Typography, Stack, IconButton } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { useContext } from "react";
import { Gymstate } from "../App";
import "../App.css";
// eslint-disable-next-line react/prop-types
const TargetList = ({ targetname }) => {
  const { isMobile, scroll_navigation } = useContext(Gymstate);
  const { data, isLoading, isError } = useGetSimilarExercisesQuery(targetname);
  return (
    <>
      {isLoading && <Loader />}
      {isError && (
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ paddingBlockStart: 2 }}
        >
          Oops! something went wrong
        </Typography>
      )}
      <div style={{ position: "relative" }}>
        <Stack
          direction="row"
          justifyContent={"flex-start"}
          alignItems="center"
          spacing={2}
          sx={{
            marginBlockStart: 1,
            overflow: isMobile ? "scroll" : "hidden",
          }}
          className="target-types"
        >
          {data && (
            <>
              {data?.map((item) => {
                const { id, gifUrl, name, secondaryMuscles } = item;
                return (
                  <Layout
                    key={id}
                    Id={id}
                    gifurl={gifUrl}
                    name={name}
                    muscles={secondaryMuscles}
                  />
                );
              })}
              {!isMobile && (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    position: "absolute",
                    right: 2,
                    bottom: -32,
                  }}
                >
                  <IconButton
                    sx={{
                      backgroundColor: "#ff2625",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#ff2625",
                        color: "white",
                      },
                    }}
                    onClick={() => scroll_navigation(".target-types", -700)}
                  >
                    <WestIcon />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: "#ff2625",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#ff2625",
                        color: "white",
                      },
                    }}
                    onClick={() => scroll_navigation(".target-types", 700)}
                  >
                    <EastIcon />
                  </IconButton>
                </Stack>
              )}
            </>
          )}
        </Stack>
      </div>
    </>
  );
};
export default TargetList;
