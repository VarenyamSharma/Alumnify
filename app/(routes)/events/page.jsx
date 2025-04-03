import React from 'react';

const Events = () => {
  const eventsData = [
    {
      id: 1,
      title: "Alumni Meet 2025",
      date: "May 10, 2025",
      location: "Delhi University",
      description: "Connect with fellow alumni, share experiences, and build professional networks. This annual meet is an opportunity for graduates to reunite and inspire current students.",
      image: "/assets/alumnimeet.jpeg"
    },
    {
      id: 2,
      title: "Tech Webinar: AI & Future",
      date: "June 1, 2025",
      location: "Online (Zoom)",
      description: "Join industry leaders and alumni working in AI-driven companies. Gain insights into the future of Artificial Intelligence and how to prepare for AI-powered jobs.",
      image: "/assets/webinar.jpeg"
    },
    {
      id: 3,
      title: "Batch of 2020 Reunion",
      date: "July 15, 2025",
      location: "Mumbai",
      description: "Relive your college memories with old friends and faculty. This reunion brings together the batch of 2020 for a night of nostalgia, networking, and celebration.",
      image: "/assets/reunion.jpeg"
    },
    {
      id: 4,
      title: "Networking Night with Alumni",
      date: "August 5, 2025",
      location: "Bangalore",
      description: "A special evening where students can interact with alumni from top companies. Learn about career paths, industry trends, and mentorship opportunities.",
      image: "/assets/networking.jpeg"
    }
  ];

  return (
    <div className="bg-white min-h-screen py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">🎉 Upcoming Events</h2>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {eventsData.map(event => (
          <div key={event.id} className="bg-gray-100 shadow-md rounded-lg overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-56 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="text-gray-600"><strong>📅 {event.date}</strong> | <strong>📍 {event.location}</strong></p>
              <p className="text-gray-700 mt-2">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
