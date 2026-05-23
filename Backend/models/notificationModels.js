const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },

        type: {
            type: String,
            enum: ["general", "class"],
            required: true,
        },

        classId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            default: null,
        },

        priority: { type: String, enum: ["normal", "important", "urgent"], default: "normal" },

        expiresAt: { type: Date},

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);