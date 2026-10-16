import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/layout/ScrollProgress'
import ScrollToTop from './components/layout/ScrollToTop'
import PageTransition from './components/layout/PageTransition'
import ErrorBoundary from './components/ui/ErrorBoundary'

import Home from './pages/Home'

// lazy-load secondary pages
const Features = lazy(() => import('./pages/Features'))
const FeatureDetail = lazy(() => import('./pages/FeatureDetail'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const WhatsNewPage = lazy(() => import('./pages/WhatsNew'))
const Explore = lazy(() => import('./pages/Explore'))
const Characters = lazy(() => import('./pages/Characters'))
const Overview = lazy(() => import('./pages/Overview'))
const Download = lazy(() => import('./pages/Download'))
const Creators = lazy(() => import('./pages/Creators'))
const Developers = lazy(() => import('./pages/Developers'))
const About = lazy(() => import('./pages/About'))
const Careers = lazy(() => import('./pages/Careers'))
const CareerDetail = lazy(() => import('./pages/CareerDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Press = lazy(() => import('./pages/Press'))
const Brand = lazy(() => import('./pages/Brand'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Data = lazy(() => import('./pages/Data'))
const Terms = lazy(() => import('./pages/Terms'))
const Security = lazy(() => import('./pages/Security'))
const Safety = lazy(() => import('./pages/Safety'))
const ChildSafety = lazy(() => import('./pages/ChildSafety'))
const DeleteAccount = lazy(() => import('./pages/DeleteAccount'))
const Help = lazy(() => import('./pages/Help'))
const Community = lazy(() => import('./pages/Community'))
const Support = lazy(() => import('./pages/Support'))
const Contact = lazy(() => import('./pages/Contact'))
const Settings = lazy(() => import('./pages/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Loader() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="h-10 w-10 animate-spin-slow rounded-full border-2 border-white/15 border-t-blue-glow" />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main id="main" className="min-h-screen">
        <ErrorBoundary resetKey={location.pathname}>
          <Suspense fallback={<Loader />}>
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/features/:slug" element={<FeatureDetail />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="/whats-new" element={<WhatsNewPage />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/characters" element={<Characters />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/download" element={<Download />} />
                  <Route path="/creators" element={<Creators />} />
                  <Route path="/developers" element={<Developers />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/careers/:id" element={<CareerDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/press" element={<Press />} />
                  <Route path="/brand" element={<Brand />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/data" element={<Data />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/safety" element={<Safety />} />
                  {/* The two routes the app stores are handed: the child-safety
                      standards page and the "delete your account" URL. They are
                      not in the menus for the sake of it — a policy page nobody
                      can find is a policy page that fails its own review. */}
                  <Route path="/child-safety" element={<ChildSafety />} />
                  <Route path="/delete-account" element={<DeleteAccount />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  )
}
