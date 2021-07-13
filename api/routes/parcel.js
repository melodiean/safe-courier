const express = require("express");

const router = express.Router();

const {
  getParcels,
  getParcel,
  createOrder,
  cancelOrder,
  userOrders,
  destinationChange,
  statusChange,
  locationChange,
} = require("../controllers/Parcels");

router.get("/parcels", getParcels);

router.get("/parcels/:parcelId", getParcel);

router.post("/parcels", createOrder);

router.put("/parcels/:parcelId/cancel", cancelOrder);

router.get("/users/:userId/parcels", userOrders);

router.put("/parcels/:parcelId/destination", destinationChange);

router.put("/parcels/:parcelId/status", statusChange);

router.put("/parcels/:parcelId/presentLocation", locationChange);

module.exports = router;
