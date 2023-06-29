import React from 'react'
import { Hero } from '../Components/Hero'
import { About } from '../Components/About'
import { Skills } from '../Components/Skills'
import { Resume } from '../Components/Resume'
import { PortfolioNav } from '../Components/PortfolioNav'
import { PortfolioProjects } from '../Components/PortfolioProjects'
import { OurServices } from '../Components/OurServices'
import { Testimonials } from '../Components/Testimonials'
import { PortfolioContact } from '../Components/PortfolioContact'
import { Footer } from '../Components/PortfolioFooter'

export const Home = () => {
  return (
    <div>
        <Hero />
        <PortfolioNav />
        <About />
        <Skills />
        <Resume />
        <OurServices />
        <PortfolioProjects />
        <Testimonials />
        <PortfolioContact />
        <Footer />
    </div>
  )
}
