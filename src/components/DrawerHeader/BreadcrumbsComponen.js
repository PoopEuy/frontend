import React from "react";
import { useRouter } from "next/router";

//material ui core
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function SimpleBreadcrumbs() {
  const router = useRouter();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Typography color="textPrimary">Breadcrumb</Typography>
      <Typography color="textPrimary">Breadcrumb</Typography>
    </Breadcrumbs>
  );
}
