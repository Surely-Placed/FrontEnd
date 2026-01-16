'use client';
import CustomDivider from '@/common/CustomDivider';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { HomeManager } from '@/services/home/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LinkedInIcon } from '../../../public/images';

export const CardItem = ({ comment, profile, name, designation, isCurr, linkedin_url }) => (
  <Box
    p={{ xs: '1rem', lg: '1.75rem' }}
    border={'1px solid #91E4DD'}
    borderRadius={'0.5rem'}
    display={'flex'}
    flexDirection={'column'}
    justifyContent={'space-between'}
    width={'100%'}
    sx={{
      backgroundColor: 'customGreen.main',
      opacity: isCurr ? 1 : 0.5,
      transform: {
        xs: isCurr ? 'scaleY(1.01)' : 'scaleY(1)',
        lg: isCurr ? 'scaleY(1.1)' : 'scaleY(1)',
      },
      transition: 'transform 0.5s ease, opacity 0.5s ease',
    }}
  >
    <Typography fontSize={{ xs: '0.875rem' }} fontWeight={400} color="text.dark">
      {comment}
    </Typography>
    <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Box display={'flex'} alignItems={'center'} gap={2}>
        <Box width={'60px'} height={'60px'} borderRadius={'50%'} overflow={'hidden'}>
          <Image
            src={profile}
            alt="profile"
            width={60}
            height={60}
            unoptimized
            className="w_100 h_100"
          />
        </Box>
        <Box>
          <Typography variant="subtitle1" color="text.dark" mb={0.5} textTransform={'capitalize'}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.dark" textTransform={'capitalize'}>
            {designation}
          </Typography>
        </Box>
      </Box>
      {/* {linkedin_url && (
        <Link href={linkedin_url} target="_blank" rel="noopener noreferrer" className='link_styles'>
          <LinkedInIcon />
        </Link>
      )} */}
    </Box>
  </Box>
);

const Stories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [storiesData, setStoriesData] = useState([]);
  const didFetchRef = useRef(false);
  const theme = useTheme();
  const isLargestScreen = useMediaQuery(theme.breakpoints.down('xl'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const isTabScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (didFetchRef.current) return; // guard against React Strict Mode double-invoke
    didFetchRef.current = true;

    (async () => {
      try {
        const stories = await HomeManager.getStudentStories();
        const dataArray = Array.isArray(stories?.data) ? stories.data : [];
        setStoriesData(dataArray);
      } catch (e) {
        setStoriesData([]);
      }
    })();
  }, []);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
    >
      <Box
        mb={{ xs: '4rem', lg: '8rem' }}
        p={{ xs: '0 1rem', sm: '0 2rem', md: '0 4rem', lg: '0 5rem' }}
      >
        <Box pr={{ xs: 0, md: '5rem' }}>
          <CustomDivider text={'Transformation Stories'}/>
          <Typography
            fontSize={{ xs: '1.25rem', sm: '2rem', md: '2.5rem' }}
            fontWeight={500}
            color="text"
            mt={3}
            fontFamily={'var(--font-avantgarde), sans-serif'}
          >
            Real Results, Real Impact
          </Typography>
          <Typography
            fontSize={{ xs: '0.875rem', md: '1rem' }}
            fontWeight={'400'}
            color="text.subText"
            mt={2}
          >
            Discover how structured career coaching turned near-misses into solid offers.
          </Typography>
        </Box>
        <Box mt={3}>
          <Swiper
            slidesPerView={
              isSmallScreen ? (isTabScreen ? 1.25 : 1.75) : isLargestScreen ? 2.5 : 3.5
            }
            spaceBetween={isSmallScreen ? 10 : 30}
            loop={true}
            autoplay={{ delay: 3000 }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Autoplay]}
            className="mySwiper custom-swiper"
          >
            {(storiesData.length < 4 ? Array(4).fill(storiesData).flat() : storiesData).map(
              (item, i) => {
                const isCurr = activeIndex === i;
                return (
                  <SwiperSlide
                    style={{
                      color: 'background.default',
                      display: 'flex',
                      height: 'auto',
                      padding: isCurr ? '1.75rem 0.75rem' : '3rem 0',
                      backgroundImage: isCurr ? "url('/HomePage/frame.webp')" : 'unset',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '100% 100%',
                    }}
                    key={i}
                  >
                    <CardItem
                      comment={item.story}
                      profile={item.image}
                      name={item.student_name}
                      designation={item.student_designation}
                      isCurr={isCurr}
                      linkedin_url={item.linkedin_url}
                    />
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Stories;
