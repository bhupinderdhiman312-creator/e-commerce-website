const User = require("../models/userModels.js");

const express = require("express");

const router = express.Router()

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const Product = require("../models/productmodel.js");

const dotenv = require("dotenv")
dotenv.config();

const { authMiddleware ,checkAdmin} = require("../middlware/auth.js");

const Order = require("../models/buynow.js");

// const Product = require("../models/Product");

// const Cart = require("../models/cartModel.js");

const multer = require("multer");
const Cart = require("../models/addtocart.js");

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, "uploads/") } ,
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });

router.post("/register", async (req, res) => {
    const { name, email,  password } = req.body;
    if (!name, !email, !password) {
        return res.status(400).json({error:"Please provide all fields"})
    }
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashPassword })
        await newUser.save()
const token = jwt.sign(
      { id: newUser._id, role: newUser.role, name: newUser.name },
      process.env.Key,
      { expiresIn: "1h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({
      message: "Register succesfully",
      token,
      role: newUser.role,
    });    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    
})

router.post("/login", async (req, res) => {
    const {  email, password } = req.body;
    if ( !email, !password) {
        return res.status(400).json({error:"Please provide all fields"})
    }
    try {
        const newUser = await User.findOne({ email })
        if( !newUser ){
         return res.status(400).json({ message: "user not found"})
        }
    const isMatch = await bcrypt.compare( password, newUser.password)
    if( !isMatch ){
         return res.status(400).json({ message: "wrong"})
        }
        const token = jwt.sign({ id: newUser._id,role: newUser.role, name:newUser.name}, process.env.key, {
        expiresIn: "1h",
    });
        res.cookie("token", token,{
          httpOnly:true,
          secure:true,
          sameSite:"none",
        })
        // console.log(token)
        res.status(200).json({ message: "Login Seccessfully" , token, role:newUser.role})

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
    
})

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.json(products);
  } catch (err) {
    res.status(500).json({ err: "product not find" })
    
  }
});

router.post("/admin",authMiddleware,checkAdmin,upload.single("image"), async (req, res) => {

  try {
    console.log(req.user)
    console.log(req.body);
        console.log(req.file);
    const { name, price, discription } = req.body;
    const imagePath = req.file ? req.file.filename : null;
    const newproduct=new Product({name, price, discription, image:imagePath})
    await newproduct.save();
    res.status(200).json({message:"Product add succesfully"})
    
  } catch(err) {
    res.status(500).json({message:err.message});
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,   // true if HTTPS
    sameSite: "none", // must match login
  });
  res.json({ message: "Logged out successfully" });
});

router.post("/addtocart", async (req, res) => {
  try {
    const { name, price,image} = req.body;
    const newcart = new Cart({ name, price,image});
    await newcart.save();
    res.status(200).json({ message: "Product add Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/cart", async (req, res) => {
  try {
    const items = await Cart.find(); // Fetch all items in cart collection
    res.status(200).json(items);
  } catch{
    // console.log(err)
    res.status(500).json({ message: err.message });
  }
});

router.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params; // get id from URL
    await Cart.findByIdAndDelete(id);

    res.status(200).json({ message: "Cart item Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/buynow/add", async (req, res) => {
  try {

    console.log("BODY:", req.body);

    const { productname, customername, price, email, phone, address, state, image } = req.body;

    const newOrder = new Order({
      productname,
      customername,
      price,
      email,
      phone,
      address,
      state,
      image,
    });

    await newOrder.save();

    res.status(200).json({ message: "Order Placed Successfully ✅" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/buynow", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully ✅",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

router.get("/showuser", async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

router.delete("/deleteuser/:id",async (req, res) => {
  try {
    const { id } = req.params; // get id from URL
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "user deleted successfully" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }
});

router.post("/cart", async (req, res) => {
  try {
    const newItem = new Cart(req.body);
    await newItem.save();
    res.json({ message: "Added to cart successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/cart", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;