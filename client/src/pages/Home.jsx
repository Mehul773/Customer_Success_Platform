import React from "react";

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Customer Success Platform
      </h1>
      <p className="mb-6 text-lg leading-relaxed">
        Embark on a journey with our Customer Success Platform, where innovation
        meets seamless communication. Our mission? To revolutionize how
        stakeholders stay informed and engaged, ensuring no update goes
        unnoticed.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        Imagine a world where transparency is king and collaboration reigns
        supreme. Our platform isn't just about updates; it's about fostering a
        community of empowered stakeholders, each equipped with the knowledge
        they need to succeed.
      </p>
      <h2 className="text-2xl font-bold mb-2">Discover Our Features:</h2>
      <ul className="list-disc pl-6 mb-8">
        <li className="mb-4">
          <span className="font-bold">Email Notification System:</span>{" "}
          Seamlessly integrate email notifications to keep stakeholders in the
          loop, ensuring they're always up-to-date on the latest developments.
        </li>
        <li className="mb-4">
          <span className="font-bold">Import as a Document:</span> Empower
          stakeholders to effortlessly import updates as documents, providing
          offline access for reference whenever and wherever they need it.
        </li>
        <li className="mb-4">
          <span className="font-bold">Role-Based Management:</span> Customize
          access and permissions with role-based management, ensuring each user
          has the right level of access tailored to their needs.
        </li>
      </ul>
      <p className="text-lg">
        Join us on this transformative journey as we redefine what it means to
        succeed together.
      </p>
    </div>
  );
}

export default Home;
