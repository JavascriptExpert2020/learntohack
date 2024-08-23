import React from 'react'
import SectionOne from '../components/SectionOne';
import FeaturedPost from '../components/FeaturedPost';
import MostRead from '../components/MostRead';
function Home() {
    return (
        <div>
            <SectionOne ></SectionOne>
            <FeaturedPost></FeaturedPost>
            <MostRead></MostRead>
        </div>
    )
}

export default Home
