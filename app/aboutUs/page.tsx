import Appbar from "@/components/appbar";

export default function AboutUs() {
  return (
    <div className="bg-white flex flex-col text-black min-h-screen">
      <div>
        <Appbar />
      </div>
      <div className="flex justify-center mb-8 mt-4 items-start">
        <div className="m-5 p-4 w-2/3 shadow-2xl rounded">
          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold">About Us</h1>
            <p className="mt-4">
              Welcome to NextBuy, your one-stop destination for all your
              shopping needs. We&rsquo;re dedicated to giving you the best online
              shopping experience, with a focus on reliability, customer
              service, and uniqueness.
            </p>
            <h1 className="text-3xl mt-8 font-bold">Our Story</h1>
            <p className="mt-2">
              Founded in 2024, NextBuy was born out of a passion for providing
              quality products at competitive prices. We noticed a gap in the
              market for an online store that truly puts the customer first, and
              we set out to create a platform that&rsquo;s not just about buying and
              selling, but about building a community of satisfied shoppers.
            </p>
            <h1 className="text-3xl mt-8 font-bold">Our Mission</h1>
            <p className="mt-2">
              At NextBuy, our mission is simple: to bring the best products to
              our customers with the ease and convenience of online shopping. We
              aim to offer a variety of items that meet your every need, all
              while ensuring that our customers receive the best service
              possible.
            </p>
            <h1 className="text-3xl mt-8 font-bold">Why Choose Us?</h1>
            <ul className="flex mt-2 flex-col gap-2">
              <li>Wide Selection: We offer a diverse range of products from trusted brands, ensuring that you find exactly what you&rsquo;re looking for.</li>
              <li>Quality Assurance: We only partner with suppliers who meet our strict quality standards, so you can shop with confidence.</li>
              <li>Customer-Centric: Our customers are at the heart of everything we do. We listen to your feedback and continually improve our services to better serve you.</li>
              <li>Secure Shopping: Your privacy and security are our top priorities. We use the latest technology to keep your information safe and secure.</li>
            </ul>
            <h1 className="text-3xl mt-8 font-bold">Our Values</h1>
            <ul className="flex mt-2 flex-col gap-2">
              <li>Integrity: We believe in honesty and transparency in all our dealings.</li>
              <li>Innovation: We strive to stay ahead of the curve by embracing new technologies and trends.</li>
              <li>Customer-Centric: Our customers are at the heart of everything we do. We listen to your feedback and continually improve our services to better serve you.</li>
              <li>Community: We value our customers and see them as part of the NextBuy family.</li>
            </ul>
            <h1 className="text-3xl mt-8 font-bold">Join Us on Our Journey</h1>
            <div className="gap-4 mt-2">
              <p>We&rsquo;re more than just a shopping site; we&rsquo;re a community. Follow us on social media to stay updated on our latest offerings, exclusive deals, and to be a part of the NextBuy experience.</p>
              <p>Thank you for choosing NextBuy. We look forward to serving you!</p>
            </div>
            <h1 className="text-3xl mt-8 font-bold">Contact Us</h1>
            <div className="mt-2">
              <p>Have questions or feedback? We&rsquo;re here to help! Reach out to us at:</p>
              <ul>
                <li>Email: anilcodes01@gmail.com</li>
                <li>Phone: +91 1234567890</li>
                <li>Address: Whitefield, Bangalore, 560066</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
