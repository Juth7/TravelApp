import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import NoAcceso from "../NoAcceso";
import "./AdminPanel.css";
import Leftbar from "./Leftbar";
import NavAdmin from "./NavAdmin";
import Welcome from "./Welcome";

function AdminPanel() {
  const admin = useSelector((state) => state.isAdmin);

  return (
    <>
      {admin ? (
        <div>
          <NavAdmin />
          <Grid container>
            <Grid item sm={2} xs={2}>
              <Leftbar />
            </Grid>
            <Grid item sm={7} xs={10}>
              <Welcome />
            </Grid>
          </Grid>
        </div>
      ) : (
        <NoAcceso />
      )}
      )
    </>
  );
}
export default AdminPanel;
