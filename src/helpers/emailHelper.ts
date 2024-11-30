import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const EMAIL_ID = process.env.EMAIL_ID;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
interface OrderDetails {
  orderId: number;
  customerName: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
  orderDate: string;
  address: string;
  phoneNo: string;
}
export const sendEmailToSelf = async (orderDetails: OrderDetails) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_ID,
      pass: EMAIL_PASSWORD,
    },
  });

  // Render the EJS template
  const htmlContent = await ejs.renderFile(
    path.join(__dirname, "../views", "order-email-template.ejs"),
    {
      orderId: orderDetails.orderId,
      customerName: orderDetails.customerName,
      customerPhoneNo: orderDetails.phoneNo,
      customerAddress: orderDetails.address,
      items: orderDetails.items,
      totalAmount: orderDetails.totalAmount,
      orderDate: orderDetails.orderDate,
    }
  );

  const mailOptions = {
    from: EMAIL_ID,
    to: EMAIL_ID, // Your email (send to yourself)
    subject: `New Order Placed - Order #${orderDetails.orderId}`,
    html: htmlContent, // Use HTML content rendered by EJS
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Order email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
