var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/Buyer")
const Vendor = require("../models/Vendor");
const Food = require("../models/FoodItems");
const Order = require("../models/Orders");
const User = require("../models/Users");
const Fav = require("../models/Fav");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


router.post("/login", (req, res) => {
    const email = req.body.email;
    console.log(req.body)//just verfying the things
    // Find user by email
    let response = {
        val: "",
        name: ""
    };

    const pw = req.body.pw;
    Buyer.findOne({ email: email, password: pw })
        .then(user => {
            // Check if user email exists
            if (!user) {
                Vendor.findOne({ email: email, password: pw })
                    .then(user => {
                        // Check if user email exists
                        if (!user) {
                            response.val = 0;
                        }
                        else {
                            response.val = 2;
                        }
                        response.name = user.shop;
                        res.status(200).json(response);
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    });
            }
            else {
                response.val = 1;
                res.status(200).json(response);

            }
        })
        .catch(err => {
            res.status(400).send(err);
        });
});


router.post("/bregister", (req, res) => {
    const email = req.body.email;
    console.log(req.body)//just verfying the things
    // Find user by email
    let response = {
        val: "",
        name: ""
    };
    Buyer.findOne({ email: email }).then(user => {
        // Check if user email exists and this is failure
        if (user) {
            response.val = 0;
            response.name = req.body.name;
            res.status(200).json(response);
        }
        else {
            response.val = 1;
            const newUser = new Buyer({
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                age: req.body.age,
                batch: req.body.batch,
                password: req.body.password
            });

            newUser.save()
                .then(user => {
                    response.name = req.body.name;
                    res.status(200).json(response);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });
});


//still pending
router.post("/vregister", (req, res) => {

    const email = req.body.email;
    const shop = req.body.shop;
    console.log(req.body)//just verfying the things
    // Find user by email
    let response = {
        val: "",
        name: ""
    };

    Vendor.findOne({ email: email }).then(user => {
        // Check if user email exists and this is failure
        if (user) {
            response.val = 0;
            response.name = req.body.name;
            res.status(200).json(response);
        }
        else {
            Vendor.findOne({ shop: shop }).then(uuser => {
                const open = req.body.canteenopen + ":" + "00" + ":" + "00";
                const close = req.body.canteenclose + ":" + "00" + ":" + "00";
                console.log(open);
                console.log(close);
                if (uuser) {
                    response.val = 0;
                    response.name = req.body.name;
                    res.status(200).json(response);
                }
                else {
                    response.val = 1;
                    const newUser = new Vendor({
                        name: req.body.name,
                        shop: req.body.shop,
                        email: req.body.email,
                        contactno: req.body.contactno,
                        canteenopen: open,
                        canteenclose: close,
                        password: req.body.password
                    });

                    newUser.save()
                        .then(user => {
                            console.log("New Vendor is: ");
                            console.log(newUser);
                            response.name = req.body.name;
                            res.status(200).json(response);
                        })
                        .catch(err => {
                            res.status(400).send(err);
                        });
                }
            });

        }
    });
});


router.post("/binfo", (req, res) => {
    // console.log(req.body);
    const email = req.body.email;
    Buyer.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json(user);
            }
        })
});



router.post("/bedit", (req, res) => {
    const email = req.body.email;
    let response = {
        val: ""
    };
    Buyer.findOne({ email: email }).then(user => {
        if (user) {
            user.name = req.body.name;
            user.age = req.body.age;
            user.batch = req.body.batch;
            user.contact = req.body.contact;
            user.password = req.body.password;
            user.save()
            response.val = 1;
        }
        else {
            //failure
            response.val = 0;
        }
    });
});













router.get("/fooditems", function (req, res) {
    Food.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/fooditems", function (req, res) {
    const email = req.body.email;

    Food.find({ email: email }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});




router.post("/ufforderitems", function (req, res) {
    const vemail = req.body.email;
    Food.find({ email: vemail }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});





router.post("/addorder", function (req, res) {
    let response = {
        val: ""
    }
    response.val = 0;
    const id = req.body.id;

    Food.findById(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            const uff = users.buyers;
            users.buyers = 1 + uff;
            users.save()

                .then(User => {
                    response.val = 1;
                })
                .catch(err => {
                    console.log("Error while updating no. of buyers!!");
                    console.log(err);
                });
        }
    })

    console.log("The information is:");
    console.log(req.body);



    Buyer.findOne({ email: req.body.bemail }, function (err, users) {
        if (err) {
            console.log("error in findinh buyer");
            console.log(err);
        } else {
            // users.fav.app
            var cost = parseInt(req.body.qty) * parseInt(req.body.price);
            //order can be placed
            if (users.money >= cost) {
                const mon = users.money;
                users.money = mon - cost;

                const newUser = new Order({
                    bemail: req.body.bemail,
                    vemail: req.body.vemail,
                    item: req.body.item,
                    qty: req.body.qty,
                    shop: req.body.shop,
                    status: req.body.status,
                    price: req.body.price,
                    placed:Date.now()
                })
                newUser.save()
                    .then(User => {
                    })
                    .catch(err => {
                        console.log("Errorrrrrs occured while placing order!!");
                        console.log(err);
                        res.status(400).send(err);
                    });

                users.save()
                    .then(User => {
                    })
                    .catch(err => {
                        console.log("Error occured while deducting money!!");
                        console.log(err);
                        // res.status(400).send(err);
                    });
                response.val = 1;
                res.json(response);

            }
            else {
                console.log("wallet insufficinet");
                response.val = 0;
                res.json(response);
            }
        }
    })


});




router.post("/pickorder", function (req, res) {
    let response = {
        val: ""
    }
    response.val = 0;
    const id = req.body.id;

    // console.log("The information is:");
    // console.log(req.body);

    Order.findById(id, function (err, users) {
        if (err) {
            response.val = 0;
        } else {
            console.log(users);

            if (users.status == "readyforpickup") {
                users.status = "completed";
            }

            users.save()
                .then(User => {
                    response.val = 1;
                    res.status(200).json(response);
                })
                .catch(err => {
                    console.log("Error occured while saving!!");
                    res.status(400).send(err);
                });
        }
    })

});




router.post("/rate", function (req, res) {
    let response = {
        val: ""
    }
    response.val = 0;
    const id = req.body.id;
    const rate = req.body.rating;

    // console.log("The information is:");
    // console.log(req.body);

    Order.findById(id, function (err, users) {
        if (err) {
            response.val = 0;
        } else {
            console.log(users);

            const vemail = users.vemail;
            const item = users.item;
            if (!users.rating) {
                Food.findOne({ email: vemail, name: item }, function (err, userrs) {
                    const peep = userrs.peep + 1;
                    userrs.peep = peep;
                    const rating = userrs.rating;
                    userrs.rating = rating + rate;
                    users.rating = rate;
                    users.save();
                    userrs.save()
                        .then(User => {
                            response.val = 1;
                            res.status(200).json(response);
                        })
                        .catch(err => {
                            console.log("Error occured while saving!!");
                            res.status(400).send(err);
                        });
                });
            }
        }
    })

});


router.post("/getbyid", function (req, res) {
    const id = req.body.id;

    Food.findById(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log(users);
            res.json(users);
        }
    })

});

router.post("/addfav", function (req, res) {
    const id = req.body.itemid;
    const buyeremail = req.body.bemail;

    let response = {
        val: ""
    }

    response.val = 0;


    Food.findById(id, function (err, userrs) {
        if (userrs) {
            const rating = parseInt(userrs.rating);
            const peep = parseInt(userrs.peep);
            console.log(userrs);
            var rattte = 0;
            if (rating == 0 || peep == 0)
                rattte = 0;
            else
                rattte = (rating / peep).toFixed(2);

            Fav.findOne({ bemail: buyeremail, id: id }, function (err, users) {
                if (!users) {
                    //not added to favourites yet
                    const newUser = new Fav({
                        name: userrs.name,
                        bemail: buyeremail,
                        vemail: userrs.email,
                        rating: rattte,
                        price: userrs.price,
                        id: id
                    });

                    newUser.save()
                        .then(User => {
                            response.val = 1;
                            res.status(200).json(response);
                        })
                        .catch(err => {
                            console.log("Error while adding to favourites tab of buyer!!");
                            res.status(400).send(err);
                        });
                }
                else {
                    response.val = 2;
                    res.json(response);
                }
            })


        }
        else {
            response.val = -1;
            res.json(response);
        }
    })
    //how to add array of strings..?
})


router.post("/favlist", function (req, res) {
    const buyeremail = req.body.bemail;
    let response = {
        val: ""
    }
    response.val = 0;

    Fav.find({ bemail: buyeremail }, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            // users.fav.app
            console.log("List of Favourites is..")
            console.log(users);
            res.json(users);
        }
    })

});

router.post("/addmoney", function (req, res) {
    const buyeremail = req.body.email;
    console.log(buyeremail);
    var money = parseInt(req.body.money);

    let response = {
        val: ""
    }
    response.val = 0;
    console.log("came here!!");

    Buyer.findOne({ email: buyeremail }, function (err, users) {
        let response = {
            val: ""
        }
        response.val = 0;
        if (err) {
            console.log("couldn't find");
            console.log(err);
        } else {
            var hehe = parseInt(users.money);
            users.money = parseInt(hehe + money);
            users.save()
                .then(user => {
                    response.val = 1;
                    res.json(response);
                })
                .catch(err => {
                    console.log("Error in saving money to be added!!");
                    res.status(400).send(err);
                });
        }

    })

});


router.post("/foodavail", function (req, res) {
    const id = req.body.itemid;

    let response = {
        val: ""
    }
    response.val = -1;

    Food.findById(id, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log("the user is...")
            console.log(users);
            if (users) {
                const email = users.email;
                Vendor.findOne({ email: email }, function (err, use) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(use);
                        nowtime = new Date()

                        var staart = use.canteenopen;
                        var eeend = use.canteenclose;
                        oooopen = new Date(nowtime.getTime());
                        oooopen.setHours(staart.split(":")[0]);
                        oooopen.setMinutes(staart.split(":")[1]);
                        oooopen.setSeconds(staart.split(":")[2]);

                        clooose = new Date(nowtime.getTime());
                        clooose.setHours(eeend.split(":")[0]);
                        clooose.setMinutes(eeend.split(":")[1]);
                        clooose.setSeconds(eeend.split(":")[2]);

                        console.log(staart)
                        console.log(nowtime);

                        Isvalid = oooopen < nowtime && clooose > nowtime;
                        console.log("Validation answer is..")
                        console.log(Isvalid);
                        if (Isvalid == false) {
                            response.val = 0;
                            res.json(response);
                        }
                        else {
                            response.val = 1;
                            res.json(response);
                        }

                    }
                })
            }
            else{
                response.val=0;
                res.json(response);
            }
        }
    })

});

module.exports = router;