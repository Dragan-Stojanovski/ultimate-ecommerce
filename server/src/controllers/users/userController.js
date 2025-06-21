const UserSchema = require("../../models/users/userSchema");
const bcrypt = require("bcryptjs");

exports.getUserOwnData = async (req, res) => {
    try {
      const userData = await UserSchema.findById(req.user.userId).select("-password");
      res.json(userData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const userId = req.params.id;
      const updateFields = req.body;
  
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: "No fields to update" });
      }
  
      const updatedUser = await UserSchema.findByIdAndUpdate(userId, updateFields, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ message: "Validation error", errors: validationErrors });
      }
  
      res.status(500).json({ message: "Error updating user", error: error.message });
    }
  };

exports.getAllUsers = async (req, res) => {
  try {
    const { username = "", page = 1, limit = 10 } = req.body;

    const query = {};
    if (username) {
      query.username = { $regex: `^${username}`, $options: "i" }; // case-insensitive starts with
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      UserSchema.find(query, 'username email isAdmin canAccess')
        .skip(skip)
        .limit(limit),
      UserSchema.countDocuments(query),
    ]);

    res.status(200).json({
      users,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};


  exports.updateUserAccess = async (req, res) => {
    const { userId, canAccess } = req.body;
  
    try {
      const user = await UserSchema.findByIdAndUpdate(
        userId,
        { canAccess },
        { new: true } // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'User access updated successfully',
        user,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user access', error: error.message });
    }
  };