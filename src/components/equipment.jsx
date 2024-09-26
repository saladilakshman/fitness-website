import { Typography, Stack, Box, IconButton } from "@mui/material";
import Loader from "./loader";
import { Layout } from "./layout";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import { useContext } from "react";
import { Gymstate } from "../App";
import "../App.css";
// eslint-disable-next-line react/prop-types
import { useGetSimilarEquipmentExerciseQuery } from "../services/apiservices";
// eslint-disable-next-line react/prop-types
const EquipmentList = ({ equipmentname }) => {
  const { data, isLoading, isError } =
    useGetSimilarEquipmentExerciseQuery(equipmentname);
  const { isMobile, scroll_navigation } = useContext(Gymstate);
  return (
    <>
      {isLoading && <Loader />}
      {isError && (
        <Typography variant="h4">Oops! something went wrong</Typography>
      )}
      {data && (
        <Box position="relative" sx={{ width: "100%" }}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            className="equipment-types"
            sx={{
              overflow: isMobile ? "scroll" : "hidden",
              paddingBottom: 2,
              marginBlockStart: 1,
            }}
            spacing={2}
          >
            {data?.map((item) => {
              const { id, gifUrl, name, secondaryMuscles } = item;
              return (
                <Layout
                  key={id}
                  gifurl={gifUrl}
                  name={name}
                  muscles={secondaryMuscles}
                />
              );
            })}
          </Stack>
          {!isMobile && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{
                position: "absolute",
                right: 2,
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
                onClick={() => scroll_navigation(".equipment-types", -700)}
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
                onClick={() => scroll_navigation(".equipment-types", 700)}
              >
                <EastIcon />
              </IconButton>
            </Stack>
          )}
        </Box>
      )}
    </>
  );
};
export default EquipmentList;
