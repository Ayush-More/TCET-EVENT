import React from 'react';
import mediaIcon from '../../assets/3.jpg'; // Replace with media icon
import mediaImage from '../../assets/3.jpg'; // Replace with media image

const MediaCard = () => {
  const mediaData = [
    { title: 'Photography', date: '16 Mar', college: 'TCET - Mumbai' },
    { title: 'Video Coverage', date: '10 Mar', college: 'TCET - Mumbai' },
    { title: 'Interview with Alumni', date: '12 Feb', college: 'TCET - Mumbai' },
    { title: 'Behind the Scenes', date: '25 Apr', college: 'IIT - Delhi' },
    { title: 'Campus Tour', date: '20 May', college: 'BITS - Pilani' },
    { title: 'Cultural Videos', date: '15 Jun', college: 'MIT - Pune' },
    { title: 'Hackathon Clips', date: '08 Jul', college: 'NIT - Surat' },
    { title: 'Seminar Highlights', date: '18 Aug', college: 'VIT - Chennai' },
    { title: 'Expo Recap', date: '30 Sep', college: 'SRM - Chennai' },
  ];

  return (
    <div className="bg-gray-50 py-8 px-4 lg:px-12">
      <h2 className="text-4xl font-extrabold text-center mb-8 text-green-600 drop-shadow-lg">
        Media
      </h2>

      {/* Flex container with horizontal scroll on larger devices */}
      <div className="flex flex-wrap lg:flex-nowrap overflow-x-auto space-x-6 p-4 scrollbar-hide">
        {mediaData.map((media, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-2xl min-w-[280px] md:min-w-[320px] lg:min-w-[350px] 
                       transition-transform transform hover:scale-105 hover:shadow-3xl mb-6 first:ml-0"
          >
            <img
              src={mediaImage}
              alt={media.title}
              className="h-48 w-full object-cover rounded-t-3xl"
            />
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={mediaIcon}
                  alt="Icon"
                  className="h-8 w-8 mr-3"
                />
                <h3 className="text-2xl font-bold text-gray-800">
                  {media.title}
                </h3>
              </div>
              <p className="text-lg text-gray-600 mb-2 font-semibold">
                📅 {media.date}
              </p>
              <p className="text-gray-500 text-md font-medium italic">
                📍 {media.college}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaCard;
