const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const PAYMENT_METHOD = require("../enums/payment-method.enum");
const PAYMENT_STATUS = require("../enums/payment-status.enum");

const Payment = sequelize.define(
  "Payment",
  {
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM(...Object.values(PAYMENT_METHOD)),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(PAYMENT_STATUS)),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { timestamps: false },
);

module.exports = Payment;
