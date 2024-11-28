import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

const Banner = () => {
  // State to hold the description text
  const [description, setDescription] = useState(
    'If you have any feedback or questions, please email us at feedback@dq.com'
  );

  // Array of descriptions
  const descriptions = [
    'If you have any feedback, please email us at feedback@dq.com',
    'Visit our DQ website for more information.',
    'Check out our latest updates on the app!',
  ];

  // Change the description every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDescription((prevDescription) => {
        const currentIndex = descriptions.indexOf(prevDescription);
        const nextIndex = (currentIndex + 1) % descriptions.length;
        return descriptions[nextIndex];
      });
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [descriptions]);

  return (
    <View className='w-full flex-row items-center px-2 h-28 space-x-4 bg-[#332759] rounded-2xl'>
      {/* Logo Section with matching background color */}
        {/* <Image 
          source={require('../../assets/images/logo.png')} 
          className='w-20 h-full'
        /> */}
        <View className=''>
            <Text className='text-2xl tracking-wider font-semibold font-serif'>{`Digital \nCuisine`}</Text>
        </View>

      
      <View className='flex-col flex-1'>
        <Text className='text-xl font-bold text-white'>
          Welcome to DQ!
        </Text>

        {/* Dynamic Description */}
        <Text className='text-sm text-gray-400 flex-wrap'>
          {description}
        </Text>
      </View>
    </View>
  );
}

export default Banner;
