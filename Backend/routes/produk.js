const express = require("express");
const Produk = require("../models/produk");
const Cart = require("../models/cart");
const http = require("http");
const url = require("url");

const router = express.Router();

router.get("/detail/:id", (req, res) => {
    Produk.findById(req.params.id, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/", (req, res) => {
    Produk.find({}, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
});

router.get("/accessories", (req, res) => {
    Produk.find({ kategori: "accessories" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/denim", (req, res) => {
    Produk.find({ kategori: "denim" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/footwear", (req, res) => {
    Produk.find({ kategori: "footwear" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/jeans", (req, res) => {
    Produk.find({ kategori: "jeans" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/outerwear", (req, res) => {
    Produk.find({ kategori: "outerwear" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/pants", (req, res) => {
    Produk.find({ kategori: "pants" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/shirts", (req, res) => {
    Produk.find({ kategori: "shirts" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/t-shirts", (req, res) => {
    Produk.find({ kategori: "t-shirts" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/shorts", (req, res) => {
    Produk.find({ kategori: "shorts" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.get("/cart", (req, res) => {
    Produk.find({ status: "abc" }, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.post("/", (req, res) => {
    if (!req.files.gambar) {
        return res.status(400).send("No files were uploaded");
    }

    let image = req.files.gambar;
    let date = new Date();
    let imageName = date.getTime() + ".png";

    image.mv("./public/gambar/" + imageName, (error) => {
        let newProduk = new Produk({
            nama: req.body.nama,
            kategori: req.body.kategori,
            harga: req.body.harga,
            warna: req.body.warna,
            ukuran: req.body.ukuran,
            gambar: "http://localhost:3000/gambar/" + imageName,
            status: req.body.status
        });

        newProduk.save((error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(newProduk);
            }
        })
    });
});

router.put('/edit/:id', function (req, res, next) {
    Produk.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

router.get("/cartlist", (req, res) => {
    Cart.find({}, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json(result);
        }
    });
})

router.post("/cartlist", (req, res) => {

   
        let newCart = new Cart({
            id: req.body.id
        });

        newCart.save((error) => {
            if (error) {
                res.status(500).send(error);
            } else {
                res.json(newCart);
            }
        });
});

router.delete("/cartlist/:id", (req, res) => {
    Cart.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json({ message: "Data deleted" });
        }
    });
});

router.delete("/cartlist", (req, res) => {
    Cart.remove({}, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json({ message: "Data deleted" });
        }
    });
});

router.delete("/cartlist/detail", (req, res) => {
    Cart.remove({id : req.body.id}, (error, result) => {
        if (error) {
            res.status(500).json(error);
        } else {
            res.json({ message: "Data deleted" });
        }
    });
});

module.exports = (function () {
    return router;
})();