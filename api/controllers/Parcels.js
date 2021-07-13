const Parcel = require("../models/parcelModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// const allParcels = [
//   {
//     parcelId: "sf00",
//     userId: "u000",
//     username: "Lima",
//     orderDate: "06/05/21",
//     shipDate: "08/05/21",
//     trackingNo:"OTN1234",
//     weight: 5,
//     from: "Jinja",
//     to: "Kampala",
//     cost: 75000,
//     status: ""
//   },
//   {
//     parcelId: "sf01",
//     userId: "u010",
//     username: "Puma",
//     orderDate: "06/05/21",
//     shipDate: "08/05/21",
//     trackingNo:"OTN1234",
//     weight: 15,
//     from: "Jinja",
//     to: "Kampala",
//     cost: 225000,
//     status:""
//   },
//   {
//     parcelId: "sf02",
//     userId: "u010",
//     username: "Puma",
//     orderDate: "06/05/21",
//     shipDate: "08/05/21",
//     trackingNo:"OTN1234",
//     weight: 1,
//     from: "Jinja",
//     to: "Kampala",
//     cost: 15000,
//     status: "Pending"
//   },
//   {
//     parcelId: "sf03",
//     userId: "u006",
//     username: "Anil",
//     orderDate: "06/05/21",
//     shipDate: "08/05/21",
//     trackingNo:"OTN1234",
//     weight: 3.5,
//     from: "Jinja",
//     to: "Kampala",
//     cost: 52500,
//     status: "Pending"
//   },
//   {
//     parcelId: "sf05",
//     userId: "u009",
//     username: "Geo",
//     orderDate: "06/05/21",
//     shipDate: "08/05/21",
//     trackingNo:"OTN1234",
//     weight: 3.5,
//     from: "Jinja",
//     to: "Kampala",
//     cost: 52500,
//     status: "En Route"
//   },
// ];

// Get all Parcels
exports.getParcels = async (
  req,
  res
  // , next
) => {
  let token = req.cookies.auth;

  await User.findByToken(token, (err, user) => {
    if (user.role === "admin") {
   
   Parcel.find({}, { __v: 0 }, (err, doc) => {
        if (err) {
          res.json({ Error: "Error loading data..." }).status(404);
          console.log(err.message);
        } else {
          res.json(doc);
        }
      });
    } else {
      return res.json({ message: "Not Authorized!" });
    }
  });

  // next();
};

// Get specific parcel
exports.getParcel = async (
  req,
  res
  // , next
) => {
  const pid = req.params.parcelId;

  let order = await Parcel.findById(pid, { __v: 0 }, (err, doc) => {
    if (err) {
      res.json({ message: "Order not found!" });
    }
    return doc;
  });

  return res.json(order);

  // let parc = allParcels.find((p) => p.parcelId === pid);
  // if (parc !== undefined) {
  //   res.json(parc);
  // } else {
  //   res.json({ message: "Invalid ID. Parcel not found!" });
  // }

  // next();
};

// Create Parcel order
exports.createOrder = async (
  req,
  res
  // , next
) => {
  let token = req.cookies.auth;
  let sender;

  await User.findByToken(token, (err, user) => {
    if (user) {
      sender = user._id;
      const newParcel = new Parcel({
        user: sender,
        orderDate: new Date(),
        trackingNo: `TN${Math.floor(1000 + Math.random() * 9000)}`,
        weight: req.body.weight,
        location: req.body.location,
        destination: req.body.destination,
        status: "Pending",
	cost: req.body.weight * 15000
      });

      newParcel
        .save()
        .then((postedOrder) => {
          return res
            .json({
	      success:true,
	      message:"Order Successful!",
              parcelId: postedOrder._id,
              sender: postedOrder.user,
              orderDate: postedOrder.orderDate,
              trackingNo: postedOrder.trackingNo,
              from: postedOrder.location,
              to: postedOrder.destination,
              weight: postedOrder.weight,
              cost: postedOrder.cost,
            })
            .status(201);
        })
        .catch((err) => {
          return res.json({ success: false, message: err.message });
        });
    } else {
      res.json({ message: err.message });
    }
  });

  // const { parcelId, weight, from, to } = req.body;

  // let newOrder = req.body;
  // let userInput = Object.values(newOrder).some(i=>Boolean(i)==false);

  // if(userInput!==true){
  //   allParcels.push({ ...newOrder, orderDate:od, trackingNo: `TN${Math.floor(1000 + Math.random() * 9000)}`,cost: weight * 15000 });

  //   res.json({ message: "Successfully added!"});
  // }
  // else{
  //   res.json({message:"All Fields required!"});
  // }

  // next();
};

// Cancel order

exports.cancelOrder = async (
  req,
  res
  // , next
) => {
  let token = req.cookies.auth;
  let oid = req.params.parcelId;

  await User.findByToken(token, (err, user) => {
    if (user) {
      Parcel.findOneAndUpdate(
        {
          _id: oid,
          user: user._id.toString(),
          status: { $ne: "Delivered" },
        },
        { status: "Canceled" },
        (err, doc) => {
          if (doc) {
            res.json({ message: "Parcel order canceled!", user: req.user });
          } else {
            res.json({
              message: "Sorry, parcel out for delivery. Cannot cancel order!",
            });
          }
        }
      );
    } else {
      return res.json({ message: "Not Authorized!" });
    }
  });

  // let ordIndex = allParcels.findIndex((p) => p.parcelId === oid);
  // let order = allParcels.find((l) => l.parcelId === oid);
  // allParcels
  //   .filter((l) => l.parcelId === oid)
  //   .map((m) => (m.status = "Canceled"));
  // canceledOrders.push(order);

  // if (ordIndex !== -1) {
  //   allParcels.splice(ordIndex, 1);
  //   // res.json(canceledOrders)
  //   res.json({ message: "Order canceled successfully!" });
  // } else {
  //   return res.json({ message: "Something went wrong! Order not canceled!" });
  // }

  // next();
};

// // get orders by user
// exports.userOrders = (req, res, next) => {

//   let uid = req.params.userId;

//   let ods = allParcels.filter((u) => u.userId === uid);

//   if (ods != "") {
//     res.json(ods);
//   } else {
//     return res.json({ message: "No orders available!" });
//   }

//   next();
// };

// get user orders
exports.userOrders = async (
  req,
  res
  // next
) => {
  let uid = req.params.userId;

  const ud = await Parcel.find({ user: uid }, { __v: 0 }, (err, doc) => {
    if (err) throw err;
    if (doc) return res.json(doc).status(200);
  });
  return ud;
  // next();
};

// Change destination of order

exports.destinationChange = async (
  req,
  res
  // , next
) => {
  let token = req.cookies.auth;

  await User.findByToken(token, (err, user) => {
    if (user) {
      let oid = req.params.parcelId;
      let destination = req.body.destination;

      Parcel.findOneAndUpdate(
        {
          _id: oid,
          status: { $ne: "Delivered" },
        },
        { destination: destination },
        (err, doc) => {
          if (doc) {
            res.json({ message: "Parcel destination changed!" });
          } else {
            res.json({
              message:
                "Sorry, parcel out for delivery. Cannot change destination!",
            });
          }
        }
      );
    } else {
      return res.json({ message: "Not Authorized!" });
    }
  });
};

// Change status of order

exports.statusChange = async (req, res) => {
  let token = req.cookies.auth;
  await User.findByToken(token, (err, user) => {
    if (user.role === "admin") {
      let oid = req.params.parcelId;
      let status = req.body.status;

      Parcel.findOneAndUpdate({ _id: oid }, { status: status }, (err, doc) => {
        if (doc) {
          res.json({ message: "Parcel status changed!" });
          return;
        }
      });
    } else {
      return res.json({ message: " Not Authorized!" });
    }
  });
};

// Change current location of order

exports.locationChange = async (req, res) => {
  let token = req.cookies.auth;

  await User.findByToken(token, (err, user) => {
    if (user.role === "admin") {
      let oid = req.params.parcelId;
      let location = req.body.location;

      Parcel.findOneAndUpdate(
        { _id: oid },
        { location: location },
        (err, doc) => {
          if (doc) {
            res.json({ message: "Parcel location changed!" });
            return;
          }
        }
      );
    } else {
      return res.json({ message: "Not Authorized!" });
    }
  });
};
