/* const cron = require("node-cron");
const Budget = require("../model/budget");
const Notification = require("../model/notification");
const User = require("../model/user");
const sendExpoNotification = require("../service/pushService"); */
const https = require("https");
const crons = require("cron");


// Runs every day at midnight
/* cron.schedule("0 0 * * *", async () => {
  console.log("🔔 Running daily budget check...");

  try {
    const budgets = await Budget.find().populate("userId");

    for (const budget of budgets) {
      for (const category of budget.categories) {
        const percentUsed = (category.spent / category.limit) * 100;

        if (percentUsed >= 80 && percentUsed < 100) {
          const remaining = category.limit - category.spent;

          const title = `Budget Alert: ${category.name}`;
          const message = `You've spent ${Math.round(percentUsed)}% of your ${
            category.name
          } budget. ₵${remaining} remaining.`;

          // a) Save notification
          await Notification.create({
            user: budget.userId._id,
            title,
            message,
            read: false,
            icon: "warning",
            color: "#f59e0b",
            category: "budget",
          });

          // b) Push notification
          if (budget.userId.expoPushTokens?.length > 0) {
            await sendExpoNotification(
              budget.userId.expoPushTokens,
              title,
              message,
              { screen: "/Notification" }
            );
          }
        }
      }
    }

    console.log("✅ Daily budget check completed.");
  } catch (err) {
    console.error("❌ Budget check error:", err.message);
  }
});
 */
const callServer = new crons.CronJob("*/12 * * * *", async () => {
  https
    .get(process.env.SERVER_URL, (res) => {
      console.log("🚀 Server is running");
    })
    .on("error", (err) => {
      console.error("🚨 Server is not running");
    });
  ``;
});

module.exports = callServer;
