import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slideSwiper.scss';
import { Pagination, Navigation } from 'swiper/modules';
import InfoCard from '../../info-card/infoCard';
import { CharacterReference } from '../../../../interfaces/CharacterReference';

const SlideSwiper = (props: CharacterReference[]) => {
  const characterArray = Object.values(props);
  console.log(characterArray)
    const pagination = {
    clickable: true,
    renderBullet: function (index : number, className: any) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  return (
    <div id="app">
    <>
      <Swiper
        pagination={pagination}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={3}
        navigation={true}
      >
        
       {characterArray.map((character)=>{
        return <SwiperSlide>
              <InfoCard {...character}/>
            </SwiperSlide> 
       
       })}   
      </Swiper>
    </>
    </div>
  );
}

export default SlideSwiper;